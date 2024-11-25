import { supabase } from '@/lib/supabase'

export const blogService = {
  async getAllPosts() {
    const { data, error } = await supabase
      .from('posts')
      .select('*')
      .eq('published', true)
      .order('created_at', { ascending: false })
      .limit(10)

    if (error) {
      console.error('Error fetching posts:', error)
      throw error
    }

    console.log('Fetched posts:', data)
    return data
  },

  async getPostBySlug(slug) {
    const { data, error } = await supabase
      .from('posts')
      .select('*')
      .eq('slug', slug)
      .eq('published', true)
      .single()

    if (error) throw error
    return data
  },

  async getRelatedPosts(category, currentSlug) {
    const { data, error } = await supabase
      .from('posts')
      .select('*')
      .eq('category', category)
      .eq('published', true)
      .neq('slug', currentSlug)
      .order('created_at', { ascending: false })
      .limit(2)

    if (error) throw error
    return data
  }
} 