import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { blogService } from '@/services/blogService';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ImagePlus } from "lucide-react";

const EditPost = () => {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [post, setPost] = useState({
    title: '',
    content: '',
    category: '',
    slug: '',
    image: null,
    image_path: null
  });
  const [previewUrl, setPreviewUrl] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (post.image_path) {
      setPreviewUrl(blogService.getImageUrl(post.image_path));
    }
  }, [post.image_path]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPost(prev => ({ ...prev, image: file }));
      // Create preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      let updatedPost;
      if (isEditing) {
        updatedPost = await blogService.updatePost(post.id, post);
      } else {
        updatedPost = await blogService.createPost(post);
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
    <form onSubmit={handleSubmit}>
      {/* Other form fields */}
      
      <div className="space-y-2">
        <label className="block text-sm font-medium">Post Image</label>
        <div className="flex items-center gap-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => document.getElementById('image-upload').click()}
            className="flex items-center gap-2"
          >
            <ImagePlus className="w-4 h-4" />
            {post.image ? 'Change Image' : 'Add Image'}
          </Button>
          <Input
            id="image-upload"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
          />
        </div>
        {previewUrl && (
          <div className="mt-4">
            <img
              src={previewUrl}
              alt="Preview"
              className="w-full max-w-md h-48 object-cover rounded-lg"
            />
          </div>
        )}
      </div>

      {/* Submit button */}
      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Saving...' : (isEditing ? 'Update Post' : 'Create Post')}
      </Button>
    </form>
  );
};

export default EditPost; 