import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { useNavigate, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export const AdminPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    content: '',
    category: '',
    excerpt: '',
    published: false
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate('/signin');
      }
    };

    checkAuth();
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSwitchChange = (checked) => {
    setFormData(prev => ({
      ...prev,
      published: checked
    }));
  };

  // Auto-generate slug from title
  const handleTitleChange = (e) => {
    const title = e.target.value;
    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '');
    
    setFormData(prev => ({
      ...prev,
      title,
      slug
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { error } = await supabase
        .from('posts')
        .insert([formData]);
      
      if (error) throw error;
      
      // Redirect to the new post if published
      if (formData.published) {
        navigate(`/blog/${formData.slug}`);
      } else {
        // Clear form
        setFormData({
          title: '',
          slug: '',
          content: '',
          category: '',
          excerpt: '',
          published: false
        });
        alert('Draft saved successfully!');
      }
    } catch (error) {
      alert('Error creating post: ' + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-start justify-start pt-20 pb-8 px-4 max-w-3xl mx-auto">
      <Link to="/">
        <Button variant="ghost" className="mb-6">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Home
        </Button>
      </Link>

      <h1 className="text-3xl font-bold mb-8">Create New Post</h1>
      
      <form onSubmit={handleSubmit} className="w-full space-y-6">
        <div className="space-y-2">
          <label className="text-sm font-medium">Title</label>
          <Input
            name="title"
            value={formData.title}
            onChange={handleTitleChange}
            required
            placeholder="Post title"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Slug</label>
          <Input
            name="slug"
            value={formData.slug}
            onChange={handleChange}
            required
            placeholder="post-url-slug"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Category</label>
          <Input
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
            placeholder="NEXT.JS"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Excerpt</label>
          <Textarea
            name="excerpt"
            value={formData.excerpt}
            onChange={handleChange}
            required
            placeholder="Brief description of the post"
            rows={3}
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Content</label>
          <Textarea
            name="content"
            value={formData.content}
            onChange={handleChange}
            required
            placeholder="Post content (supports markdown)"
            rows={10}
          />
        </div>

        <div className="flex items-center space-x-2">
          <Switch
            checked={formData.published}
            onCheckedChange={handleSwitchChange}
          />
          <label className="text-sm font-medium">Publish immediately</label>
        </div>

        <Button 
          type="submit" 
          disabled={isLoading}
          className="w-full"
        >
          {isLoading ? 'Creating...' : 'Create Post'}
        </Button>
      </form>
    </div>
  );
};

export default AdminPage; 