package com.apptodo.todos.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.apptodo.todos.entity.Todo;

public interface TodoRepository extends JpaRepository<Todo, Long>{

 
}
