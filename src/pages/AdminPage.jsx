import { useState, useEffect } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import { supabase } from '@/lib/supabase';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { ArrowLeft, Bold, Italic, Code, List, ListOrdered, Link as LinkIcon, Image as ImageIcon, AlignLeft, AlignCenter, AlignRight, Trash2, Edit, Eye, Calendar } from 'lucide-react';
import { format } from 'date-fns';
import { DeletePostModal } from "@/components/DeletePostModal";
import { toast } from 'sonner';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { blogService } from '@/services/blogService';
import hljs from 'highlight.js/lib/core';
import javascript from 'highlight.js/lib/languages/javascript';
import typescript from 'highlight.js/lib/languages/typescript';
import css from 'highlight.js/lib/languages/css';
import xml from 'highlight.js/lib/languages/xml';
import jsx from 'highlight.js/lib/languages/javascript';  // for JSX
import bash from 'highlight.js/lib/languages/bash';
import json from 'highlight.js/lib/languages/json';
import python from 'highlight.js/lib/languages/python';
import sql from 'highlight.js/lib/languages/sql';
import markdown from 'highlight.js/lib/languages/markdown';
import 'highlight.js/styles/github-dark.css';
import { Helmet } from 'react-helmet-async';

// Register all languages
hljs.registerLanguage('javascript', javascript);
hljs.registerLanguage('typescript', typescript);
hljs.registerLanguage('css', css);
hljs.registerLanguage('html', xml);
hljs.registerLanguage('jsx', jsx);
hljs.registerLanguage('bash', bash);
hljs.registerLanguage('json', json);
hljs.registerLanguage('python', python);
hljs.registerLanguage('sql', sql);
hljs.registerLanguage('markdown', markdown);

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
    published: true,
    status: 'published',
    created_at: new Date().toISOString(),
    image: null,
    image_path: null,
    keywords: [],
  });
  const [isLoading, setIsLoading] = useState(false);
  const [postToDelete, setPostToDelete] = useState(null);
  const [statusFilter, setStatusFilter] = useState('all');

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        codeBlock: {
          HTMLAttributes: {
            class: 'relative block p-4 rounded-lg bg-zinc-900 font-mono text-sm overflow-x-auto hljs group',
          },
          renderHTML({ node }) {
            const content = node.textContent || '';
            try {
              const pre = document.createElement('pre');
              pre.className = 'relative group';
              
              const code = document.createElement('code');
              // Let highlight.js handle the escaping
              code.textContent = content;
              hljs.highlightElement(code);
              
              // Add copy button
              const button = document.createElement('button');
              button.className = 'copy-button absolute hidden group-hover:flex items-center gap-1 right-2 top-2 px-1.5 py-1 text-xs rounded bg-white/10 hover:bg-white/20 text-white transition-colors';
              
              const buttonContent = document.createElement('div');
              buttonContent.className = 'flex items-center gap-1';
              
              const copyIcon = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
              copyIcon.setAttribute('class', 'w-3.5 h-3.5');
              copyIcon.setAttribute('viewBox', '0 0 24 24');
              copyIcon.setAttribute('fill', 'none');
              copyIcon.setAttribute('stroke', 'currentColor');
              copyIcon.setAttribute('stroke-width', '2');
              
              const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
              path.setAttribute('d', 'M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3');
              
              copyIcon.appendChild(path);
              
              const text = document.createElement('span');
              text.textContent = 'Copy';
              
              buttonContent.appendChild(copyIcon);
              buttonContent.appendChild(text);
              button.appendChild(buttonContent);
              
              button.addEventListener('click', () => {
                navigator.clipboard.writeText(content);
                text.textContent = 'Copied!';
                path.setAttribute('d', 'M5 13l4 4L19 7');
                
                setTimeout(() => {
                  text.textContent = 'Copy';
                  path.setAttribute('d', 'M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3');
                }, 2000);
              });
              
              pre.appendChild(code);
              pre.appendChild(button);
              return pre;
            } catch (e) {
              console.error('Error rendering code block:', e);
              return content;
            }
          }
        }
      }),
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
      toast.error('Please sign in to access this page');
      navigate('/signin');
      return false;
    }
    return true;
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
    setFormData({
      ...post,
      published: post.status === 'published',
      content: post.content || '',
      image: null,
      image_path: post.image_path
    });
    editor?.commands.setContent(post.content || '');
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
      published: checked,
      status: checked ? 'published' : 'draft'
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
      if (!formData.title || !formData.slug || !editor.getHTML()) {
        toast.error('Title, slug, and content are required');
        return;
      }

      const postData = {
        title: formData.title,
        slug: formData.slug,
        content: editor.getHTML(),
        excerpt: formData.excerpt || '',
        category: formData.category || 'Uncategorized',
        status: formData.published ? 'published' : 'draft',
        published_at: formData.published ? new Date().toISOString() : null,
        image: formData.image || null
      };

      let result;
      if (selectedPost) {
        result = await blogService.updatePost(selectedPost.id, postData);
      } else {
        result = await blogService.createPost(postData);
      }

      toast.success(
        selectedPost 
          ? 'Post updated successfully!' 
          : 'Post created successfully!'
      );

      // Reset form and reload posts
      handleCancelEdit();
      await loadPosts();

    } catch (error) {
      console.error('Error saving post:', error);
      toast.error(error.message || 'Error saving post');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteConfirm = async () => {
    if (!postToDelete) return;
    
    try {
      setIsLoading(true);
      
      // Delete the post and its image
      await blogService.deletePost(postToDelete.id);
      
      toast.success('Post deleted successfully');
      setPostToDelete(null);
      loadPosts();
    } catch (error) {
      console.error('Error deleting post:', error);
      toast.error('Error deleting post');
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
      published: true,
      status: 'published',
      created_at: new Date().toISOString(),
      image: null,
      image_path: null
    });
    editor?.commands.setContent('');
  };

  const filteredPosts = posts.filter(post => {
    if (statusFilter === 'all') return true;
    return post.status === statusFilter.toLowerCase();
  });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({ ...prev, image: file }));
    }
  };

  const handleKeywordsChange = (e) => {
    const keywords = e.target.value.split(',').map(k => k.trim());
    setFormData(prev => ({
      ...prev,
      keywords
    }));
  };

  return (
    <>
      <Helmet>
        <title>Admin Dashboard | NanaYaw.Dev</title>
        <meta name="robots" content="noindex, nofollow" />
        <meta name="googlebot" content="noindex, nofollow" />
        <meta name="description" content="Admin dashboard for managing blog posts and content." />
      </Helmet>

      <div className="flex flex-col md:flex-row min-h-screen overflow-hidden">
        {/* Main Content - Add h-screen to ensure full height scrolling */}
        <div className="flex-1 h-screen overflow-y-auto border-b md:border-b-0 md:border-r border-gray-200 dark:border-gray-800">
          <div className="max-w-3xl mx-auto p-4 md:p-6 pb-24 md:pb-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
              <h1 className="text-2xl md:text-3xl font-bold">
                {selectedPost ? 'Edit Post' : 'Create New Post'}
              </h1>
              <RouterLink to="/">
                <Button variant="ghost">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  <span className="hidden sm:inline">Back to Home</span>
                </Button>
              </RouterLink>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
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

              <div className="space-y-2">
                <label className="text-sm font-medium">Post Image</label>
                <div className="flex items-center gap-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => document.getElementById('admin-image-upload').click()}
                    className="flex items-center gap-2"
                  >
                    <ImageIcon className="w-4 h-4" />
                    {formData.image ? 'Change Image' : 'Add Image'}
                  </Button>
                  <Input
                    id="admin-image-upload"
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                </div>
                {(formData.image_path || formData.image) && (
                  <div className="mt-4">
                    <img
                      src={formData.image 
                        ? URL.createObjectURL(formData.image)
                        : blogService.getImageUrl(formData.image_path)
                      }
                      alt="Preview"
                      className="w-full max-w-md h-48 object-cover rounded-lg"
                    />
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Keywords (comma-separated)</label>
                <Textarea
                  name="keywords"
                  value={formData.keywords.join(', ')}
                  onChange={handleKeywordsChange}
                  placeholder="react, javascript, web development"
                  className="h-20"
                />
                <p className="text-sm text-gray-500">
                  Add relevant keywords separated by commas
                </p>
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

        {/* Sidebar - Add h-screen for consistent height */}
        <div className="w-full md:w-80 h-screen overflow-y-auto bg-gray-50 dark:bg-gray-900">
          <div className="p-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Posts</h2>
              {/* Optional: Add a collapse button for mobile */}
            </div>
            
            {/* Post cards - adjust for mobile */}
            <div className="space-y-2">
              {filteredPosts.map(post => (
                <div 
                  key={post.id} 
                  className="p-3 md:p-4 rounded-lg border border-gray-200 dark:border-gray-800 hover:border-riptide-500 dark:hover:border-riptide-500 transition-colors bg-white dark:bg-gray-800"
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
                  <div className="flex items-center gap-1 md:gap-2">
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
              {filteredPosts.length === 0 && (
                <p className="text-gray-500 text-center py-4">
                  No posts found for the selected filter.
                </p>
              )}
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
    </>
  );
};

export default AdminPage; 