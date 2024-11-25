import { useState } from 'react';
import { format } from 'date-fns';
import { toast } from 'sonner';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { blogService } from '@/services/blogService';

export const Comments = ({ postId, comments, onCommentAdded }) => {
  const [newComment, setNewComment] = useState('');
  const [userName, setUserName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newComment.trim() || !userName.trim()) {
      toast.error('Please fill in all fields');
      return;
    }

    try {
      setIsSubmitting(true);
      const comment = await blogService.addComment(postId, userName, newComment);
      onCommentAdded(comment);
      setNewComment('');
      toast.success('Comment added successfully!');
    } catch (err) {
      console.error('Error adding comment:', err);
      toast.error('Unable to add comment. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-8">
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          placeholder="Your name"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          className="max-w-md"
          disabled={isSubmitting}
        />
        <Textarea
          placeholder="Write a comment..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          rows={3}
          disabled={isSubmitting}
        />
        <Button 
          type="submit" 
          disabled={isSubmitting}
          className="bg-riptide-500 hover:bg-riptide-600"
        >
          {isSubmitting ? 'Posting...' : 'Post Comment'}
        </Button>
      </form>

      <div className="space-y-6">
        {comments.map((comment) => (
          <div 
            key={comment.id} 
            className="border border-gray-200 dark:border-gray-800 rounded-lg p-4 space-y-2"
          >
            <div className="flex items-center justify-between">
              <span className="font-medium text-gray-900 dark:text-gray-100">
                {comment.user_name}
              </span>
              <span className="text-sm text-gray-500">
                {format(new Date(comment.created_at), 'MMM d, yyyy')}
              </span>
            </div>
            <p className="text-gray-700 dark:text-gray-300">
              {comment.content}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}; 