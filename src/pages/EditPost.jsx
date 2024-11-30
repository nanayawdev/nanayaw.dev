import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { blogService } from '../services/blogService';

const EditPost = () => {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [post, setPost] = useState({
    title: '',
    content: '',
    category: '',
    slug: '',
    image_url: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      let updatedPost;
      if (isEditing) {
        // Update existing post
        updatedPost = await blogService.updatePost(post.id, {
          title: post.title,
          content: post.content,
          category: post.category,
          slug: post.slug,
          image_url: post.image_url
        });
      } else {
        // Create new post
        updatedPost = await blogService.createPost({
          title: post.title,
          content: post.content,
          category: post.category,
          slug: post.slug,
          image_url: post.image_url
        });
      }

      toast.success(isEditing ? 'Post updated successfully!' : 'Post created successfully!');
      navigate(`/blog/${updatedPost.slug}`);
    } catch (err) {
      console.error(isEditing ? 'Error updating post:' : 'Error creating post:', err);
      toast.error(isEditing ? 'Error updating post' : 'Error creating post');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      {/* Render your form here */}
    </div>
  );
};

export default EditPost; 