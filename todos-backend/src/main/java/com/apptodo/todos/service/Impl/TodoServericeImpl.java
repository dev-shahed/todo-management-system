package com.apptodo.todos.service.Impl;

import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import com.apptodo.todos.dto.TodoDTO;
import com.apptodo.todos.entity.Todo;
import com.apptodo.todos.exception.ResourceNotFoundException;
import com.apptodo.todos.repository.TodoRepository;
import com.apptodo.todos.service.TodoService;

import lombok.AllArgsConstructor;

@AllArgsConstructor
@Service
public class TodoServericeImpl implements TodoService {

    private TodoRepository todoRepository;
    private ModelMapper modelMapper;

    @Override
    public TodoDTO createTodo(TodoDTO todoDTO) {
        // convert todo dto into todo jpa entity
        // Todo todo = new Todo();
        // todo.setTitle(todoDTO.getTitle());
        // todo.setDescription(todoDTO.getDescription());
        // todo.setCompleted(todo.isCompleted());
        // ..........alternative via model mapper library........
        Todo todo = modelMapper.map(todoDTO, Todo.class);

        // save todo jpa entity to db
        Todo savedTodo = todoRepository.save(todo);

        // convert saved todo jpa entity object to todo dto object
        TodoDTO savedTodoDTO = modelMapper.map(savedTodo, TodoDTO.class);
        // savedTodoDTO.setId(savedTodo.getId());
        // savedTodoDTO.setTitle(savedTodo.getTitle());
        // savedTodoDTO.setDescription(savedTodo.getDescription());
        // savedTodoDTO.setCompleted(savedTodo.isCompleted());

        return savedTodoDTO;
    }

    @Override
    public List<TodoDTO> getAllTodo() {
        List<Todo> todos = todoRepository.findAll();
        if (todos.isEmpty()) {
            throw new ResourceNotFoundException("No todo record found!");
        }
        return todos.stream()
                .map(todo -> modelMapper.map(todo, TodoDTO.class))
                .collect(Collectors.toList());
    }

    @Override
    public void deleteTodo(Long id) {
        Todo todo = todoRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("todo is not found with ID: " + id));
        todoRepository.deleteById(id);
        modelMapper.map(todo, TodoDTO.class);
    }

    @Override
    public TodoDTO getTodo(Long id) {
        Todo todo = todoRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("todo is not exits: " + id));
        return modelMapper.map(todo, TodoDTO.class);
    }

    @Override
    public TodoDTO updateTodo(TodoDTO todoDTO, Long id) {
        Todo theTodo = todoRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("todo is not exist: " + id));
        theTodo.setTitle(todoDTO.getTitle());
        theTodo.setDescription(todoDTO.getDescription());
        theTodo.setCompleted(todoDTO.isCompleted());
        Todo updatedTodo = todoRepository.save(theTodo);
        return modelMapper.map(updatedTodo, TodoDTO.class);
    }

    @Override
    public TodoDTO completeTodo(Long id) {
        Todo todo = todoRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("todo is not exist: " + id));
        todo.setCompleted(Boolean.TRUE);
        Todo updateTodo = todoRepository.save(todo);
        return modelMapper.map(updateTodo, TodoDTO.class);
    }

    @Override
    public TodoDTO inCompleteTodo(Long id) {
        Todo todo = todoRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("todo is not exist: " + id));
        todo.setCompleted(Boolean.FALSE);
        Todo updateTodo = todoRepository.save(todo);
        return modelMapper.map(updateTodo, TodoDTO.class);
    }

}