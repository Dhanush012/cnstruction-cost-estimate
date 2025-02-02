package com.example.ConstructionService.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.ConstructionService.Entity.Constructor;
import com.example.ConstructionService.Service.ConstructorService;
import com.example.ConstructionService.dto.ConstructorWithInputsDto;

@RestController
@RequestMapping("/api/constructors")
public class ConstructorController {

    @Autowired
    private ConstructorService constructorService;

    // Get all constructors
    @GetMapping
    public ResponseEntity<List<Constructor>> getAllConstructors() {
        return ResponseEntity.ok(constructorService.getAllConstructors());
    }

    // Get a constructor by ID
    @GetMapping("/{id}")
    public ResponseEntity<Constructor> getConstructorById(@PathVariable Long id) {
        return constructorService.getConstructorById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // Add a new constructor
    @PostMapping("/addConstructor")
    public ResponseEntity<Constructor> addConstructor(@RequestBody Constructor constructor) {
        return ResponseEntity.ok(constructorService.addConstructor(constructor));
    }

    // Update constructor availability
    @PatchMapping("/{id}/availability")
    public ResponseEntity<Constructor> updateAvailability(
            @PathVariable Long id, @RequestParam boolean available) {
        return ResponseEntity.ok(constructorService.updateAvailability(id, available));
    }

    //Assign contructor to project
    @PostMapping("/{constructorId}/assign")
    public ResponseEntity<Constructor> assignConstructorToProject(
            @PathVariable Long constructorId,
            @RequestParam Long inputId) {
        return ResponseEntity.ok(constructorService.assignConstructorToProject(constructorId, inputId));
    }


    // Get available constructors
    @GetMapping("/available")
    public ResponseEntity<List<Constructor>> getAvailableConstructors(
            @RequestParam String specialization,
            @RequestParam boolean available) {
        return ResponseEntity.ok(constructorService.findAvailableConstructors(specialization));
    }

    @GetMapping("/{id}/with-inputs")
    public ResponseEntity<ConstructorWithInputsDto> getConstructorWithInputs(@PathVariable Long id) {
        ConstructorWithInputsDto response = constructorService.getConstructorWithInputs(id);
        return ResponseEntity.ok(response);
    }

    
}
