package com.apptodo.todos.service;

import com.apptodo.todos.dto.LoginDTO;
import com.apptodo.todos.dto.RegisterDTO;

public interface AuthService {
    RegisterDTO register(RegisterDTO registerDTO);

    String login(LoginDTO loginDTO);
}
