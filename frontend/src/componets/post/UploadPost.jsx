import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import Avatar from "@mui/material/Avatar";
import ImageIcon from "@mui/icons-material/Image";
import FmdGoodIcon from "@mui/icons-material/FmdGood";
import TagFacesIcon from "@mui/icons-material/TagFaces";
import * as Yup from "yup";
import PostCard from "./postcard";

const validationSchema = Yup.object().shape({
  content: Yup.string().required("Description is required"),
  mediaUrl: Yup.string().nullable().required("Upload an image or video"),
});

const API_URL = "http://localhost:5454/posts";

const UploadPost = () => {
  const [posts, setPosts] = useState([]);
  const [uploadingMedia, setUploadingMedia] = useState(false);
  const [selectedMediaPreview, setSelectedMediaPreview] = useState(null);
  const [mediaType, setMediaType] = useState("");

  // Fetch posts from backend on mount
  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => setPosts(data.reverse())) // reverse to show latest first
      .catch((err) => console.error("Failed to fetch posts", err));
  }, []);

  const formik = useFormik({
    initialValues: {
      content: "",
      mediaUrl: null,
    },
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        const response = await fetch(API_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            content: values.content,
            mediaUrl: values.mediaUrl,
            mediaType: mediaType,
          }),
        });

        if (!response.ok) throw new Error("Failed to save post");

        const savedPost = await response.json();
        setPosts([savedPost, ...posts]);
        resetForm();
        setSelectedMediaPreview(null);
        setMediaType("");
      } catch (error) {
        alert(error.message);
      }
    },
  });

  const uploadToCloudinary = async (file) => {
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "mjqmabah");
    data.append("cloud_name", "dhxfhjo5r");

    const res = await fetch(
      "https://api.cloudinary.com/v1_1/dhxfhjo5r/auto/upload",
      {
        method: "POST",
        body: data,
      }
    );

    const json = await res.json();
    return json.secure_url;
  };

  const handleSelectMedia = async (event) => {
    const mediaFile = event.target.files[0];
    if (!mediaFile) return;

    setUploadingMedia(true);
    const fileType = mediaFile.type;

    if (fileType.startsWith("image/")) {
      setMediaType("image");
    } else if (fileType.startsWith("video/")) {
      setMediaType("video");

      const videoElement = document.createElement("video");
      videoElement.src = URL.createObjectURL(mediaFile);

      await new Promise((resolve, reject) => {
        videoElement.onloadedmetadata = () => {
          if (videoElement.duration > 30) {
            alert("Video duration cannot exceed 30 seconds.");
            setUploadingMedia(false);
            reject("Video too long");
          } else {
            resolve();
          }
        };
      });
    }

    try {
      const uploadedUrl = await uploadToCloudinary(mediaFile);
      formik.setFieldValue("mediaUrl", uploadedUrl);
      setSelectedMediaPreview(uploadedUrl);
    } catch (error) {
      alert("Upload failed. Please try again.");
    }

    setUploadingMedia(false);
  };

  const handleDelete = async (postId) => {
    try {
      const response = await fetch(`${API_URL}/${postId}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Failed to delete post");

      setPosts(posts.filter((post) => post.id !== postId));
    } catch (error) {
      alert(error.message);
    }
  };

  const handleEdit = (postId) => {
    const postToEdit = posts.find((post) => post.id === postId);
    if (!postToEdit) return;

    formik.setFieldValue("content", postToEdit.content);
    formik.setFieldValue("mediaUrl", postToEdit.mediaUrl);
    setSelectedMediaPreview(postToEdit.mediaUrl);
    setMediaType(postToEdit.mediaType);

    // Remove post from list so it won't duplicate on submit
    setPosts(posts.filter((post) => post.id !== postId));
  };

  return (
    <div className="space-y-5">
      {/* Post Upload Section */}
      <section className="pb-10">
        <div className="flex space-x-5">
          <Avatar alt="username" src="" className="w-16 h-16 rounded-full" />

          <div className="w-full">
            <form onSubmit={formik.handleSubmit}>
              {/* Text Input */}
              <div>
                <input
                  type="text"
                  name="content"
                  placeholder="What is happening?"
                  className="border outline-none text-xl bg-transparent w-full"
                  {...formik.getFieldProps("content")}
                />
                {formik.touched.content && formik.errors.content && (
                  <span className="text-red-500">{formik.errors.content}</span>
                )}
              </div>

              {/* Media Preview */}
              {selectedMediaPreview && (
                <div className="mt-3">
                  {mediaType === "image" ? (
                    <img
                      src={selectedMediaPreview}
                      alt="Preview"
                      className="w-48 rounded-md border"
                    />
                  ) : (
                    <video
                      src={selectedMediaPreview}
                      controls
                      className="w-48 rounded-md border"
                    />
                  )}
                </div>
              )}

              {/* Buttons */}
              <div className="flex justify-between items-center mt-5">
                <div className="flex space-x-5 items-center">
                  <label className="flex items-center space-x-2 rounded-md cursor-pointer">
                    <ImageIcon className="text-[#1d9bf0]" />
                    <input
                      type="file"
                      name="mediaFile"
                      className="hidden"
                      onChange={handleSelectMedia}
                      accept="image/*,video/*"
                    />
                  </label>
                  <FmdGoodIcon className="text-[#1d9bf0]" />
                  <TagFacesIcon className="text-[#1d9bf0]" />
                </div>

                <button
                  type="submit"
                  className="bg-blue-600 text-white rounded-2xl px-5 py-2 hover:bg-blue-700 transition"
                  disabled={uploadingMedia}
                >
                  {uploadingMedia ? "Uploading..." : "Post"}
                </button>
              </div>

              {formik.touched.mediaUrl && formik.errors.mediaUrl && (
                <span className="text-red-500">{formik.errors.mediaUrl}</span>
              )}
            </form>
          </div>
        </div>
      </section>

      {/* Posts Display Section */}
      <section>
        {posts.map((post) => (
          <PostCard
            key={post.id}
            postId={post.id}
            content={post.content}
            mediaUrl={post.mediaUrl}
            mediaType={post.mediaType}
            onEdit={() => handleEdit(post.id)}
            onDelete={() => handleDelete(post.id)}
          />
        ))}
      </section>
    </div>
  );
};

export default UploadPost;
