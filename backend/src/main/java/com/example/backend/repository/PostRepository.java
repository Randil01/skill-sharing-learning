package com.example.backend.repository;

import com.example.backend.modal.Post;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PostRepository extends JpaRepository<Post, Long> {
    // You can later add custom queries if needed, like:
    // List<Post> findByUsername(String username);
}
