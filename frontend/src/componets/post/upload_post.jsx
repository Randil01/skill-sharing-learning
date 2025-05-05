import React, { useEffect, useState } from 'react';
import {
  Avatar, Button, CircularProgress, Menu, MenuItem,
  Dialog, DialogTitle, DialogContent, DialogActions, TextField
} from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import ImageIcon from '@mui/icons-material/Image';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import SendIcon from '@mui/icons-material/Send';
import axios from 'axios';

// Constants
const BACKEND_URL = "http://localhost:8080/api/posts";
const CLOUDINARY_URL = "https://api.cloudinary.com/v1_1/dhxfhjo5r/image/upload";

const validationSchema = Yup.object().shape({
  content: Yup.string().required("Description is required"),
});

const UploadPost = () => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [previewUrls, setPreviewUrls] = useState([]);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [likes, setLikes] = useState({});
  const [commentsVisible, setCommentsVisible] = useState({});
  const [anchorEl, setAnchorEl] = useState(null);
  const [menuPostId, setMenuPostId] = useState(null);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editContent, setEditContent] = useState("");
  const [editingPostId, setEditingPostId] = useState(null);
  const [commentInputs, setCommentInputs] = useState({});
  const [postComments, setPostComments] = useState({});
  const [editFiles, setEditFiles] = useState([]);

  // Fetch posts from backend
  const fetchPosts = async () => {
    setLoading(true);
    try {
      const response = await axios.get(BACKEND_URL);
      const fetchedPosts = Array.isArray(response.data) ? response.data : [];
      setPosts(fetchedPosts); // Ensure it's always an array
    } catch (error) {
      console.error("Fetch posts error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  useEffect(() => {
    const urls = selectedFiles.map(file => URL.createObjectURL(file));
    setPreviewUrls(urls);
    return () => { urls.forEach(url => URL.revokeObjectURL(url)); };
  }, [selectedFiles]);

  const formik = useFormik({
    initialValues: { content: "" },
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        let uploadedUrls = [];

        for (const file of selectedFiles) {
          const formData = new FormData();
          formData.append('file', file);
          formData.append('upload_preset', 'mjqmabah');

          const res = await axios.post(CLOUDINARY_URL, formData);
          uploadedUrls.push(res.data.secure_url);
        }

        await axios.post(BACKEND_URL, {
          content: values.content,
          files: uploadedUrls
        });

        resetForm();
        setSelectedFiles([]);
        fetchPosts();
      } catch (error) {
        console.error("Upload error:", error);
      }
    },
  });

  const handleSelectFiles = (event) => {
    const files = Array.from(event.target.files);
    const newFiles = [...selectedFiles, ...files];

    if (newFiles.length > 3) {
      alert('You can upload up to 3 files only.');
      return;
    }

    const validateAndSetFiles = async () => {
      const validFiles = [];

      for (const file of files) {
        if (file.type.startsWith('video/')) {
          const duration = await getVideoDuration(file);
          if (duration > 30) {
            alert(`Video "${file.name}" exceeds 30 seconds.`);
          } else {
            validFiles.push(file);
          }
        } else {
          validFiles.push(file);
        }
      }

      const updatedFiles = [...selectedFiles, ...validFiles];
      if (updatedFiles.length > 3) {
        alert('You can upload up to 3 files only.');
        return;
      }
      setSelectedFiles(updatedFiles);
    };

    validateAndSetFiles();
  };

  const getVideoDuration = (file) => {
    return new Promise((resolve) => {
      const video = document.createElement('video');
      video.preload = 'metadata';
      video.onloadedmetadata = () => {
        window.URL.revokeObjectURL(video.src);
        resolve(video.duration);
      };
      video.src = URL.createObjectURL(file);
    });
  };

  const removeSelectedFile = (index) => {
    const updated = selectedFiles.filter((_, i) => i !== index);
    setSelectedFiles(updated);
  };

  const toggleLike = (id) => {
    setLikes((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const toggleComments = (id) => {
    setCommentsVisible((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleCommentChange = (postId, value) => {
    setCommentInputs((prev) => ({ ...prev, [postId]: value }));
  };

  const handleAddComment = (postId) => {
    if (!commentInputs[postId]) return;
    const newComment = commentInputs[postId];
    setPostComments((prev) => ({
      ...prev,
      [postId]: [...(prev[postId] || []), newComment],
    }));
    setCommentInputs((prev) => ({ ...prev, [postId]: "" }));
  };

  const handleDeleteComment = (postId, commentIndex) => {
    setPostComments((prevComments) => {
      const existingComments = prevComments[postId] || [];
      const updatedComments = existingComments.filter((_, index) => index !== commentIndex);
      return {
        ...prevComments,
        [postId]: updatedComments
      };
    });
  };

  const handleMenuOpen = (event, postId) => {
    setAnchorEl(event.currentTarget);
    setMenuPostId(postId);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setMenuPostId(null);
  };

  const handleEdit = (post) => {
    setEditContent(post.content);
    setEditingPostId(post.id);
    setEditFiles([]);
    setEditModalOpen(true);
    handleMenuClose();
  };

  const handleUpdatePost = async () => {
    try {
      let uploadedUrls = [];

      for (const file of editFiles) {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', 'mjqmabah');

        const res = await axios.post(CLOUDINARY_URL, formData);
        uploadedUrls.push(res.data.secure_url);
      }

      await axios.put(`${BACKEND_URL}/${editingPostId}`, {
        content: editContent,
        files: uploadedUrls
      });

      setEditModalOpen(false);
      setEditContent('');
      setEditingPostId(null);
      fetchPosts();
    } catch (error) {
      console.error("Update post error:", error);
    }
  };

  const handleDelete = async (postId) => {
    try {
      await axios.delete(`${BACKEND_URL}/${postId}`);
      fetchPosts();
    } catch (error) {
      console.error("Delete post error:", error);
    }
    handleMenuClose();
  };

  return (
    <div className='space-y-5 p-4'>
      <h1 className='py-5 text-xl font-bold opacity-90'>Skill Sharing Posts</h1>

      {/* Post form */}
      <div className='flex space-x-5 pb-10'>
        <Avatar alt="username" src={null} />
        <div className='w-full'>
          <form onSubmit={formik.handleSubmit}>
            <input
              type='text'
              name='content'
              placeholder='Share your skill or tip...'
              className='border p-2 rounded w-full text-lg bg-white'
              {...formik.getFieldProps("content")}
            />
            {formik.errors.content && formik.touched.content && (
              <span className='text-red-500 text-sm'>{formik.errors.content}</span>
            )}

            {selectedFiles.length > 0 && (
              <div className='mt-3 flex space-x-2'>
                {selectedFiles.map((file, index) => (
                  <div key={index} className='relative'>
                    {file.type.startsWith('image') ? (
                      <img src={previewUrls[index]} alt="preview" className='w-24 h-24 object-cover rounded' />
                    ) : (
                      <video src={previewUrls[index]} className='w-24 h-24 rounded' muted />
                    )}
                    <button
                      type='button'
                      className='absolute top-0 right-0 bg-red-500 text-white rounded-full text-xs px-1'
                      onClick={() => removeSelectedFile(index)}
                    >X</button>
                  </div>
                ))}
              </div>
            )}

            <div className='space-x-3 mt-4'>
              <Button variant="outlined" component="label">
                <ImageIcon />
                <input type="file" hidden accept="image/*,video/*" multiple onChange={handleSelectFiles} />
              </Button>
              <Button type='submit' variant="contained" endIcon={<SendIcon />}>
                Post
              </Button>
            </div>
          </form>
        </div>
      </div>

      {/* Post display */}
      <div className='space-y-5'>
        {loading ? (
          <CircularProgress />
        ) : posts.length > 0 ? (
          posts.map((post) => (
            <div key={post.id} className="border p-4 rounded-lg">
              <div className="flex items-center space-x-3">
                <Avatar alt={post.user.username} src={post.user.avatar || null} />
                <span>{post.user.username}</span>
                <span className="text-sm text-gray-500">{new Date(post.createdAt).toLocaleString()}</span>
                <MoreVertIcon
                  className="ml-auto cursor-pointer"
                  onClick={(event) => handleMenuOpen(event, post.id)}
                />
              </div>
              <div className="mt-3 text-lg">{post.content}</div>
              {post.files && post.files.map((file, index) => (
                <div key={index} className="mt-3">
                  {file.endsWith('.mp4') ? (
                    <video controls className="w-full">
                      <source src={file} />
                    </video>
                  ) : (
                    <img src={file} alt="Post media" className="w-full h-64 object-cover mt-3" />
                  )}
                </div>
              ))}
              {/* Likes and comments section */}
              <div className="flex items-center mt-3">
                <button
                  onClick={() => toggleLike(post.id)}
                  className="flex items-center space-x-1 text-sm"
                >
                  {likes[post.id] ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                  <span>{post.likes || 0}</span>
                </button>
                <button
                  onClick={() => toggleComments(post.id)}
                  className="flex items-center space-x-1 text-sm ml-4"
                >
                  <ChatBubbleOutlineIcon />
                  <span>{post.comments || 0}</span>
                </button>
              </div>
              {commentsVisible[post.id] && (
                <div className="mt-3">
                  <TextField
                    label="Write a comment"
                    variant="outlined"
                    fullWidth
                    value={commentInputs[post.id] || ""}
                    onChange={(e) => handleCommentChange(post.id, e.target.value)}
                  />
                  <Button onClick={() => handleAddComment(post.id)} variant="contained" size="small" className="mt-2">
                    Comment
                  </Button>
                  <div className="mt-3">
                    {postComments[post.id] && postComments[post.id].map((comment, index) => (
                      <div key={index} className="flex justify-between items-center space-x-3">
                        <span>{comment}</span>
                        <button
                          className="text-red-500"
                          onClick={() => handleDeleteComment(post.id, index)}
                        >
                          Delete
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))
        ) : (
          <p>No posts available.</p>
        )}
      </div>

      {/* Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={() => handleEdit(posts.find(post => post.id === menuPostId))}>Edit</MenuItem>
        <MenuItem onClick={() => handleDelete(menuPostId)}>Delete</MenuItem>
      </Menu>

      {/* Edit Modal */}
      <Dialog open={editModalOpen} onClose={() => setEditModalOpen(false)}>
        <DialogTitle>Edit Post</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Content"
            value={editContent}
            onChange={(e) => setEditContent(e.target.value)}
            multiline
            rows={4}
          />
          <input
            type="file"
            multiple
            accept="image/*,video/*"
            onChange={(e) => setEditFiles([...e.target.files])}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditModalOpen(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleUpdatePost} color="primary">
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default UploadPost;
