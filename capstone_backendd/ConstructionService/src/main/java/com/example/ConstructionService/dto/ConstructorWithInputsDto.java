package com.example.ConstructionService.dto;


import java.util.List;

public class ConstructorWithInputsDto {
    
    private ConstructorDto constructorDto;
    private List<InputDto> inputDto; // Use Object to handle dynamic input structure or replace with specific DTO

    public ConstructorWithInputsDto(ConstructorDto constructorDto, List<InputDto> inputDto) {
        this.constructorDto = constructorDto;
        this.inputDto = inputDto;
    }

    public ConstructorWithInputsDto() {
    }

    public ConstructorDto getConstructorDto() {
        return constructorDto;
    }

    public void setConstructorDto(ConstructorDto constructorDto) {
        this.constructorDto = constructorDto;
    }

    public List<InputDto> getInputDto() {
        return inputDto;
    }

    public void setInputDto(List<InputDto> inputs) {
        this.inputDto = inputs;
    }
    
}
