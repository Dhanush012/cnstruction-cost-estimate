package com.example.User_Input.Controller;

// import com.example.User_Input.Entity.Inputs;
// import com.example.User_Input.Service.InputRequestService;
// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.http.ResponseEntity;
// import org.springframework.web.bind.annotation.*;

// import java.util.List;
// import java.util.Optional;

// @RestController // This annotation was missing in your original code
// @RequestMapping("/api/area-requests")
// public class InputController {

//     @Autowired
//     private InputRequestService areaRequestService;

//     // Create new area request
//     @PostMapping
//     public ResponseEntity<Inputs> createAreaRequest(@RequestBody Inputs areaRequest) {
//         Inputs createdRequest = areaRequestService.createAreaRequest(areaRequest);
//         return ResponseEntity.status(201).body(createdRequest); // Return status 201 (Created)
//     }

//     // Get all area requests
//     @GetMapping
//     public ResponseEntity<List<Inputs>> getAllAreaRequests() {
//         List<Inputs> requests = areaRequestService.getAllAreaRequests();
//         return ResponseEntity.ok(requests); // Return status 200 (OK)
//     }

//     // Get area request by ID
//     @GetMapping("/{id}")
//     public ResponseEntity<Inputs> getAreaRequestById(@PathVariable Long id) {
//         Optional<Inputs> request = areaRequestService.getAreaRequestById(id);
//         return request.map(ResponseEntity::ok)
//                 .orElseGet(() -> ResponseEntity.notFound().build()); // Return 404 if not found
//     }

//     // Update area request by ID
//     @PutMapping("/{id}")
//     public ResponseEntity<Inputs> updateAreaRequest(@PathVariable Long id, @RequestBody Inputs areaRequest) {
//         Inputs updatedRequest = areaRequestService.updateAreaRequest(id, areaRequest);
//         return ResponseEntity.ok(updatedRequest); // Return updated area request with status 200 (OK)
//     }

//     // Delete area request by ID
//     @DeleteMapping("/{id}")
//     public ResponseEntity<Void> deleteAreaRequest(@PathVariable Long id) {
//         areaRequestService.deleteAreaRequest(id);
//         return ResponseEntity.noContent().build(); // Return 204 (No Content) when deleted successfully
//     }
// }



import java.util.List;
import java.util.Optional;

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

import com.example.User_Input.Entity.Inputs;
import com.example.User_Input.Service.InputsService;

@RestController
@RequestMapping("/api/inputs")
public class InputsController {

    @Autowired
    private InputsService inputsService;

    @GetMapping
    public ResponseEntity<List<Inputs>> getAllInputs() {
        return ResponseEntity.ok(inputsService.getAllInputs());
    }

    @PostMapping
    public ResponseEntity<Inputs> createInput(@RequestBody Inputs input) {
        return ResponseEntity.status(201).body(inputsService.createInput(input));
    }

    @GetMapping("getid/{id}")
    public ResponseEntity<Inputs> getInputById(@PathVariable Long id) {
        Optional<Inputs> inputOptional = inputsService.getInputById(id);
        
        if (inputOptional.isPresent()) {
            return ResponseEntity.ok(inputOptional.get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PatchMapping("/{id}/set-construction-id/{constructionId}")
    public ResponseEntity<Void> setConstructionId(
            @PathVariable Long id,
            @PathVariable Long constructionId) {
        inputsService.updateConstructionId(id, constructionId);
        return ResponseEntity.ok().build();
    }


    // Assign Constructor to Input
    @PostMapping("/{id}/assign-constructor")
    public ResponseEntity<Inputs> assignConstructor(
            @PathVariable Long id,
            @RequestParam String specialization) {
        return ResponseEntity.ok(inputsService.assignConstructor(id, specialization));
    }


    @GetMapping("/constructor/{constructorId}")
    public ResponseEntity<List<Inputs>> getInputsByConstructorId(@PathVariable Long constructorId) {
        List<Inputs> inputs = inputsService.getInputsByConstructorId(constructorId);
        return ResponseEntity.ok(inputs);
    }


}
