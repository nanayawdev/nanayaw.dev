import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { blogService } from '@/services/blogService';
import { Badge } from "@/components/ui/badge";
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { ArrowLeft, ThumbsUp, MessageCircle, Bookmark, AudioLines, Share } from "lucide-react";
import { BlogContent } from '@/components/BlogContent/BlogContent';
import { toast } from 'sonner';
import { CommentDrawer } from '@/components/Comments/CommentDrawer';
import { Skeleton } from "@/components/ui/skeleton";

const BlogPostPage = () => {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [relatedPosts, setRelatedPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [likeCount, setLikeCount] = useState(0);
  const [hasLiked, setHasLiked] = useState(false);
  const [isLiking, setIsLiking] = useState(false);
  const [comments, setComments] = useState([]);
  const [commentCount, setCommentCount] = useState(0);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  useEffect(() => {
    const loadPost = async () => {
      try {
        setIsLoading(true);
        const postData = await blogService.getPostBySlug(slug);
        setPost(postData);
        setLikeCount(postData.like_count || 0);
        
        if (postData) {
          const relatedPostsData = await blogService.getRelatedPosts(
            postData.category, 
            slug
          );
          console.log('Related Posts:', relatedPostsData);
          setRelatedPosts(relatedPostsData);
        }
        
        // Check if user has liked this post
        const liked = await blogService.hasUserLikedPost(postData.id);
        setHasLiked(liked);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    loadPost();
  }, [slug]);

  useEffect(() => {
    const loadComments = async () => {
      try {
        const count = await blogService.getCommentCount(post.id);
        setCommentCount(count);
      } catch (err) {
        console.error('Error loading comment count:', err);
      }
    };

    if (post) {
      loadComments();
    }
  }, [post]);

  const handleLike = async () => {
    if (isLiking || hasLiked) return;

    try {
      setIsLiking(true);
      const { success, newCount } = await blogService.likePost(post.id);
      
      if (success) {
        setLikeCount(newCount);
        setHasLiked(true);
        toast.success('Thanks for liking!');
      }
    } catch (err) {
      console.error('Error liking post:', err);
      toast.error('Unable to like post. Please try again.');
    } finally {
      setIsLiking(false);
    }
  };

  const handleCommentClick = async () => {
    if (!isDrawerOpen && comments.length === 0) {
      try {
        const postComments = await blogService.getComments(post.id);
        setComments(postComments);
      } catch (err) {
        console.error('Error loading comments:', err);
        toast.error('Unable to load comments');
      }
    }
    setIsDrawerOpen(!isDrawerOpen);
  };

  const handleCommentAdded = (newComment) => {
    setComments([newComment, ...comments]);
    setCommentCount(prev => prev + 1);
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-start justify-start pt-12 sm:pt-16 md:pt-20 pb-4 sm:pb-6 md:pb-8 px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto">
        <div className="w-full space-y-8">
          <Skeleton className="h-10 w-32" />
          
          <Skeleton className="h-6 w-24" />
          
          <Skeleton className="h-12 w-3/4" />
          
          <Skeleton className="h-4 w-32" />
          
          <div className="border-t border-b border-gray-200 dark:border-gray-800 py-4 my-8">
            <div className="flex justify-between">
              <div className="flex gap-4">
                <Skeleton className="h-8 w-16" />
                <Skeleton className="h-8 w-24" />
              </div>
              <div className="flex gap-4">
                <Skeleton className="h-8 w-8" />
                <Skeleton className="h-8 w-8" />
                <Skeleton className="h-8 w-8" />
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-40 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-2/3" />
          </div>
        </div>
      </div>
    );
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
    <div className="flex flex-col items-start justify-start pt-12 sm:pt-16 md:pt-20 pb-4 sm:pb-6 md:pb-8 px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto">
      <Link to="/allposts">
        <Button variant="ghost" className="mb-6">
          <ArrowLeft className="mr-2 h-4 w-4" />
          All Blog Posts
        </Button>
      </Link>

      <article className="prose prose-sm sm:prose-base lg:prose-lg dark:prose-invert w-full">
        <Badge variant="outline" className="mb-6">
          {post.category}
        </Badge>

        <h1 className="text-4xl text-gray-900 dark:text-gray-100 font-medium leading-tight mb-4">
          {post.title}
        </h1>
        
        <div className="text-gray-500 dark:text-gray-500 mb-4">
          {formattedDate}
        </div>

        <div className="border-t border-b border-gray-200 dark:border-gray-800 py-3 sm:py-4 my-6 sm:my-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between w-full gap-4 sm:gap-0">
            <div className="flex items-center gap-4 sm:gap-6">
              <button 
                onClick={handleLike}
                disabled={isLiking || hasLiked}
                className={`flex items-center gap-2 text-gray-700 dark:text-gray-500 hover:text-gray-900 dark:hover:text-gray-200 transition-colors ${
                  hasLiked ? 'text-gray-500 hover:text-riptide-600' : ''
                } ${isLiking ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                <ThumbsUp className={`h-5 w-5 ${hasLiked ? 'fill-current' : ''}`} />
                <span className="text-sm">{likeCount}</span>
              </button>
              
              <button 
                onClick={handleCommentClick}
                className="flex items-center gap-2 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
              >
                <MessageCircle className="h-5 w-5" />
                <span className="text-sm font-medium">
                  {commentCount} {commentCount === 1 ? 'comment' : 'comments'}
                </span>
              </button>
            </div>

            <div className="hidden sm:flex items-center gap-4 sm:gap-6">
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

        <BlogContent content={post.content} />

        {post.image_url && (
          <img
            src={post.image_url}
            alt={post.title}
            className="w-full h-[300px] sm:h-[400px] object-cover rounded-xl mb-8"
            onError={(e) => {
              e.target.style.display = 'none';
            }}
          />
        )}

        {relatedPosts.length > 0 && (
          <div className="mt-12 sm:mt-16 w-full not-prose">
            <h2 className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-6 text-gray-900 dark:text-gray-100">
              Related Articles
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              {relatedPosts.map((relatedPost) => (
                <Link 
                  key={relatedPost.slug}
                  to={`/blog/${relatedPost.slug}`}
                  className="group block"
                >
                  <div className="relative aspect-[4/3] overflow-hidden rounded-xl mb-4">
                    <img
                      src={relatedPost.image_url}
                      alt={relatedPost.title}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      onError={(e) => {
                        e.target.style.display = 'none';
                      }}
                    />
                  </div>
                  <div className="border border-gray-200 dark:border-gray-800 rounded-lg p-4 sm:p-6 transition-colors hover:border-riptide-500 dark:hover:border-riptide-500 h-[120px] sm:h-[150px] flex flex-col">
                    <Badge variant="outline" className="w-fit mb-2">
                      {relatedPost.category}
                    </Badge>
                    <h3 className="text-base sm:text-[20px] font-medium text-gray-900 dark:text-gray-100 group-hover:text-gray-600 dark:group-hover:text-gray-400 mb-2">
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

      <CommentDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        postId={post?.id}
        comments={comments}
        onCommentAdded={handleCommentAdded}
        commentCount={commentCount}
      />
    </div>
  );
};

export default BlogPostPage; 