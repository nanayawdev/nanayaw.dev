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
        <div className="text-base sm:text-lg text-gray-600 dark:text-gray-400">
          No posts available yet.
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
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Blog;
