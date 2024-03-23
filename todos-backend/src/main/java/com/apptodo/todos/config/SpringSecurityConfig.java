package com.apptodo.todos.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.factory.PasswordEncoderFactories;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;
import org.springframework.security.web.SecurityFilterChain;

@EnableMethodSecurity
@Configuration
public class SpringSecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http.csrf(csrf -> csrf.disable())
                .authorizeRequests(authorize -> {
                    // >>>>>>>>Role base Security.....>>>>>>>
                    // authorize.requestMatchers(HttpMethod.POST, "/api/**").hasRole("ADMIN");
                    // authorize.requestMatchers(HttpMethod.PUT, "/api/**").hasRole("ADMIN");
                    // authorize.requestMatchers(HttpMethod.DELETE, "/api/**").hasRole("ADMIN");
                    // authorize.requestMatchers(HttpMethod.GET, "/api/**").hasAnyRole("ADMIN", "USER");
                    // authorize.requestMatchers(HttpMethod.PATCH, "/api/**").hasAnyRole("ADMIN", "USER");
                    //authorize.requestMatchers(HttpMethod.GET, "/api/**").permitAll();
                    authorize.anyRequest().authenticated();
                }).httpBasic();
        return http.build();
    }

    @Bean
    public UserDetailsService userDetailsService() {
        PasswordEncoder encoder = PasswordEncoderFactories.createDelegatingPasswordEncoder();
        UserDetails jhon = User.builder().username("jhon").password(encoder.encode("1234")).roles("USER").build();
        UserDetails admin = User.builder().username("admin").password(encoder.encode("password")).roles("ADMIN")
                .build();
        return new InMemoryUserDetailsManager(jhon, admin);
    }
}
