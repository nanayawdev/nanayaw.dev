import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { blogService } from '@/services/blogService';
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { ThumbsUp, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const AllBlogPostsPage = () => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const loadPosts = async () => {
      try {
        setIsLoading(true);
        const allPosts = await blogService.getAllPosts();
        setPosts(allPosts);
        
        // Extract unique categories from posts
        const uniqueCategories = [...new Set(allPosts.map(post => post.category))];
        setCategories(uniqueCategories);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    loadPosts();
  }, []);

  const filteredPosts = selectedCategory === 'all' 
    ? posts 
    : posts.filter(post => post.category === selectedCategory);

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8 mt-20 max-w-3xl">
        <h1 className="text-3xl font-bold mb-8">All Blog Posts</h1>
        <div className="space-y-6">
          {[...Array(3)].map((_, i) => (
            <Skeleton key={i} className="h-[200px] w-full rounded-lg" />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center px-4">
        <div className="text-center max-w-lg">
          <h1 className="text-3xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
            Unable to Load Posts
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            We're having trouble connecting to our servers.
          </p>
          <p className="text-gray-500 dark:text-gray-500 text-sm mb-8">
            Please check your internet connection and try again.
          </p>
          <div className="flex gap-4 justify-center">
            <Button 
              variant="outline" 
              onClick={() => window.location.reload()}
              className="flex items-center gap-2"
            >
              Try Again
            </Button>
            <Link to="/">
              <Button variant="default" className="flex items-center gap-2">
                Back to Home
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (posts.length === 0) {
    return (
      <div className="flex min-h-screen items-center justify-center px-4">
        <div className="text-center max-w-lg">
          <h1 className="text-3xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
            No Posts Found
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            There are currently no blog posts available.
          </p>
          <Button 
            variant="outline" 
            onClick={() => window.location.reload()}
            className="flex items-center gap-2"
          >
            Refresh Page
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 mt-20 max-w-3xl">
      <h1 className="text-3xl font-bold mb-8">All Blog Posts</h1>
      
      {/* Sticky Category Filter with Horizontal Scroll */}
      <div className="sticky top-0 -mx-4 px-4 py-4 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm z-10">
        <div className="overflow-x-auto scrollbar-hide">
          <div className="flex items-center gap-8 border-b border-gray-200 dark:border-gray-800 min-w-max pb-[1px]">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`relative pb-2 text-sm font-medium transition-colors whitespace-nowrap ${
                selectedCategory === 'all'
                  ? 'text-gray-900 dark:text-gray-100'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100'
              }`}
            >
              All
              {selectedCategory === 'all' && (
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-riptide-500" />
              )}
            </button>
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`relative pb-2 text-sm font-medium transition-colors whitespace-nowrap ${
                  selectedCategory === category
                    ? 'text-gray-900 dark:text-gray-100'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100'
                }`}
              >
                {category}
                {selectedCategory === category && (
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-riptide-500" />
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Posts list with top margin to account for sticky header */}
      <div className="space-y-6 mt-4">
        {filteredPosts.map((post) => (
          <Link 
            key={post.slug}
            to={`/blog/${post.slug}`}
            className="group block"
          >
            <div className="flex flex-col sm:flex-row border border-gray-200 dark:border-gray-800 rounded-lg overflow-hidden transition-colors hover:border-riptide-500 dark:hover:border-riptide-500">
              {/* Image container - left side */}
              {post.image_url && (
                <div className="sm:w-72 md:w-80 flex-shrink-0">
                  <div className="aspect-[4/3] sm:h-full w-full overflow-hidden">
                    <img
                      src={post.image_url}
                      alt={post.title}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      onError={(e) => {
                        e.target.style.display = 'none';
                      }}
                    />
                  </div>
                </div>
              )}
              
              {/* Content container - right side */}
              <div className="flex-1 p-6">
                <Badge variant="outline" className="w-fit mb-4">
                  {post.category}
                </Badge>
                
                <h2 className="text-xl sm:text-2xl font-medium text-gray-900 dark:text-gray-100 group-hover:text-gray-600 dark:group-hover:text-gray-400 mb-3">
                  {post.title}
                </h2>
                
                <p className="text-gray-500 dark:text-gray-400 text-base mb-4 line-clamp-2">
                  {post.excerpt || post.content.substring(0, 150)}...
                </p>
                
                <div className="flex items-center gap-6 text-gray-500 dark:text-gray-400">
                  <span className="text-sm">
                    {new Date(post.created_at).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </span>
                  <div className="flex items-center gap-2">
                    <ThumbsUp className="h-4 w-4" />
                    <span className="text-sm">{post.like_count || 0}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MessageCircle className="h-4 w-4" />
                    <span className="text-sm">
                      {post.comment_count || 0} {(post.comment_count || 0) === 1 ? 'comment' : 'comments'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default AllBlogPostsPage; 