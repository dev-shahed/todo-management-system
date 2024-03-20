package com.apptodo.todos.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.apptodo.todos.dto.TodoDTO;
import com.apptodo.todos.exception.ApiResponse;
import com.apptodo.todos.exception.ResourceNotFoundException;
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

    @GetMapping()
    public ResponseEntity<?> gettingAllTodos() {
        try {
            List<TodoDTO> todos = todoService.getAllTodo();
            return ResponseEntity.ok(todos);
        } catch (ResourceNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(ApiResponse.error(e.getMessage()));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(ApiResponse.error("Failed to retrieve todos: " + e.getMessage()));
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteStudent(@PathVariable Long id) {
        try {
            todoService.deleteTodo(id);
            return ResponseEntity.status(HttpStatus.OK)
                    .body(ApiResponse.success("Todo deleted successfully", null));
        } catch (ResourceNotFoundException ex) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(ex.getErrorResponse());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(ApiResponse.error("Failed to delete todo"));
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getTodo(@PathVariable Long id) {
        try {
            TodoDTO todo = todoService.getTodo(id);
            return ResponseEntity.ok(todo);
        } catch (ResourceNotFoundException ex) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(ex.getErrorResponse());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(ApiResponse.error("Failed to retrieve the todo"));
        }
    }

}
