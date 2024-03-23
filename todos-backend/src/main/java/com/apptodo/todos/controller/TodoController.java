package com.apptodo.todos.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
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

    @PreAuthorize("hasRole('ADMIN')")
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

    @PreAuthorize("hasAnyRole('ADMIN','USER')")
    @GetMapping()
    public ResponseEntity<?> gettingAllTodos() {
        try {
            List<TodoDTO> todos = todoService.getAllTodo();
            return ResponseEntity.status(HttpStatus.OK)
                    .body(ApiResponse.success("fetched successfully ", todos));
        } catch (ResourceNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(ApiResponse.error(e.getMessage()));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(ApiResponse.error("Failed to retrieve todos: " + e.getMessage()));
        }
    }

    @PreAuthorize("hasRole('ADMIN')")
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

    @PreAuthorize("hasAnyRole('ADMIN','USER')")
    @GetMapping("/{id}")
    public ResponseEntity<?> getTodo(@PathVariable Long id) {
        try {
            TodoDTO todo = todoService.getTodo(id);
            return ResponseEntity.status(HttpStatus.OK)
                    .body(ApiResponse.success("fetched successfully ", todo));
        } catch (ResourceNotFoundException ex) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(ex.getErrorResponse());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(ApiResponse.error("Failed to retrieve the todo"));
        }
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/{id}")
    public ResponseEntity<?> updateTodo(@PathVariable Long id, @RequestBody TodoDTO todoDTO) {
        try {
            TodoDTO todo = todoService.updateTodo(todoDTO, id);
            return ResponseEntity.status(HttpStatus.OK).body(ApiResponse.success("todo updated successfully", todo));
        } catch (ResourceNotFoundException ex) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(ex.getErrorResponse());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(ApiResponse.error("Failed to retrieve the todo"));
        }
    }

    //complete todo status = true
    @PreAuthorize("hasAnyRole('ADMIN','USER')")
    @PatchMapping("/{id}/complete")
    public ResponseEntity<?> completeStatus(@PathVariable Long id) {
        try {
            TodoDTO updatedTodo = todoService.completeTodo(id);
            return ResponseEntity.status(HttpStatus.OK).body(ApiResponse.success("Completed!", updatedTodo));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
            .body(ApiResponse.error("Failed to update status!"));
        }
    }

    //incomplete a todo, status = false
    @PreAuthorize("hasAnyRole('ADMIN','USER')")
    @PatchMapping("/{id}/incomplete")
    public ResponseEntity<?> incompleteStatus(@PathVariable Long id) {
        try {
            TodoDTO updatedTodo = todoService.inCompleteTodo(id);
            return ResponseEntity.status(HttpStatus.OK).body(ApiResponse.success("Incomplete!", updatedTodo));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
            .body(ApiResponse.error("Failed to update status!"));
        }
    }

}
