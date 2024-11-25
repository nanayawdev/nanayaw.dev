import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { blogService } from '@/services/blogService';
import { Badge } from "@/components/ui/badge";
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { ArrowLeft, ThumbsUp, MessageCircle, Bookmark, AudioLines, Share } from "lucide-react";

const BlogPostPage = () => {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [relatedPosts, setRelatedPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadPost = async () => {
      try {
        setIsLoading(true);
        const postData = await blogService.getPostBySlug(slug);
        setPost(postData);
        
        if (postData) {
          const relatedPostsData = await blogService.getRelatedPosts(
            postData.category, 
            slug
          );
          console.log('Related Posts:', relatedPostsData);
          setRelatedPosts(relatedPostsData);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    loadPost();
  }, [slug]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!post) {
    return <div>Post not found</div>;
  }

  const formattedDate = new Date(post.created_at).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div className="flex flex-col items-start justify-start pt-20 pb-8 px-4 max-w-3xl mx-auto">
      <Link to="/">
        <Button variant="ghost" className="mb-6">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Home
        </Button>
      </Link>

      <article className="prose prose-lg dark:prose-invert w-full">
        <Badge variant="outline" className="mb-6">
          {post.category}
        </Badge>

        <h1 className="text-4xl text-gray-900 dark:text-gray-100 font-medium leading-tight mb-4">
          {post.title}
        </h1>
        
        <div className="text-gray-500 dark:text-gray-500 mb-4">
          {formattedDate}
        </div>

        <div className="border-t border-b border-gray-200 dark:border-gray-800 py-4 my-8">
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center gap-6">
              <button className="flex items-center gap-2 text-gray-700 dark:text-gray-500 hover:text-gray-900 dark:hover:text-gray-200">
                <ThumbsUp className="h-5 w-5" />
                <span className="text-sm">313</span>
              </button>
              
              <button className="flex items-center gap-2 text-gray-700 dark:text-gray-500 hover:text-gray-900 dark:hover:text-gray-200">
                <MessageCircle className="h-5 w-5" />
                <span className="text-sm">4</span>
              </button>
            </div>

            <div className="flex items-center gap-6 ml-auto">
              <button className="text-gray-700 dark:text-gray-500 hover:text-gray-900 dark:hover:text-gray-200">
                <Bookmark className="h-5 w-5" />
              </button>
              
              <button className="text-gray-700 dark:text-gray-500 hover:text-gray-900 dark:hover:text-gray-200">
                <AudioLines className="h-5 w-5" />
              </button>
              
              <button className="text-gray-700 dark:text-gray-500 hover:text-gray-900 dark:hover:text-gray-200">
                <Share className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>

        <div className="prose-p:text-gray-800 dark:prose-p:text-gray-100">
          {post.content}
        </div>

        {relatedPosts.length > 0 && (
          <div className="mt-16 w-full not-prose">
            <h2 className="text-2xl font-semibold mb-6 text-gray-900 dark:text-gray-100">
              Related Articles
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {relatedPosts.map((relatedPost) => (
                <Link 
                  key={relatedPost.slug}
                  to={`/blog/${relatedPost.slug}`}
                  className="group block"
                >
                  <div className="border border-gray-200 dark:border-gray-800 rounded-lg p-6 transition-colors hover:border-riptide-500 dark:hover:border-riptide-500 h-[150px] flex flex-col">
                    <Badge variant="outline" className="w-fit mb-2">
                      {relatedPost.category}
                    </Badge>
                    <h3 className="text-[20px] font-medium text-gray-900 dark:text-gray-100 group-hover:text-gray-600 dark:group-hover:text-gray-400 mb-2">
                      {relatedPost.title}
                    </h3>
                    <span className="text-sm text-gray-500 dark:text-gray-400 mt-auto">
                      {new Date(relatedPost.created_at).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </article>
    </div>
  );
};

export default BlogPostPage; 