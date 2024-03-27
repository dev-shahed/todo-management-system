package com.apptodo.todos.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.apptodo.todos.dto.JwtAuthResponse;
import com.apptodo.todos.dto.LoginDTO;
import com.apptodo.todos.dto.RegisterDTO;
import com.apptodo.todos.exception.ApiResponse;
import com.apptodo.todos.exception.AuthException;
import com.apptodo.todos.exception.ResourceNotFoundException;
import com.apptodo.todos.service.AuthService;

import lombok.AllArgsConstructor;

@AllArgsConstructor
@RestController
@RequestMapping("/api/auth")
@CrossOrigin("*")
public class AuthController {
    private AuthService authService;

    // build api for register..
    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody(required = true) RegisterDTO registerDTO) {
        try {
            authService.register(registerDTO);
            return ResponseEntity.status(HttpStatus.CREATED)
                    .body(ApiResponse.success("Registration Successful!", null));
        } catch (AuthException e) {
            return ResponseEntity.status(HttpStatus.CONFLICT)
                    .body(ApiResponse.error(e.getMessage()));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(ApiResponse.error("Internal server error, try again.."));
        }
    }

    // api for user login.,
    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody LoginDTO loginDTO) {
        try {
            String token = authService.login(loginDTO);
            JwtAuthResponse jwtAuthResponse = new JwtAuthResponse();
            jwtAuthResponse.setAccessToken(token);
            jwtAuthResponse.setMessage("Login successful");
            return ResponseEntity.status(HttpStatus.OK).body(jwtAuthResponse);
        } catch (ResourceNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(ApiResponse.error(e.getMessage()));
        } catch (AuthException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(ApiResponse.error(e.getMessage()));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(ApiResponse.error("An internal server error occurred"));
        }
    }

}
