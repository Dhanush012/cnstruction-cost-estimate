package com.example.User_Input.Dto;

public class ConstructorDto {
    private Long constructionid;
    private String name;
    private int experience;
    private String specialization;
    private boolean available;

    public ConstructorDto(Long constructionid, String name, int experience, String specialization, boolean available) {
        this.constructionid = constructionid;
        this.name = name;
        this.experience = experience;
        this.specialization = specialization;
        this.available = available;
    }

    public Long getConstructionid() {
        return constructionid;
    }

    public void setConstructionid(Long constructionid) {
        this.constructionid = constructionid;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getExperience() {
        return experience;
    }

    public void setExperience(int experience) {
        this.experience = experience;
    }

    public String getSpecialization() {
        return specialization;
    }

    public void setSpecialization(String specialization) {
        this.specialization = specialization;
    }

    public boolean isAvailable() {
        return available;
    }

    public void setAvailable(boolean available) {
        this.available = available;
    }

    public ConstructorDto() {
    }
}
