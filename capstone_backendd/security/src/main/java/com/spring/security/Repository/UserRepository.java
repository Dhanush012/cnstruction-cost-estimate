package com.spring.security.Repository;


import org.springframework.data.jpa.repository.JpaRepository;

import com.spring.security.model.User;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);
}

