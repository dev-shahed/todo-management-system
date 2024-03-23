package com.apptodo.todos.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.apptodo.todos.entity.Role;

public interface RoleRepository extends JpaRepository<Role, Long>{
    
}
