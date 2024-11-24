import BlogPost from '../components/BlogPost/BlogPost';

const Blog = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Blog</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <BlogPost />
        {/* Add more BlogPost components as needed */}
      </div>
    </div>
  );
};

export default Blog;
