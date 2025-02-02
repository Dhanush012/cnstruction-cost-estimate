package com.example.User_Input.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.User_Input.Entity.Inputs;

public interface InputsRepo extends JpaRepository<Inputs,Long> {

    List<Inputs> findByConstructionId(Long constructorId);
}
