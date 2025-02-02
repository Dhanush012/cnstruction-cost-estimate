package com.example.User_Management.dto;

public class AuthenticationRequest {
    private String email;
    private String Password;
    private String role;
    
    
    public AuthenticationRequest() {
    }


	public String getEmail() {
		return email;
	}


	public void setEmail(String email) {
		this.email = email;
	}


	public String getPassword() {
		return Password;
	}


	public void setPassword(String password) {
		Password = password;
	}


	public String getRole() {
		return role;
	}


	public void setRole(String role) {
		this.role = role;
	}


	public AuthenticationRequest(String email, String password, String role) {
		super();
		this.email = email;
		Password = password;
		this.role = role;
	}

	
}