package com.example.User_Input.Service;

// import com.example.User_Input.Repository.InputsRepo;
// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.dao.OptimisticLockingFailureException;
// import org.springframework.stereotype.Service;
// import com.example.User_Input.Entity.Inputs;
// import java.util.List;
// import java.util.Optional;

// @Service  // This annotation registers InputRequestService as a Spring Bean
// public class InputsService {

//     @Autowired
//     private InputsRepo inputRequestRepository;

//     // Create a new area request
//     public Inputs createAreaRequest(Inputs areaRequest) {
//         return inputRequestRepository.save(areaRequest);
//     }

//     // Get all area requests
//     public List<Inputs> getAllAreaRequests() {
//         return inputRequestRepository.findAll();
//     }

//     // Get area request by ID
//     public Optional<Inputs> getAreaRequestById(Long id) {
//         return inputRequestRepository.findById(id);
//     }

//     // Update area request by ID
//     public Inputs updateAreaRequest(Long id, Inputs areaRequest) {
//         try {
//             if (inputRequestRepository.existsById(id)) {
//                 areaRequest.setId(id);  // Ensure the request gets updated with the same ID
//                 return inputRequestRepository.save(areaRequest);
//             } else {
//                 throw new RuntimeException("Area Request not found");
//             }
//         } catch (OptimisticLockingFailureException e) {
//             throw new RuntimeException("The area request has been modified by another user. Please try again.");
//         }
//     }


//     // Delete area request by ID
//     public void deleteAreaRequest(Long id) {
//         inputRequestRepository.deleteById(id);
//     }
// }


import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import com.example.User_Input.Dto.ConstructorDto;
import com.example.User_Input.Entity.Inputs;
import com.example.User_Input.Repository.InputsRepo;


@Service
public class InputsService {


    @Autowired
    private WebClient.Builder webClientBuilder;

    private static final String CONSTRUCTOR_SERVICE_URL = "http://localhost:8086/api/constructors";

    @Autowired
    private InputsRepo inputsRepository;

    public Inputs createInput(Inputs input) {
        return inputsRepository.save(input);
    }

    public List<Inputs> getAllInputs() {
        return inputsRepository.findAll();
    }

    public Optional<Inputs> getInputById(Long id) {
        // Use Optional to handle the case of a missing resource
        return inputsRepository.findById(id);
    }

    public Inputs assignConstructor(Long inputId, String specialization) {
        // Fetch the input by ID
        Inputs input = inputsRepository.findById(inputId)
                .orElseThrow(() -> new RuntimeException("Input not found with id: " + inputId));
    
        // Fetch available constructors from ConstructionMicroservice
        ConstructorDto availableConstructor = webClientBuilder.build()
                .get()
                .uri(CONSTRUCTOR_SERVICE_URL + "?specialization=" + specialization + "&available=true")
                .retrieve()
                .bodyToMono(ConstructorDto.class)
                .block();
    
        if (availableConstructor == null) {
            throw new RuntimeException("No available constructor with specialization: " + specialization);
        }
    
        // Update Input with Constructor ID
        input.setConstructionId(availableConstructor.getConstructionid());
        inputsRepository.save(input);
    
        // Mark constructor as unavailable in ConstructionMicroservice
        webClientBuilder.build()
                .post()
                .uri(CONSTRUCTOR_SERVICE_URL + "/" + availableConstructor.getConstructionid() + "/assign")
                .retrieve()
                .bodyToMono(Void.class)
                .block();
    
        return input;
    }
    

    public void updateConstructionId(Long inputId, Long constructionId) {
        Inputs input = inputsRepository.findById(inputId)
                .orElseThrow(() -> new RuntimeException("Input not found"));
        input.setConstructionId(constructionId);
        inputsRepository.save(input);
    }
    
    public List<Inputs> getInputsByConstructorId(Long constructorId) {
        return inputsRepository.findByConstructionId(constructorId);
    }
    

}
