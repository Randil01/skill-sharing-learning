import React, { useState, useEffect } from "react";
import { Avatar, IconButton, Menu, MenuItem, TextField, Button } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import ShareIcon from "@mui/icons-material/Share";

const PostCard = ({ postId, content, mediaUrl, mediaType, onEdit, onDelete }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [showCommentBox, setShowCommentBox] = useState(false);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);

  const open = Boolean(anchorEl);

  useEffect(() => {
    const storedLikes = localStorage.getItem(`post-${postId}-liked`);
    const storedLikeCount = localStorage.getItem(`post-${postId}-likeCount`);
    const storedComments = localStorage.getItem(`post-${postId}-comments`);

    if (storedLikes !== null) setLiked(JSON.parse(storedLikes));
    if (storedLikeCount !== null) setLikeCount(Number(storedLikeCount));
    if (storedComments !== null) setComments(JSON.parse(storedComments));
  }, [postId]);

  useEffect(() => {
    localStorage.setItem(`post-${postId}-liked`, JSON.stringify(liked));
    localStorage.setItem(`post-${postId}-likeCount`, likeCount);
  }, [liked, likeCount, postId]);

  useEffect(() => {
    localStorage.setItem(`post-${postId}-comments`, JSON.stringify(comments));
  }, [comments, postId]);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleEdit = () => {
    handleMenuClose();
    onEdit();
  };

  const handleDelete = () => {
    handleMenuClose();
    onDelete();
  };

  const handleLike = () => {
    const newLiked = !liked;
    setLiked(newLiked);
    setLikeCount(newLiked ? likeCount + 1 : likeCount - 1);
  };

  const handleToggleCommentBox = () => {
    setShowCommentBox(!showCommentBox);
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (comment.trim() === "") return;
    setComments([...comments, comment.trim()]);
    setComment("");
  };

  const handleShare = () => {
    alert("Post shared! (Demo action)");
  };

  const renderMedia = () => {
    if (mediaUrl && mediaType) {
      if (mediaType === "image") {
        return (
          <img
            className="w-[28rem] border border-gray-400 p-2 rounded-md mt-2"
            src={mediaUrl}
            alt="Post media"
          />
        );
      } else if (mediaType === "video") {
        return (
          <video
            className="w-[28rem] border border-gray-400 p-2 rounded-md mt-2"
            src={mediaUrl}
            controls
          />
        );
      }
    }
    return null;
  };

  return (
    <div className="border border-gray-200 p-4 rounded-md shadow-sm space-y-3">
      <div className="flex space-x-5">
        <Avatar alt="username" className="w-16 h-16 rounded-full" />
        <div className="w-full">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2 cursor-pointer">
              <span className="font-semibold">User</span>
              <span className="text-gray-600">@username · 2m</span>
            </div>

            <IconButton
              aria-label="more"
              aria-controls={open ? "post-menu" : undefined}
              aria-haspopup="true"
              onClick={handleMenuOpen}
            >
              <MoreVertIcon />
            </IconButton>
            <Menu
              id="post-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleMenuClose}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
            >
              <MenuItem onClick={handleEdit}>Edit</MenuItem>
              <MenuItem onClick={handleDelete}>Delete</MenuItem>
            </Menu>
          </div>

          <div className="mt-2">
            <p>{content}</p>
            {renderMedia()}
          </div>

          {/* Like, Comment, Share Section */}
          <div className="flex space-x-10 mt-4 text-gray-600">
            <button
              onClick={handleLike}
              className="flex items-center space-x-1 hover:text-blue-600 transition"
            >
              {liked ? <FavoriteIcon className="text-red-500" /> : <FavoriteBorderIcon />}
              <span>{likeCount}</span>
            </button>

            <button
              onClick={handleToggleCommentBox}
              className="flex items-center space-x-1 hover:text-blue-600 transition"
            >
              <ChatBubbleOutlineIcon />
              <span>{comments.length}</span>
            </button>

            <button
              onClick={handleShare}
              className="flex items-center space-x-1 hover:text-blue-600 transition"
            >
              <ShareIcon />
            </button>
          </div>

          {/* Comment Box */}
          {showCommentBox && (
            <div className="mt-3 space-y-2">
              <form onSubmit={handleCommentSubmit} className="flex space-x-2">
                <TextField
                  fullWidth
                  size="small"
                  variant="outlined"
                  placeholder="Write a comment..."
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                />
                <Button variant="contained" color="primary" type="submit">
                  Post
                </Button>
              </form>

              <div className="space-y-1">
                {comments.map((c, idx) => (
                  <p key={idx} className="text-sm bg-gray-100 rounded p-2">
                    {c}
                  </p>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PostCard;
