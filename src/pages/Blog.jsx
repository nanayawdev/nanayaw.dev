import { useEffect, useState } from 'react';
import { Badge } from "@/components/ui/badge";
import BlogPost from '@/components/BlogPost/BlogPost';
import { blogService } from '@/services/blogService';

const Blog = () => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadPosts = async () => {
      try {
        setIsLoading(true);
        const data = await blogService.getRecentPosts();
        console.log('Blog posts loaded:', data);
        setPosts(data || []);
      } catch (err) {
        console.error('Error loading posts:', err);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    loadPosts();
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="text-base sm:text-lg">Loading posts...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="text-base sm:text-lg text-red-500">Error: {error}</div>
      </div>
    );
  }

  if (!posts.length) {
    return (
      <div className="flex flex-col items-start justify-start pt-16 sm:pt-20 lg:pt-28 pb-8 px-4 max-w-4xl mx-auto">
        <Badge variant="outline" className="mb-4 sm:mb-6">
          BLOG
        </Badge>
        
        <div className="space-y-8 sm:space-y-12 w-full">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl text-gray-900 dark:text-gray-100 font-medium leading-tight">
            My Recent <span className="text-riptide-500">Thoughts</span>
          </h1>

          <div className="flex flex-col items-center justify-center w-full text-center py-16">
            <svg
              className="w-24 h-24 mb-6 text-gray-300 dark:text-gray-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9.5a2 2 0 00-2-2h-2"
              />
            </svg>
            <h2 className="text-2xl font-semibold mb-3 text-gray-900 dark:text-gray-100">
              No Blog Posts Yet
            </h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-md mb-6">
              We're working on creating amazing content for you. Check back soon for interesting articles and updates!
            </p>
            <button
              onClick={() => window.location.reload()}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-riptide-500 hover:bg-riptide-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-riptide-500 transition-colors"
            >
              <svg
                className="w-4 h-4 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                />
              </svg>
              Refresh Page
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-start justify-start pt-16 sm:pt-20 lg:pt-28 pb-8 px-4 max-w-4xl mx-auto">
      <Badge variant="outline" className="mb-4 sm:mb-6">
        BLOG
      </Badge>
      
      <div className="space-y-8 sm:space-y-12 w-full">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl text-gray-900 dark:text-gray-100 font-medium leading-tight">
          My Recent <span className="text-riptide-500">Thoughts</span>
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          {posts.map((post) => (
            <BlogPost
              key={post.id}
              category={post.category}
              title={post.title}
              excerpt={post.excerpt}
              slug={post.slug}
              date={post.created_at}
              imageUrl={post.image_url}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Blog;
