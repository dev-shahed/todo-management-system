package com.apptodo.todos.service.Impl;

import java.util.HashSet;
import java.util.Set;

import org.modelmapper.ModelMapper;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.apptodo.todos.dto.RegisterDTO;
import com.apptodo.todos.entity.Role;
import com.apptodo.todos.entity.User;
import com.apptodo.todos.exception.AuthException;
import com.apptodo.todos.repository.RoleRepository;
import com.apptodo.todos.repository.UserRepository;
import com.apptodo.todos.service.AuthService;

import lombok.AllArgsConstructor;

@AllArgsConstructor
@Service
public class AuthServiceImpl implements AuthService {
    private UserRepository userRepository;
    private RoleRepository roleRepository;
    private PasswordEncoder passwordEncoder;

    private ModelMapper modelMapper;

    @Override
    public RegisterDTO register(RegisterDTO registerDTO) {

        // check username is already exist or not in DB
        if (userRepository.existsByUsername(registerDTO.getUsername())) {
            throw new AuthException("username already exist!");
        }
        // check email in DB
        if (userRepository.existsByEmail(registerDTO.getEmail())) {
            throw new AuthException("email already exist!");
        }

        User user = new User();
        user.setName(registerDTO.getName());
        user.setUsername(registerDTO.getUsername());
        user.setEmail(registerDTO.getEmail());
        user.setPassword(passwordEncoder.encode(registerDTO.getPassword()));
  

        Set<Role> roles = new HashSet<>();
        Role userRole = roleRepository.findByName("ROLE_USER");// default role USER for every registered users..
        roles.add(userRole); // add registered user

        user.setRoles(roles);

        User savedUser = userRepository.save(user);

        return modelMapper.map(savedUser, RegisterDTO.class);
    }

}
