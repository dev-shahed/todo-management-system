package com.apptodo.todos.service;

import java.util.List;

import com.apptodo.todos.dto.TodoDTO;

public interface TodoService {
    TodoDTO createTodo(TodoDTO todoDTO);

    List<TodoDTO> getAllTodo();

    void deleteTodo(Long id);

    TodoDTO getTodo(Long id);

    TodoDTO updateTodo(TodoDTO todoDTO, Long id);

    TodoDTO completeTodo(Long id);

    TodoDTO inCompleteTodo(Long id);

}
