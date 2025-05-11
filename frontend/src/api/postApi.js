import axios from "axios";

const BASE_URL = "http://localhost:5454/api/posts";

export const createPost = (postData) => axios.post(BASE_URL, postData);
export const getPosts = () => axios.get(BASE_URL);
export const deletePost = (postId) => axios.delete(`${BASE_URL}/${postId}`);
export const updatePost = (postId, postData) => axios.put(`${BASE_URL}/${postId}`, postData);
