package com.spring.security.Service;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.spring.security.Repository.UserRepository;
import com.spring.security.model.AuthRequest;
import com.spring.security.model.AuthResponse;
import com.spring.security.model.RegisterRequest;
import com.spring.security.model.User;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final JwtUtil jwtUtil;
    private final PasswordEncoder passwordEncoder;

    public AuthService(UserRepository userRepository, JwtUtil jwtUtil, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.jwtUtil = jwtUtil;
        this.passwordEncoder = passwordEncoder;
    }

    public String register(RegisterRequest request) {
        User user = new User();
        user.setUsername(request.getUsername());
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setRole(request.getRole());

        userRepository.save(user);
        return "User registered successfully!";
    }

    public AuthResponse login(AuthRequest request) {
        // Static admin login (no JWT required)
        if ("admin".equals(request.getRole()) &&
            "admin@example.com".equals(request.getEmail()) &&
            "admin123".equals(request.getPassword())) {

            return new AuthResponse(null, "ADMIN"); // No token, but role returned
        }

        // Normal User/Constructor Login (JWT required)
        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new RuntimeException("Invalid password");
        }

        // Generate token with role
        String token = jwtUtil.generateToken(user.getRole().name());

        return new AuthResponse(token, user.getRole().name());
    }
}
