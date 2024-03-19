package com.apptodo.todos.service;

import java.util.List;

import com.apptodo.todos.dto.TodoDTO;

public interface TodoService {
    TodoDTO createTodo(TodoDTO todoDTO);

    List<TodoDTO> getAllTodo();

    void deleteTodo(Long id);

}
