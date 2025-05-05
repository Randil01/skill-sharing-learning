import React, { useState, useRef, useEffect } from 'react';
import { Avatar, TextField, Button } from '@mui/material';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import RepeatIcon from '@mui/icons-material/Repeat';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import BarChartIcon from '@mui/icons-material/BarChart';
import UploadIcon from '@mui/icons-material/Upload';

const PostCard = ({ post }) => {
  const { content, image, user = "user", username = "@user" } = post;

  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(8);
  const [commentsVisible, setCommentsVisible] = useState(false);
  const [uploaded, setUploaded] = useState(false);
  const [commentText, setCommentText] = useState('');
  const [comments, setComments] = useState([]);
  const commentInputRef = useRef(null);

  const toggleLike = () => {
    setLiked((prev) => !prev);
    setLikeCount((prev) => (liked ? prev - 1 : prev + 1));
  };

  const toggleComments = () => {
    setCommentsVisible((prev) => !prev);
  };

  const handleUpload = () => {
    if (!uploaded) {
      setUploaded(true);
      console.log('Upload clicked!');
    }
  };

  const handleCommentSubmit = () => {
    if (commentText.trim() !== '') {
      setComments([...comments, commentText]);
      setCommentText('');
    }
  };

  // Focus comment input when comments open
  useEffect(() => {
    if (commentsVisible && commentInputRef.current) {
      commentInputRef.current.focus();
    }
  }, [commentsVisible]);

  const imageUrl = image?.trim() !== '' ? image : '/default-image.jpg';
  console.log('Post image prop:', image);

  return (
    <div className="border-b px-5 py-6 flex gap-4 w-full">
      <Avatar alt={user} />
      <div className="w-full">
        {/* Header */}
        <div className="flex justify-between items-center">
          <p className="text-sm">
            <span className="font-semibold">{user}</span>
            <span className="text-gray-500 ml-2">{username} Â· 2m</span>
          </p>
          <div className="font-bold cursor-pointer text-lg">â‹¯</div>
        </div>

        {/* Content */}
        <div className="my-2 text-base text-gray-800 whitespace-pre-wrap">
          {content || "No content provided"}
        </div>

        {/* Image */}
        {(image && image.trim() !== '') && (
          <div className="border border-gray-300 p-3 rounded-md w-full max-w-md">
            <img
              src={imageUrl}
              alt="Post visual"
              className="rounded-md max-h-72 w-full object-cover"
              onError={(e) => {
                e.target.src = '/default-image.jpg';
              }}
            />
          </div>
        )}

        {/* Uploader Info */}
        <div className="flex items-center gap-2 mt-3 text-xs text-gray-600">
          <UploadIcon fontSize="small" className="text-blue-500" aria-label="upload icon"/>
          <span>Uploaded by {user}</span>
        </div>

        {/* Action Icons */}
        <div className="flex flex-wrap gap-4 mt-4 text-gray-500 text-xs">
          {/* Comments */}
          <div
            onClick={toggleComments}
            className="flex items-center gap-1 cursor-pointer hover:text-blue-500"
            aria-label="comments button"
          >
            <ChatBubbleOutlineIcon fontSize="small" />
            <span>{comments.length}</span>
          </div>

          {/* Reposts */}
          <div
            className="flex items-center gap-1 cursor-pointer hover:text-green-500"
            aria-label="repost button"
          >
            <RepeatIcon fontSize="small" />
            <span>3</span>
          </div>

          {/* Likes */}
          <div
            onClick={toggleLike}
            className={`flex items-center gap-1 cursor-pointer ${
              liked ? 'text-red-500' : 'hover:text-red-500'
            }`}
            aria-label="like button"
          >
            {liked ? <FavoriteIcon fontSize="small" /> : <FavoriteBorderIcon fontSize="small" />}
            <span>{likeCount}</span>
          </div>

          {/* Views */}
          <div className="flex items-center gap-1" aria-label="views">
            <BarChartIcon fontSize="small" />
            <span>143</span>
          </div>

          {/* Upload */}
          <div
            onClick={handleUpload}
            className={`flex items-center gap-1 cursor-pointer ${
              uploaded ? 'text-green-600' : 'hover:text-green-600'
            }`}
            aria-label="upload button"
          >
            <UploadIcon fontSize="small" />
            <span>{uploaded ? 'Done' : 'Upload'}</span>
          </div>
        </div>

        {/* Comments Section */}
        {commentsVisible && (
          <div className="mt-3 text-sm text-gray-700 border-t pt-3">
            <p className="font-semibold mb-2">ðŸ’¬ Comments</p>

            {comments.length > 0 ? (
              <ul className="mb-2">
                {comments.map((comment, idx) => (
                  <li key={idx} className="mb-1 border-b pb-1">
                    {comment}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-400 mb-2">No comments yet.</p>
            )}

            {/* Comment input */}
            <div className="flex gap-2">
              <TextField
                size="small"
                variant="outlined"
                fullWidth
                placeholder="Write a comment..."
                value={commentText}
                inputRef={commentInputRef}
                onChange={(e) => setCommentText(e.target.value)}
              />
              <Button variant="contained" onClick={handleCommentSubmit}>
                Post
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PostCard;
