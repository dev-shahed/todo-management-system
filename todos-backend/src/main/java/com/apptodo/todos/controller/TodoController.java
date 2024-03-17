package com.apptodo.todos.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.apptodo.todos.dto.TodoDTO;
import com.apptodo.todos.exception.ApiResponse;
import com.apptodo.todos.service.TodoService;

import lombok.AllArgsConstructor;

@AllArgsConstructor
@RestController
@RequestMapping("api/todos")
public class TodoController {
    private TodoService todoService;

    @PostMapping()
    ResponseEntity<?> creatingTodo(@RequestBody TodoDTO todoDTO) {
        try {
            TodoDTO createdTodo = todoService.createTodo(todoDTO);
            return ResponseEntity.status(HttpStatus.CREATED)
                    .body(ApiResponse.success("Todo Created Successfully", createdTodo));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(ApiResponse.error("Failed to created todo: " + e.getMessage()));
        }
    }
}
