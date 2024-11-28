import { supabase } from '@/lib/supabase'
import imageCompression from 'browser-image-compression';

export const portfolioService = {
  async getAllProjects() {
    const { data, error } = await supabase
      .from('portfolio_projects')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) throw error
    return data
  },

  async getProjectBySlug(slug) {
    const { data, error } = await supabase
      .from('portfolio_projects')
      .select('*')
      .eq('slug', slug)
      .single()

    if (error) throw error
    return data
  },

  async createProject(projectData) {
    try {
      // Handle main image upload
      let imageUrl = null;
      if (projectData.image instanceof File) {
        const { data: { publicUrl }, error: uploadError } = await this.uploadImage(projectData.image);
        if (uploadError) throw uploadError;
        imageUrl = publicUrl;
      }

      // Handle gallery images upload
      let galleryUrls = [];
      if (projectData.gallery_images?.length > 0) {
        galleryUrls = await Promise.all(
          projectData.gallery_images.map(async (img) => {
            if (img instanceof File) {
              const { data: { publicUrl }, error: uploadError } = await this.uploadImage(img);
              if (uploadError) throw uploadError;
              return publicUrl;
            }
            return img;
          })
        );
      }

      // Create slug from title
      const slug = this.createSlug(projectData.title);

      const { data, error } = await supabase
        .from('portfolio_projects')
        .insert([{
          title: projectData.title,
          slug,
          description: projectData.description,
          image: imageUrl,
          category: projectData.category,
          tags: Array.isArray(projectData.tags) ? projectData.tags : projectData.tags.split(',').map(tag => tag.trim()),
          task: projectData.task,
          strategy: projectData.strategy,
          design: projectData.design,
          client: projectData.client,
          link: projectData.link,
          gallery_images: galleryUrls,
        }])
        .select()
        .single();

      if (error) {
        console.error('Supabase insert error:', error);
        throw error;
      }
      return data;
    } catch (error) {
      console.error('Error creating project:', error);
      throw error;
    }
  },

  async uploadImage(file) {
    try {
      // Image compression options
      const options = {
        maxSizeMB: 1, // Maximum size in MB
        maxWidthOrHeight: 1920, // Max width/height
        useWebWorker: true,
        initialQuality: 0.8 // Initial compression quality
      };

      // Compress the image
      const compressedFile = await imageCompression(file, options);

      // Generate a random filename
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `${fileName}`;

      // Upload the compressed image
      const { error: uploadError } = await supabase.storage
        .from('portfolio-images')
        .upload(filePath, compressedFile);

      if (uploadError) throw uploadError;

      return supabase.storage
        .from('portfolio-images')
        .getPublicUrl(filePath);
    } catch (error) {
      console.error('Error uploading image:', error);
      throw error;
    }
  },

  createSlug(title) {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '');
  }
}; 