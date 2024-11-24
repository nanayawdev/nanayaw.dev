import { Badge } from "@/components/ui/badge";
import BlogPost from '@/components/BlogPost/BlogPost';
import { blogPosts } from '@/data/blog-posts';

const Blog = () => {
  return (
    <div className="flex flex-col items-start justify-start pt-20 pb-8 px-4 max-w-4xl mx-auto">
      <Badge variant="outline" className="mb-6">
        BLOG
      </Badge>
      
      <div className="space-y-12 w-full">
        <h1 className="text-6xl text-gray-900 dark:text-gray-100 font-medium leading-tight">
          Latest <span className="text-riptide-500">Articles</span>
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {blogPosts.map((post) => (
            <BlogPost
              key={post.id}
              category={post.category}
              title={post.title}
              excerpt={post.excerpt}
              slug={post.slug}
              date={post.date}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Blog;
