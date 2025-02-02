package com.example.CostEstimaton.Repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.CostEstimaton.Model.CostEstimate;

@Repository
public interface CostEstimateRepository extends JpaRepository<CostEstimate, Long> {

    Optional<CostEstimate> findByInputId(Long inputId);
    
}
