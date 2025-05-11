package com.example.backend.config;

import java.util.Arrays;
import java.util.Collections;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import jakarta.servlet.http.HttpServletRequest;

@Configuration
public class AppConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http.sessionManagement()
            .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
            .and()
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/api/**").authenticated()  // Require authentication for API routes
                .anyRequest().permitAll()  // Allow other requests without authentication
            )
            .addFilterBefore(new JwtTokenValidator(), BasicAuthenticationFilter.class)  // Add JWT filter
            .csrf().disable()
            .cors().configurationSource(corsConfigrationSource())  // Configure CORS
            .and()
            .httpBasic().and().formLogin();  // Enable HTTP basic and form login if needed
        
        return http.build();
    }

    private CorsConfigurationSource corsConfigrationSource() {
        return request -> {
            CorsConfiguration cfg = new CorsConfiguration();
            cfg.setAllowedOrigins(Arrays.asList("http://localhost:3000"));  // Specify allowed origin for CORS
            cfg.setAllowedMethods(Collections.singletonList("*"));  // Allow all HTTP methods
            cfg.setAllowCredentials(true);  // Allow credentials (cookies, etc.)
            cfg.setAllowedHeaders(Collections.singletonList("*"));  // Allow all headers
            cfg.setExposedHeaders(Arrays.asList("Authorization"));  // Expose Authorization header
            cfg.setMaxAge(3600L);  // Cache preflight response for 1 hour
            return cfg;
        };
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();  // Use BCryptPasswordEncoder for password encoding
    }
}
