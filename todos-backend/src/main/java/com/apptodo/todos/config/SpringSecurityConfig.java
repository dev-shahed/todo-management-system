package com.apptodo.todos.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.apptodo.todos.security.JwtAuthenticationEntryPoint;
import com.apptodo.todos.security.JwtAuthenticationFilter;

import lombok.AllArgsConstructor;

@AllArgsConstructor
@EnableMethodSecurity
@Configuration
public class SpringSecurityConfig {
    private UserDetailsService userDetailsService;
    private JwtAuthenticationEntryPoint jwtAuthenticationEntryPoint;
    private JwtAuthenticationFilter jwtAuthenticationFilter;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http.csrf(csrf -> csrf.disable())
                .authorizeRequests(authorize -> {
                    // >>>>>>>>Role base Security.....>>>>>>>
                    // authorize.requestMatchers(HttpMethod.POST, "/api/**").hasRole("ADMIN");
                    // authorize.requestMatchers(HttpMethod.PUT, "/api/**").hasRole("ADMIN");
                    // authorize.requestMatchers(HttpMethod.DELETE, "/api/**").hasRole("ADMIN");
                    // authorize.requestMatchers(HttpMethod.GET, "/api/**").hasAnyRole("ADMIN",
                    // "USER");
                    // authorize.requestMatchers(HttpMethod.PATCH, "/api/**").hasAnyRole("ADMIN",
                    // "USER");
                    // authorize.requestMatchers(HttpMethod.GET, "/api/**").permitAll();
                    authorize.requestMatchers(HttpMethod.POST, "/api/todos").hasRole("ADMIN");
                    authorize.requestMatchers("/api/auth/**").permitAll();
                    authorize.anyRequest().authenticated();
                }).httpBasic();
        http.exceptionHandling((exception) -> exception.authenticationEntryPoint(jwtAuthenticationEntryPoint));
        http.addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);
        return http.build();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration configuration) throws Exception {
        return configuration.getAuthenticationManager();
    }

    // @Bean
    // public UserDetailsService userDetailsService() {
    // PasswordEncoder encoder =
    // PasswordEncoderFactories.createDelegatingPasswordEncoder();
    // UserDetails jhon =
    // User.builder().username("jhon").password(encoder.encode("1234")).roles("USER").build();
    // UserDetails admin =
    // User.builder().username("admin").password(encoder.encode("password")).roles("ADMIN")
    // .build();
    // return new InMemoryUserDetailsManager(jhon, admin);
    // }
}
