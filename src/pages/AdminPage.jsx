import { useState, useEffect } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import CodeBlock from '@tiptap/extension-code-block';
import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import { supabase } from '@/lib/supabase';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { ArrowLeft, Bold, Italic, Code, List, ListOrdered, Link as LinkIcon, Image as ImageIcon, AlignLeft, AlignCenter, AlignRight, Trash2, Edit, Eye, Calendar } from 'lucide-react';
import { format } from 'date-fns';
import { DeletePostModal } from "@/components/DeletePostModal";
import { toast } from 'sonner';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { blogService } from '@/services/blogService';

const EditorMenuBar = ({ editor }) => {
  if (!editor) return null;

  return (
    <div className="border-b border-gray-200 dark:border-gray-800 p-2 flex items-center gap-2 flex-wrap">
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={`p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800 ${
          editor.isActive('bold') ? 'bg-gray-100 dark:bg-gray-800' : ''
        }`}
        title="Bold"
      >
        <Bold className="w-4 h-4" />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={`p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800 ${
          editor.isActive('italic') ? 'bg-gray-100 dark:bg-gray-800' : ''
        }`}
        title="Italic"
      >
        <Italic className="w-4 h-4" />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        className={`p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800 ${
          editor.isActive('codeBlock') ? 'bg-gray-100 dark:bg-gray-800' : ''
        }`}
        title="Code Block"
      >
        <Code className="w-4 h-4" />
      </button>
      <div className="w-px h-6 bg-gray-200 dark:bg-gray-700 mx-2" />
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={`p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800 ${
          editor.isActive('bulletList') ? 'bg-gray-100 dark:bg-gray-800' : ''
        }`}
        title="Bullet List"
      >
        <List className="w-4 h-4" />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={`p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800 ${
          editor.isActive('orderedList') ? 'bg-gray-100 dark:bg-gray-800' : ''
        }`}
        title="Numbered List"
      >
        <ListOrdered className="w-4 h-4" />
      </button>
      <div className="w-px h-6 bg-gray-200 dark:bg-gray-700 mx-2" />
      <button
        type="button"
        onClick={() => {
          const url = window.prompt('Enter the URL:');
          if (url) {
            editor.chain().focus().setLink({ href: url }).run();
          }
        }}
        className={`p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800 ${
          editor.isActive('link') ? 'bg-gray-100 dark:bg-gray-800' : ''
        }`}
        title="Add Link"
      >
        <LinkIcon className="w-4 h-4" />
      </button>
      <button
        type="button"
        onClick={() => {
          const url = window.prompt('Enter the image URL:');
          if (url) {
            editor.chain().focus().setImage({ src: url }).run();
          }
        }}
        className="p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800"
        title="Add Image"
      >
        <ImageIcon className="w-4 h-4" />
      </button>
      <div className="w-px h-6 bg-gray-200 dark:bg-gray-700 mx-2" />
      <button
        type="button"
        onClick={() => editor.chain().focus().setTextAlign('left').run()}
        className={`p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800 ${
          editor.isActive({ textAlign: 'left' }) ? 'bg-gray-100 dark:bg-gray-800' : ''
        }`}
        title="Align Left"
      >
        <AlignLeft className="w-4 h-4" />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().setTextAlign('center').run()}
        className={`p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800 ${
          editor.isActive({ textAlign: 'center' }) ? 'bg-gray-100 dark:bg-gray-800' : ''
        }`}
        title="Align Center"
      >
        <AlignCenter className="w-4 h-4" />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().setTextAlign('right').run()}
        className={`p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800 ${
          editor.isActive({ textAlign: 'right' }) ? 'bg-gray-100 dark:bg-gray-800' : ''
        }`}
        title="Align Right"
      >
        <AlignRight className="w-4 h-4" />
      </button>
    </div>
  );
};

const CATEGORIES = [
  "REACT.JS",
  "NEXT.JS",
  "VUE.JS",
  "HTML",
  "CSS",
  "JAVASCRIPT",
  "TAILWIND CSS",
  "WEB DEV",
  "UI/UX"
];

export const AdminPage = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    content: '',
    category: '',
    excerpt: '',
    published: false,
    status: 'draft',
    created_at: new Date().toISOString()
  });
  const [isLoading, setIsLoading] = useState(false);
  const [postToDelete, setPostToDelete] = useState(null);
  const [statusFilter, setStatusFilter] = useState('all');

  const editor = useEditor({
    extensions: [
      StarterKit,
      CodeBlock,
      Image,
      Link
    ],
    content: formData.content,
    onUpdate: ({ editor }) => {
      setFormData(prev => ({
        ...prev,
        content: editor.getHTML()
      }));
    }
  });

  useEffect(() => {
    loadPosts();
    checkAuth();
  }, []);

  const checkAuth = async () => {
    const { data: { session }, error } = await supabase.auth.getSession();
    
    if (error || !session) {
      toast.error('Your session has expired. Please sign in again.');
      navigate('/signin');
      return;
    }
    
    // Optional: Refresh session if it's close to expiring
    const { data: { session: refreshedSession }, error: refreshError } = 
      await supabase.auth.refreshSession();
    
    if (refreshError) {
      toast.error('Unable to refresh session. Please sign in again.');
      navigate('/signin');
    }
  };

  const loadPosts = async () => {
    try {
      const data = await blogService.getAllPostsAdmin();
      console.log('Loaded posts:', data);
      setPosts(data);
    } catch (error) {
      toast.error('Error loading posts: ' + error.message);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this post?')) return;
    
    const { error } = await supabase
      .from('posts')
      .delete()
      .eq('id', id);
    
    if (error) {
      alert('Error deleting post');
      return;
    }
    
    loadPosts();
  };

  const handleEdit = (post) => {
    setSelectedPost(post);
    setFormData(post);
    editor?.commands.setContent(post.content);
  };

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
      const postData = {
        ...formData,
        published_at: formData.published ? new Date().toISOString() : null,
        status: formData.published ? 'published' : 'draft'
      };

      let result;
      if (selectedPost) {
        result = await blogService.updatePost(selectedPost.id, postData);
        toast.success(formData.published 
          ? 'Post updated and published!' 
          : 'Draft updated successfully!');
      } else {
        result = await blogService.createPost(postData);
        toast.success(formData.published 
          ? 'New post published!' 
          : 'New draft saved!');
      }

      // Update local posts list
      setPosts(prev => {
        if (selectedPost) {
          return prev.map(p => p.id === selectedPost.id ? result : p);
        }
        return [result, ...prev];
      });

      if (formData.published) {
        navigate(`/blog/${formData.slug}`);
      } else if (!selectedPost) {
        // Clear form only for new posts
        handleCancelEdit();
      }
    } catch (error) {
      console.error('Save error:', error);
      toast.error(`Error saving post: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteConfirm = async () => {
    if (!postToDelete) return;
    
    try {
      setIsLoading(true);
      const { error } = await supabase
        .from('posts')
        .delete()
        .eq('id', postToDelete.id);
      
      if (error) throw error;
      
      // Remove the post from local state
      setPosts(posts.filter(post => post.id !== postToDelete.id));
      setPostToDelete(null);
      
      // Replace alert with toast
      toast.success('Post deleted successfully!');
      
    } catch (err) {
      console.error('Delete error:', err);
      toast.error('Error deleting post: ' + err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancelEdit = () => {
    setSelectedPost(null);
    setFormData({
      title: '',
      slug: '',
      content: '',
      category: '',
      excerpt: '',
      published: false,
      status: 'draft',
      created_at: new Date().toISOString()
    });
    editor?.commands.setContent('');
  };

  return (
    <div className="flex h-screen">
      {/* Main Content - Now on the left */}
      <div className="flex-1 overflow-y-auto border-r border-gray-200 dark:border-gray-800">
        <div className="max-w-3xl mx-auto p-6">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold">
              {selectedPost ? 'Edit Post' : 'Create New Post'}
            </h1>
            <RouterLink to="/">
              <Button variant="ghost">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Home
              </Button>
            </RouterLink>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-6">
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

            <div className="flex gap-4">
              <div className="space-y-2 flex-1">
                <label className="text-sm font-medium">Slug</label>
                <Input
                  name="slug"
                  value={formData.slug}
                  onChange={handleChange}
                  required
                  placeholder="post-url-slug"
                />
              </div>

              <div className="space-y-2 flex-1">
                <label className="text-sm font-medium">Category</label>
                <Select
                  value={formData.category}
                  onValueChange={(value) => 
                    setFormData(prev => ({ ...prev, category: value }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {CATEGORIES.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
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
              <div className="border border-gray-200 dark:border-gray-800 rounded-lg overflow-hidden">
                <EditorMenuBar editor={editor} />
                <EditorContent editor={editor} className="p-4 min-h-[300px]" />
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                checked={formData.published}
                onCheckedChange={handleSwitchChange}
              />
              <label className="text-sm font-medium">
                {formData.published ? 'Publish immediately' : 'Save as draft'}
              </label>
            </div>

            <div className="flex gap-4">
              <Button 
                type="submit" 
                disabled={isLoading}
                className="flex-1"
              >
                {isLoading ? 'Saving...' : (selectedPost ? 'Update Post' : 'Create Post')}
              </Button>
              
              {selectedPost && (
                <Button 
                  type="button" 
                  variant="outline"
                  onClick={handleCancelEdit}
                >
                  Cancel Edit
                </Button>
              )}
            </div>
          </form>
        </div>
      </div>

      {/* Sidebar - Now on the right */}
      <div className="w-80 overflow-y-auto bg-gray-50 dark:bg-gray-900">
        <div className="p-4">
          <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-100">Posts</h2>
          <div className="mb-4">
            <Select
              value={statusFilter}
              onValueChange={setStatusFilter}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Posts</SelectItem>
                <SelectItem value="published">Published</SelectItem>
                <SelectItem value="draft">Draft</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            {posts
              .filter(post => {
                console.log('Filtering post:', post.status, statusFilter);
                return statusFilter === 'all' || post.status === statusFilter.toLowerCase();
              })
              .map(post => (
                <div 
                  key={post.id} 
                  className="p-4 rounded-lg border border-gray-200 dark:border-gray-800 hover:border-riptide-500 dark:hover:border-riptide-500 transition-colors bg-white dark:bg-gray-800"
                >
                  <div className="flex justify-between items-start mb-1">
                    <h3 className="font-medium text-sm truncate text-gray-900 dark:text-gray-100">
                      {post.title}
                    </h3>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      post.status === 'published' 
                        ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                        : 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400'
                    }`}>
                      {post.status === 'published' ? 'Published' : 'Draft'}
                    </span>
                  </div>
                  <div className="flex items-center text-xs text-gray-500 mb-2">
                    <Calendar className="w-3 h-3 mr-1" />
                    {post.published_at 
                      ? format(new Date(post.published_at), 'MMM d, yyyy')
                      : format(new Date(post.created_at), 'MMM d, yyyy') + ' (Draft)'}
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleEdit(post)}
                      className="p-1.5 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 text-blue-500"
                      title="Edit"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setPostToDelete(post)}
                      className="p-1.5 rounded-md hover:bg-red-50 dark:hover:bg-red-900/20 text-red-500"
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                    <RouterLink
                      to={`/blog/${post.slug}`}
                      className="p-1.5 rounded-md hover:bg-green-50 dark:hover:bg-green-900/20 text-green-500 ml-auto"
                      title="View"
                    >
                      <Eye className="w-4 h-4" />
                    </RouterLink>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>

      {/* Delete Modal */}
      <DeletePostModal
        isOpen={!!postToDelete}
        onClose={() => setPostToDelete(null)}
        onConfirm={handleDeleteConfirm}
        postTitle={postToDelete?.title}
        isLoading={isLoading}
      />
    </div>
  );
};

export default AdminPage; 