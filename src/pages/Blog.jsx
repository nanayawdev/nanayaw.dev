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
        const data = await blogService.getAllPosts();
        setPosts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    loadPosts();
  }, []);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="flex flex-col items-start justify-start pt-20 pb-8 px-4 max-w-4xl mx-auto">
      <Badge variant="outline" className="mb-6">
        BLOG
      </Badge>
      
      <div className="space-y-12 w-full">
        <h1 className="text-6xl text-gray-900 dark:text-gray-100 font-medium leading-tight">
          My Recent <span className="text-riptide-500">Thoughts</span>
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
