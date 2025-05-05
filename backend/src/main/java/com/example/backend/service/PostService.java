package com.example.backend.service;

import com.example.backend.modal.Post;
import com.example.backend.repository.PostRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class PostService {

    private final PostRepository postRepository;

    public List<Post> getAllPosts() {
        return postRepository.findAll();
    }

    public Optional<Post> getPostById(Long id) {
        return postRepository.findById(id);
    }

    public Post createPost(Post post) {
        return postRepository.save(post);
    }

    public Post updatePost(Long id, Post updatedPost) {
        return postRepository.findById(id).map(post -> {
            post.setContent(updatedPost.getContent());
            post.setFiles(updatedPost.getFiles());
            return postRepository.save(post);
        }).orElseThrow(() -> new RuntimeException("Post not found with id " + id));
    }

    public void deletePost(Long id) {
        postRepository.deleteById(id);
    }
}
