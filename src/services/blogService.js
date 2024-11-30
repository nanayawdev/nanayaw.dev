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
    const { data, error } = await supabase
      .from('posts')
      .select('*')
      .eq('slug', slug)
      .eq('status', 'published')
      .single()

    if (error) throw error
    return data
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
    return data
  },

  async likePost(postId) {
    try {
      // First, try to insert a like
      const { error: insertError } = await supabase
        .from('post_likes')
        .insert([
          { 
            post_id: postId,
            user_ip: await this.getUserIP() 
          }
        ]);

      if (insertError) {
        if (insertError.code === '23505') { // Unique violation
          return { success: false, message: 'Already liked' };
        }
        throw insertError;
      }

      // Then increment the like count
      const { data, error: updateError } = await supabase.rpc('increment_like_count', {
        post_id: postId
      });

      if (updateError) throw updateError;

      return { 
        success: true, 
        newCount: data.like_count 
      };
    } catch (error) {
      console.error('Error liking post:', error);
      throw error;
    }
  },

  async hasUserLikedPost(postId) {
    try {
      const userIP = await this.getUserIP();
      const { data, error } = await supabase
        .from('post_likes')
        .select('id')
        .eq('post_id', postId)
        .eq('user_ip', userIP)
        .single();

      if (error && error.code !== 'PGRST116') throw error;
      return !!data;
    } catch (error) {
      console.error('Error checking like status:', error);
      return false;
    }
  },

  async getUserIP() {
    try {
      const response = await fetch('https://api.ipify.org?format=json');
      const data = await response.json();
      return data.ip;
    } catch (error) {
      console.error('Error getting IP:', error);
      return 'unknown';
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
        // Delete old image if it exists
        if (oldPost.image_path) {
          await this.deleteImage(oldPost.image_path);
        }
        // Upload new image
        imagePath = await this.uploadImage(postData.image);
      }

      const { data, error } = await supabase
        .from('posts')
        .update({
          ...postData,
          image_path: imagePath,
          updated_at: new Date().toISOString()
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
      console.log('Creating post with data:', postData); // Debug log
      
      let imagePath = null;
      if (postData.image) {
        imagePath = await this.uploadImage(postData.image);
        console.log('Image uploaded, path:', imagePath);
      }

      // Create the database record
      const { data, error } = await supabase
        .from('posts')
        .insert([{
          title: postData.title,
          slug: postData.slug,
          content: postData.content,
          excerpt: postData.excerpt,
          category: postData.category,
          status: postData.status,
          published_at: postData.published_at,
          image_path: imagePath,
          created_at: new Date().toISOString()
        }])
        .select()
        .single();

      if (error) {
        console.error('Database error:', error);
        throw error;
      }

      console.log('Post created successfully:', data);
      return data;
    } catch (error) {
      console.error('Error creating post:', error);
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

      if (uploadError) throw uploadError;

      return filePath;
    } catch (error) {
      console.error('Error uploading image:', error);
      throw error;
    }
  },

  async deleteImage(filePath) {
    try {
      const { error } = await supabase.storage
        .from('posts')
        .remove([filePath]);

      if (error) throw error;
    } catch (error) {
      console.error('Error deleting image:', error);
      throw error;
    }
  },

  getImageUrl(imagePath) {
    if (!imagePath) return null;
    return supabase.storage
      .from('posts')
      .getPublicUrl(imagePath)
      .data.publicUrl;
  }
} 