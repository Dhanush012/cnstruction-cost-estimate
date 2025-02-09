package com.spring.security.model;



public class AuthRequest {
    private String email;
    private String password;
    private String role;
    
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public AuthRequest(String email, String password) {
		super();
		this.email = email;
		this.password = password;
	}
	public AuthRequest() {
		super();
	}
	public String getRole() {
		return role;
	}
	public void setRole(String role) {
		this.role = role;
	}
    
    
}
