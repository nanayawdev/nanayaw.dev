import { supabase } from '@/lib/supabase'

export const blogService = {
  async getAllPosts() {
    const { data, error } = await supabase
      .from('posts')
      .select(`
        *,
        like_count:post_likes(count),
        comment_count:post_comments(count)
      `)
      .eq('status', 'published')
      .order('created_at', { ascending: false })
      .limit(10)

    if (error) {
      console.error('Error fetching posts:', error)
      throw error
    }

    const transformedData = data.map(post => ({
      ...post,
      like_count: post.like_count[0]?.count || 0,
      comment_count: post.comment_count[0]?.count || 0,
      image_url: this.getImageUrl(post.image_path)
    }))

    console.log('Fetched posts:', transformedData)
    return transformedData
  },

  async getPostBySlug(slug) {
    try {
      const { data, error } = await supabase
        .from('posts')
        .select(`
          *,
          like_count:post_likes(count),
          comments:post_comments(count)
        `)
        .eq('slug', slug)
        .single();

      if (error) throw error;

      // Transform the data correctly
      return {
        ...data,
        like_count: data.like_count[0]?.count || 0,
        comment_count: data.comments[0]?.count || 0,
        image_url: this.getImageUrl(data.image_path)
      };
    } catch (error) {
      console.error('Error fetching post:', error);
      throw error;
    }
  },

  async getRelatedPosts(category, currentSlug) {
    const { data, error } = await supabase
      .from('posts')
      .select('*')
      .eq('category', category)
      .eq('status', 'published')
      .neq('slug', currentSlug)
      .order('created_at', { ascending: false })
      .limit(2)

    if (error) throw error
    
    // Transform the data to include image URLs
    return data.map(post => ({
      ...post,
      image_url: this.getImageUrl(post.image_path)
    }))
  },

  async likePost(postId) {
    try {
      // First insert the like record
      const { error: insertError } = await supabase
        .from('post_likes')
        .insert([{ 
          post_id: postId,
          user_ip: await this.getUserIP() 
        }]);

      if (insertError) {
        if (insertError.code === '23505') { // Unique violation
          return { success: false, message: 'Already liked' };
        }
        throw insertError;
      }

      // Then increment the like count
      const { data, error: updateError } = await supabase
        .rpc('increment_like_count', { post_id: postId });

      if (updateError) throw updateError;

      return { 
        success: true, 
        newCount: data[0].like_count 
      };
    } catch (error) {
      console.error('Error liking post:', error);
      throw error;
    }
  },

  async hasUserLikedPost(postId) {
    try {
      const userIp = await this.getUserIP();
      if (!userIp) return false;

      const { data, error } = await supabase
        .from('post_likes')
        .select('id')
        .eq('post_id', postId)
        .eq('user_ip', userIp)
        .maybeSingle();

      if (error && error.code !== 'PGRST116') {
        console.error('Error checking like status:', error);
        return false;
      }

      return !!data;
    } catch (err) {
      console.error('Error checking like status:', err);
      return false;
    }
  },

  async getUserIP() {
    try {
      const response = await fetch('https://api.ipify.org?format=json');
      if (!response.ok) throw new Error('Failed to fetch IP');
      const data = await response.json();
      return data.ip;
    } catch (err) {
      console.error('Error getting IP:', err);
      return null;
    }
  },

  async getComments(postId) {
    const { data, error } = await supabase
      .from('post_comments')
      .select(`
        *,
        replies:post_comments(*)
      `)
      .eq('post_id', postId)
      .is('parent_id', null)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  },

  async addComment(postId, userName, content, parentId = null) {
    const { data, error } = await supabase
      .from('post_comments')
      .insert([
        {
          post_id: postId,
          user_name: userName,
          content,
          parent_id: parentId
        }
      ])
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async getCommentCount(postId) {
    const { count, error } = await supabase
      .from('post_comments')
      .select('id', { count: 'exact' })
      .eq('post_id', postId);

    if (error) throw error;
    return count || 0;
  },

  async updatePost(id, postData) {
    try {
      const oldPost = await this.getPostById(id);
      let imagePath = oldPost.image_path;

      if (postData.image) {
        if (oldPost.image_path) {
          await this.deleteImage(oldPost.image_path);
        }
        imagePath = await this.uploadImage(postData.image);
      }

      const { data, error } = await supabase
        .from('posts')
        .update({
          title: postData.title,
          slug: postData.slug,
          content: postData.content,
          excerpt: postData.excerpt,
          category: postData.category,
          status: 'published',
          published_at: new Date().toISOString(),
          image_path: imagePath
        })
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error updating post:', error);
      throw error;
    }
  },

  async createPost(postData) {
    try {
      let imagePath = null;
      if (postData.image) {
        imagePath = await this.uploadImage(postData.image);
      }

      const now = new Date().toISOString();
      
      const { data, error } = await supabase
        .from('posts')
        .insert([{
          title: postData.title,
          slug: postData.slug,
          content: postData.content,
          excerpt: postData.excerpt || '',
          category: postData.category || 'Uncategorized',
          status: 'published',
          published_at: now,
          image_path: imagePath,
          created_at: now
        }])
        .select()
        .single();

      if (error) {
        if (imagePath) {
          await this.deleteImage(imagePath).catch(console.error);
        }
        throw error;
      }

      return data;
    } catch (error) {
      console.error('Error in createPost:', error);
      throw error;
    }
  },

  async getAllPostsAdmin() {
    try {
      const { data, error } = await supabase
        .from('posts')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error fetching posts:', error);
      throw error;
    }
  },

  async getRecentPosts() {
    const { data, error } = await supabase
      .from('posts')
      .select(`
        *,
        like_count:post_likes(count),
        comment_count:post_comments(count)
      `)
      .eq('status', 'published')
      .order('created_at', { ascending: false })
      .limit(4)

    if (error) {
      console.error('Error fetching posts:', error)
      throw error
    }

    const transformedData = data.map(post => ({
      ...post,
      like_count: post.like_count[0]?.count || 0,
      comment_count: post.comment_count[0]?.count || 0,
      image_url: this.getImageUrl(post.image_path)
    }))

    console.log('Fetched recent posts:', transformedData)
    return transformedData
  },

  async uploadImage(file) {
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `blog-images/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('posts')
        .upload(filePath, file);

      if (uploadError) {
        console.error('Upload error:', uploadError);
        throw uploadError;
      }

      return filePath;
    } catch (error) {
      console.error('Error in uploadImage:', error);
      throw error;
    }
  },

  async deleteImage(filePath) {
    if (!filePath) return;
    
    try {
      const { error } = await supabase.storage
        .from('posts')
        .remove([filePath]);

      if (error) {
        console.error('Delete error:', error);
        throw error;
      }
    } catch (error) {
      console.error('Error in deleteImage:', error);
      throw error;
    }
  },

  getImageUrl(imagePath) {
    if (!imagePath) return null;
    return supabase.storage
      .from('posts')
      .getPublicUrl(imagePath)
      .data.publicUrl;
  },

  async deletePost(postId) {
    try {
      // First get the post to get its image path
      const { data: post, error: fetchError } = await supabase
        .from('posts')
        .select('image_path')
        .eq('id', postId)
        .single();

      if (fetchError) throw fetchError;

      // If post has an image, delete it from storage
      if (post?.image_path) {
        await this.deleteImage(post.image_path);
      }

      // Then delete the post
      const { error: deleteError } = await supabase
        .from('posts')
        .delete()
        .eq('id', postId);

      if (deleteError) throw deleteError;
    } catch (error) {
      console.error('Error in deletePost:', error);
      throw error;
    }
  }
} 