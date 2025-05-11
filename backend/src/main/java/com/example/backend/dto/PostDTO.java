package com.example.backend.dto;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PostDTO {
    private Long id;
    private String content;
    private String imageUrl;
    private String username;
    private String userAvatarUrl;
    private String createdAt;
}

