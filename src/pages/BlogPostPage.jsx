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
import ProjectNav from '@/components/navigation/ProjectNav';

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
  const [notFound, setNotFound] = useState(false);
  const [nextPost, setNextPost] = useState(null);
  const [previousPost, setPreviousPost] = useState(null);

  useEffect(() => {
    const loadPost = async () => {
      try {
        setIsLoading(true);
        setError(null);
        setNotFound(false);
        
        const postData = await blogService.getPostBySlug(slug);
        
        if (!postData) {
          setNotFound(true);
          return;
        }

        setPost(postData);
        setLikeCount(postData.like_count || 0);
        
        const liked = await blogService.hasUserLikedPost(postData.id);
        setHasLiked(liked);
        
        const relatedPostsData = await blogService.getRelatedPosts(
          postData.category, 
          slug
        );
        setRelatedPosts(relatedPostsData);

        const nextPostData = await blogService.getNextPost(slug);
        setNextPost(nextPostData);

        const previousPostData = await blogService.getPreviousPost(slug);
        setPreviousPost(previousPostData);

      } catch (err) {
        if (err.message?.includes('no rows returned')) {
          setNotFound(true);
        } else {
          setError(err.message);
        }
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
      setHasLiked(true);
      setLikeCount(prev => prev + 1);
      
      const result = await blogService.likePost(post.id);
      
      if (!result.success) {
        setHasLiked(false);
        setLikeCount(prev => prev - 1);
        toast.error(result.message || 'Unable to like post');
      } else {
        toast.success('Thanks for liking!');
      }
    } catch (err) {
      setHasLiked(false);
      setLikeCount(prev => prev - 1);
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

  if (notFound) {
    return (
      <div className="flex min-h-screen items-center justify-center px-4">
        <div className="text-center max-w-lg">
          <h1 className="text-3xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
            Post Not Found
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            This post may have been deleted or is temporarily unavailable.
          </p>
          <p className="text-gray-500 dark:text-gray-500 text-sm mb-8">
            Please check the URL or try accessing the post through the blog listing.
          </p>
          <Link to="/allposts">
            <Button variant="default">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to All Posts
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center px-4">
        <div className="text-center max-w-lg">
          <h1 className="text-3xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
            Oops! Something went wrong
          </h1>
          <p className="text-gray-500 dark:text-gray-500 text-sm mb-8">
          We encountered an error while loading this post. The post might have been deleted or is temporarily unavailable.
          </p>
          <div className="flex gap-4 justify-center">
            <Button 
              variant="outline" 
              onClick={() => window.location.reload()}
            >
              Try Again
            </Button>
            <Link to="/allposts">
              <Button variant="default">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to All Posts
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
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
                className={`flex items-center gap-2 ${
                  hasLiked 
                    ? 'text-riptide-500 dark:text-riptide-400' 
                    : 'text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100'
                } transition-colors`}
              >
                <ThumbsUp className={`h-5 w-5 ${hasLiked ? 'fill-current' : ''}`} />
                <span className="text-sm font-medium">
                  {likeCount} {likeCount === 1 ? 'like' : 'likes'}
                </span>
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

        <BlogContent content={post.content} />

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
                  className="relative group overflow-hidden rounded-xl transition-all duration-300 hover:scale-[1.02]"
                >
                  <div className="relative aspect-[16/9] w-full">
                    <img
                      src={blogService.getImageUrl(relatedPost.image_path)}
                      alt={relatedPost.title}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      onError={(e) => {
                        e.target.style.display = 'none';
                      }}
                    />
                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent transition-colors duration-300 group-hover:from-riptide-900/80 group-hover:via-riptide-800/50" />
                    
                    {/* Content overlay */}
                    <div className="absolute inset-0 p-4 sm:p-6 flex flex-col justify-end">
                      <Badge variant="outline" className="w-fit mb-2 bg-white/10 text-white backdrop-blur-sm border-none">
                        {relatedPost.category}
                      </Badge>
                      
                      <h3 className="text-lg font-semibold text-white group-hover:text-white mb-2 line-clamp-2">
                        {relatedPost.title}
                      </h3>
                      
                      <span className="text-sm text-gray-200">
                        {new Date(relatedPost.created_at).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </span>
                    </div>
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

      <ProjectNav 
        type="blog"
        nextItem={nextPost}
        previousItem={previousPost}
      />
    </div>
  );
};

export default BlogPostPage; 