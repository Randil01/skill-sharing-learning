import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import {
  Avatar,
  IconButton,
  Menu,
  MenuItem,
  TextField,
  Button,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import ShareIcon from "@mui/icons-material/Share";

const PostCard = ({
  postId,
  content,
  mediaUrl,
  mediaType,
  username = "User",
  userAvatarUrl = "",
  onEdit = () => {},
  onDelete = () => {},
}) => {
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
    onEdit(postId);
  };

  const handleDelete = () => {
    handleMenuClose();
    if (window.confirm("Are you sure you want to delete this post?")) {
      onDelete(postId);
    }
  };

  const handleLike = () => {
    const newLiked = !liked;
    setLiked(newLiked);
    setLikeCount((count) => (newLiked ? count + 1 : count - 1));
  };

  const handleToggleCommentBox = () => {
    setShowCommentBox((prev) => !prev);
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (!comment.trim()) return;
    setComments((prev) => [...prev, comment.trim()]);
    setComment("");
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    alert("Post link copied to clipboard!");
  };

  const renderMedia = () => {
    if (!mediaUrl || !mediaType) return null;

    const commonClasses = "w-full max-w-xl border border-gray-300 rounded-md mt-3";

    return mediaType === "image" ? (
      <img className={commonClasses} src={mediaUrl} alt="Shared post media" />
    ) : mediaType === "video" ? (
      <video className={commonClasses} controls>
        <source src={mediaUrl} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    ) : null;
  };

  return (
    <div>
    <article
      className="border border-gray-200 p-4 rounded-md shadow-sm max-w-xl mx-auto mb-6"
      role="region"
      aria-labelledby={`post-${postId}-username`}
    >
      <header className="flex items-center space-x-4">
        <Avatar alt={username} src={userAvatarUrl} />
        <div className="flex-1">
          <h2 id={`post-${postId}-username`} className="font-semibold">
            {username}
          </h2>
          <time
            className="text-sm text-gray-500"
            dateTime={new Date().toISOString()}
          >
            @{username.toLowerCase()} · just now
          </time>
        </div>
        <IconButton
          aria-label="Post options"
          onClick={handleMenuOpen}
          size="large"
        >
          <MoreVertIcon />
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleMenuClose}
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          transformOrigin={{ vertical: "top", horizontal: "right" }}
        >
          <MenuItem onClick={handleEdit}>Edit</MenuItem>
          <MenuItem onClick={handleDelete}>Delete</MenuItem>
        </Menu>
      </header>

      <section className="mt-2">
        <p className="whitespace-pre-wrap text-gray-800">{content}</p>
        {renderMedia()}
      </section>

      <section className="flex items-center space-x-6 mt-4 text-gray-600">
        <button
          onClick={handleLike}
          className="flex items-center space-x-1 hover:text-blue-600"
          aria-label={liked ? "Unlike post" : "Like post"}
        >
          {liked ? (
            <FavoriteIcon className="text-red-500" />
          ) : (
            <FavoriteBorderIcon />
          )}
          <span>{likeCount}</span>
        </button>

        <button
          onClick={handleToggleCommentBox}
          className="flex items-center space-x-1 hover:text-blue-600"
          aria-label="Comment on post"
        >
          <ChatBubbleOutlineIcon />
          <span>{comments.length}</span>
        </button>

        <button
          onClick={handleShare}
          className="flex items-center space-x-1 hover:text-blue-600"
          aria-label="Share post"
        >
          <ShareIcon />
        </button>
      </section>

      {showCommentBox && (
        <section className="mt-4 space-y-3">
          <form onSubmit={handleCommentSubmit} className="flex space-x-2">
            <TextField
              fullWidth
              size="small"
              variant="outlined"
              placeholder="Write a comment..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            <Button type="submit" variant="contained" color="primary">
              Post
            </Button>
          </form>
          <div className="space-y-2 max-h-48 overflow-y-auto">
            {comments.map((c, i) => (
              <p key={i} className="text-sm bg-gray-100 p-2 rounded">
                {c}
              </p>
            ))}
          </div>
        </section>
      )}
    </article>
    </div>
  );
};

PostCard.propTypes = {
  postId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  content: PropTypes.string.isRequired,
  mediaUrl: PropTypes.string,
  mediaType: PropTypes.oneOf(["image", "video"]),
  username: PropTypes.string,
  userAvatarUrl: PropTypes.string,
  onEdit: PropTypes.func,
  onDelete: PropTypes.func,
};

export default PostCard;
