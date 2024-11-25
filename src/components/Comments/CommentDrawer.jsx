import { useState } from 'react';
import { format } from 'date-fns';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { MessageCircle, Reply, ThumbsUp, MoreVertical } from 'lucide-react';
import { toast } from 'sonner';
import { blogService } from '@/services/blogService';

export const CommentDrawer = ({ 
  isOpen, 
  onClose, 
  postId, 
  comments, 
  onCommentAdded,
  commentCount 
}) => {
  const [newComment, setNewComment] = useState('');
  const [userName, setUserName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [replyingTo, setReplyingTo] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newComment.trim() || !userName.trim()) {
      toast.error('Please fill in all fields');
      return;
    }

    try {
      setIsSubmitting(true);
      const comment = await blogService.addComment(
        postId, 
        userName, 
        newComment,
        replyingTo?.id
      );
      onCommentAdded(comment);
      setNewComment('');
      setReplyingTo(null);
      toast.success('Comment added successfully!');
    } catch (err) {
      console.error('Error adding comment:', err);
      toast.error('Unable to add comment. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReply = (comment) => {
    setReplyingTo(comment);
    setNewComment(`@${comment.user_name} `);
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="w-[400px] sm:w-[540px] h-full">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <MessageCircle className="h-5 w-5" />
            <span>{commentCount} Comments</span>
          </SheetTitle>
        </SheetHeader>

        <div className="mt-8 flex flex-col h-[calc(100vh-180px)]">
          {/* Comment Form */}
          <form onSubmit={handleSubmit} className="space-y-4 mb-6">
            <Input
              placeholder="Your name"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              disabled={isSubmitting}
            />
            <div className="relative">
              <Textarea
                placeholder={replyingTo ? `Reply to ${replyingTo.user_name}...` : "Write a comment..."}
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                rows={3}
                disabled={isSubmitting}
              />
              {replyingTo && (
                <Button
                  size="sm"
                  variant="ghost"
                  className="absolute top-2 right-2"
                  onClick={() => {
                    setReplyingTo(null);
                    setNewComment('');
                  }}
                >
                  Cancel
                </Button>
              )}
            </div>
            <Button 
              type="submit" 
              disabled={isSubmitting}
              className="bg-riptide-500 hover:bg-riptide-600 w-full"
            >
              {isSubmitting ? 'Posting...' : 'Post Comment'}
            </Button>
          </form>

          {/* Comments List */}
          <div className="space-y-6 overflow-y-auto flex-1">
            {comments.map((comment) => (
              <div 
                key={comment.id} 
                className="border border-gray-200 dark:border-gray-800 rounded-lg p-4 space-y-2"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-800 flex items-center justify-center">
                      {comment.user_name[0].toUpperCase()}
                    </div>
                    <span className="font-medium text-gray-900 dark:text-gray-100">
                      {comment.user_name}
                    </span>
                    <span className="text-sm text-gray-500">
                      {format(new Date(comment.created_at), 'MMM d')}
                    </span>
                  </div>
                  <Button variant="ghost" size="icon">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </div>

                <p className="text-gray-700 dark:text-gray-300 pl-10">
                  {comment.content}
                </p>

                <div className="flex items-center gap-4 pl-10">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <ThumbsUp className="h-4 w-4 mr-1" />
                    <span className="text-xs">Like</span>
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    className="text-gray-500 hover:text-gray-700"
                    onClick={() => handleReply(comment)}
                  >
                    <Reply className="h-4 w-4 mr-1" />
                    <span className="text-xs">Reply</span>
                  </Button>
                </div>

                {/* Nested Replies */}
                {comment.replies?.length > 0 && (
                  <div className="pl-10 space-y-4 mt-4">
                    {comment.replies.map((reply) => (
                      // Similar structure as parent comment
                      <div key={reply.id} className="border-l-2 border-gray-200 pl-4">
                        {/* Reply content */}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}; 