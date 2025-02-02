package com.example.ConstructionService.Service;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import com.example.ConstructionService.Entity.Constructor;
import com.example.ConstructionService.Repository.ConstructorRepo;
import com.example.ConstructionService.dto.ConstructorDto;
import com.example.ConstructionService.dto.ConstructorWithInputsDto;
import com.example.ConstructionService.dto.InputDto;

@Service
public class ConstructorService {

    @Autowired
    private ConstructorRepo constructorRepository;

    @Autowired
    private WebClient.Builder webClientBuilder;

    private static final String INPUT_MICROSERVICE_URL = "http://localhost:8080/api/inputs"; // Replace with actual Input Microservice URL


    // Fetch all constructors
    public List<Constructor> getAllConstructors() {
        return constructorRepository.findAll();
    }

    // Fetch a constructor by ID
    public Optional<Constructor> getConstructorById(Long id) {
        return constructorRepository.findById(id);
    }

    // Add a new constructor
    public Constructor addConstructor(Constructor constructor) {
        return constructorRepository.save(constructor);
    }

    // Update constructor availability
    public Constructor updateAvailability(Long id, boolean availability) {
        Constructor constructor = constructorRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Constructor not found"));
        constructor.setAvailable(availability);
        return constructorRepository.save(constructor);
    }


    public Constructor assignConstructorToProject(Long constructorId, Long inputId) {
        // Fetch and validate the constructor
        Constructor constructor = constructorRepository.findById(constructorId)
                .orElseThrow(() -> new RuntimeException("Constructor not found"));

        if (!constructor.isAvailable()) {
            throw new RuntimeException("Constructor is not available");
        }

        // Mark constructor as unavailable
        constructor.setAvailable(false);
        Constructor updatedConstructor = constructorRepository.save(constructor);

        // Notify the Input Microservice to update the input with the assigned constructionId
        webClientBuilder.build()
                .patch()
                .uri(INPUT_MICROSERVICE_URL + "/" + inputId + "/set-construction-id/" + constructorId)
                .retrieve()
                .bodyToMono(Void.class) // Expecting no body in response
                .block();

        return updatedConstructor;
    }


    public List<Constructor> findAvailableConstructors(String specialization) {
        return constructorRepository.findBySpecializationAndAvailable(specialization, true);
    }

    public ConstructorWithInputsDto getConstructorWithInputs(Long constructorId) {
    // Fetch constructor by ID
    Constructor constructor = constructorRepository.findById(constructorId)
            .orElseThrow(() -> new RuntimeException("Constructor not found"));

    // Map Constructor entity to ConstructorDto
    ConstructorDto constructorDto = new ConstructorDto();
    constructorDto.setConstructionid(constructor.getConstructionid());
    constructorDto.setName(constructor.getName());
    constructorDto.setSpecialization(constructor.getSpecialization());
    constructorDto.setAvailable(constructor.isAvailable());

    // Fetch inputs assigned to this constructor from Input Microservice
    List<InputDto> inputs = webClientBuilder.build()
            .get()
            .uri(INPUT_MICROSERVICE_URL + "/constructor/" + constructorId)
            .retrieve()
            .bodyToFlux(InputDto.class) // Replace Object.class with the specific Input DTO if defined
            .collectList()
            .block();

    // Combine data into DTO
    ConstructorWithInputsDto dto = new ConstructorWithInputsDto();
    dto.setConstructorDto(constructorDto);
    dto.setInputDto(inputs);

    return dto;
}
}

