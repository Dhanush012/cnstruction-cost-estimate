package com.example.ConstructionService.Entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "Construction")
public class Constructor {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long constructionid;

    private String name;
    private int experience;
    private String specialization; // Corrected spelling
    private boolean available;

    // Getters and Setters
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
        return specialization; // Corrected getter
    }

    public void setSpecialization(String specialization) { // Corrected setter
        this.specialization = specialization;
    }

    public boolean isAvailable() {
        return available;
    }

    public void setAvailable(boolean available) {
        this.available = available;
    }

    // Constructor
    public Constructor(Long constructionid, String name, int experience, String specialization, boolean available) {
        this.constructionid = constructionid;
        this.name = name;
        this.experience = experience;
        this.specialization = specialization; // Corrected parameter
        this.available = available;
    }

    public Constructor() {
    }

}
