package com.example.User_Input.Dto;


import java.util.List;

public class ConstructorWithInputsDto {
    
    private ConstructorDto constructor;
    private List<Object> inputDto; // Use Object to handle dynamic input structure or replace with specific DTO

    public ConstructorWithInputsDto(ConstructorDto constructor, List<Object> inputDto) {
        this.constructor = constructor;
        this.inputDto = inputDto;
    }

    public ConstructorWithInputsDto() {
    }

    // Getters and Setters
    public ConstructorDto getConstructor() {
        return constructor;
    }

    public void setConstructor(ConstructorDto constructor) {
        this.constructor = constructor;
    }

    public List<Object> getInputDto() {
        return inputDto;
    }

    public void setInputs(List<Object> inputDto) {
        this.inputDto = inputDto;
    }
}
