package com.apptodo.todos.service.Impl;

import java.util.List;

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
        //..........alternative via model mapper library........
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
    public List<TodoDTO> geTodoDTO() {
        List<Todo> todos = todoRepository.findAll();
        if (todos.isEmpty()) {
            throw new ResourceNotFoundException("No todo found! Add your todo now");
        }
        return null;
    }

    @Override
    public TodoDTO geTodoById(Long id) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'geTodoById'");
    }

    @Override
    public void deleteTodo(Long id) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'deleteTodo'");
    }

}
