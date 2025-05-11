package com.example.backend.modal;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Post {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String content;

    private String imageUrl;  // Will store filename or base64 string

    private String username;  // Dummy static user for now

    private String userAvatarUrl;

    private String createdAt; // Optional: timestamp as String for now
}
