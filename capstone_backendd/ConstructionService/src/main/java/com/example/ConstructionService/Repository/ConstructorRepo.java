package com.example.ConstructionService.Repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.ConstructionService.Entity.Constructor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ConstructorRepo extends JpaRepository<Constructor,Long> {


    List<Constructor> findBySpecializationAndAvailable(String specialization, boolean b);
}
