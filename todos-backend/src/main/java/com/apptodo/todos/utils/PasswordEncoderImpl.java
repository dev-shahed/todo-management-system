package com.apptodo.todos.utils;

import org.springframework.security.crypto.factory.PasswordEncoderFactories;
import org.springframework.security.crypto.password.PasswordEncoder;

public class PasswordEncoderImpl {
    public static void main(String[] args) {
         PasswordEncoder encoder = PasswordEncoderFactories.createDelegatingPasswordEncoder();
         System.out.println(encoder.encode("jhon123"));
         System.out.println(encoder.encode("admin123"));
    }
}
