import { useState, useEffect } from 'react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import { portfolioService } from '@/services/portfolioService';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Trash2, Edit, Eye, ImagePlus } from 'lucide-react';
import { toast } from 'sonner';
import { DeleteProjectModal } from "@/components/DeleteProjectModal";

const CATEGORIES = [
  "WEB DESIGN",
  "BRANDING",
  "UI/UX",
  "MOBILE APP",
  "GRAPHIC DESIGN"
];

export const PortfolioAdminPage = () => {
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image: null,
    imagePreview: null,
    category: '',
    tags: [],
    task: '',
    strategy: '',
    design: '',
    client: '',
    link: '',
    gallery_images: [],
    galleryPreviews: []
  });
  const [isLoading, setIsLoading] = useState(false);
  const [projectToDelete, setProjectToDelete] = useState(null);

  useEffect(() => {
    loadProjects();
    checkAuth();
  }, []);

  const checkAuth = async () => {
    const { data: { session }, error } = await supabase.auth.getSession();
    
    if (error || !session) {
      navigate('/signin');
      return;
    }
  };

  const loadProjects = async () => {
    try {
      const data = await portfolioService.getAllProjects();
      setProjects(data);
    } catch (error) {
      toast.error('Error loading projects: ' + error.message);
    }
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({
        ...prev,
        image: file,
        imagePreview: URL.createObjectURL(file)
      }));
    }
  };

  const handleGalleryImagesChange = async (e) => {
    const files = Array.from(e.target.files);
    const previews = files.map(file => URL.createObjectURL(file));
    
    setFormData(prev => ({
      ...prev,
      gallery_images: [...prev.gallery_images, ...files],
      galleryPreviews: [...(prev.galleryPreviews || []), ...previews]
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const projectData = {
        title: formData.title,
        description: formData.description,
        image: formData.image,
        category: formData.category,
        tags: formData.tags,
        task: formData.task,
        strategy: formData.strategy,
        design: formData.design,
        client: formData.client,
        link: formData.link,
        gallery_images: formData.gallery_images || []
      };

      if (selectedProject) {
        await portfolioService.updateProject(selectedProject.id, projectData);
        toast.success('Project updated successfully');
      } else {
        await portfolioService.createProject(projectData);
        toast.success('Project created successfully');
      }

      setFormData({
        title: '',
        description: '',
        image: null,
        imagePreview: null,
        category: '',
        tags: '',
        task: '',
        strategy: '',
        design: '',
        client: '',
        link: '',
        gallery_images: [],
        galleryPreviews: []
      });
      setSelectedProject(null);
      loadProjects();
    } catch (error) {
      console.error('Error saving project:', error);
      toast.error('Error saving project: ' + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCategoryChange = (value) => {
    setFormData(prev => ({
      ...prev,
      category: value
    }));
  };

  const handleEdit = (project) => {
    setSelectedProject(project);
    setFormData({
      title: project.title,
      description: project.description,
      image: project.image,
      imagePreview: project.image,
      category: project.category,
      tags: Array.isArray(project.tags) ? project.tags.join(', ') : '',
      task: project.task,
      strategy: project.strategy,
      design: project.design,
      client: project.client,
      link: project.link,
      gallery_images: project.gallery_images || [],
      galleryPreviews: project.gallery_images || []
    });
  };

  const handleCancelEdit = () => {
    setSelectedProject(null);
    setFormData({
      title: '',
      description: '',
      image: null,
      imagePreview: null,
      category: '',
      tags: [],
      task: '',
      strategy: '',
      design: '',
      client: '',
      link: '',
      gallery_images: [],
      galleryPreviews: []
    });
  };

  const handleDeleteConfirm = async () => {
    if (!projectToDelete) return;

    setIsLoading(true);
    try {
      await portfolioService.deleteProject(projectToDelete.id);
      toast.success('Project deleted successfully');
      setProjectToDelete(null);
      await loadProjects();
    } catch (error) {
      console.error('Error deleting project:', error);
      toast.error('Error deleting project: ' + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen overflow-hidden">
      {/* Main Content */}
      <div className="flex-1 h-screen overflow-y-auto border-b md:border-b-0 md:border-r border-gray-200 dark:border-gray-800">
        <div className="max-w-3xl mx-auto p-4 md:p-6 pb-24 md:pb-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
            <h1 className="text-2xl md:text-3xl font-bold">
              {selectedProject ? 'Edit Project' : 'Create New Project'}
            </h1>
            <RouterLink to="/">
              <Button variant="ghost">
                <ArrowLeft className="mr-2 h-4 w-4" />
                <span className="hidden sm:inline">Back to Home</span>
              </Button>
            </RouterLink>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
            {/* Image Upload */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Main Image</label>
              <div className="flex items-center gap-4">
                {formData.imagePreview && (
                  <img
                    src={formData.imagePreview}
                    alt="Preview"
                    className="w-32 h-32 object-cover rounded-lg"
                  />
                )}
                <Input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="flex-1"
                />
              </div>
            </div>

            {/* Gallery Images */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Gallery Images</label>
              <div className="flex flex-col gap-4">
                <div className="flex gap-2 overflow-x-auto pb-2">
                  {formData.galleryPreviews?.map((preview, index) => (
                    <img
                      key={index}
                      src={preview}
                      alt={`Gallery preview ${index + 1}`}
                      className="w-24 h-24 object-cover rounded-lg"
                    />
                  ))}
                </div>
                <Input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleGalleryImagesChange}
                />
              </div>
            </div>

            {/* Project Details */}
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="space-y-2 flex-1">
                <label className="text-sm font-medium">Title</label>
                <Input
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="Project Title"
                  required
                />
              </div>

              <div className="space-y-2 flex-1">
                <label className="text-sm font-medium">Category</label>
                <Select
                  value={formData.category}
                  onValueChange={handleCategoryChange}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select Category" />
                  </SelectTrigger>
                  <SelectContent>
                    {CATEGORIES.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Project Description"
              required
              className="min-h-[100px]"
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input
                name="client"
                value={formData.client}
                onChange={handleChange}
                placeholder="Client Name"
              />

              <Input
                name="link"
                value={formData.link}
                onChange={handleChange}
                placeholder="Project Link"
              />
            </div>

            <Input
              name="tags"
              value={formData.tags}
              onChange={handleChange}
              placeholder="Tags (comma-separated)"
            />

            <Textarea
              name="task"
              value={formData.task}
              onChange={handleChange}
              placeholder="Project Task"
              className="min-h-[100px]"
            />

            <Textarea
              name="strategy"
              value={formData.strategy}
              onChange={handleChange}
              placeholder="Project Strategy"
              className="min-h-[100px]"
            />

            <Textarea
              name="design"
              value={formData.design}
              onChange={handleChange}
              placeholder="Design Approach"
              className="min-h-[100px]"
            />

            <div className="flex gap-4">
              <Button 
                type="submit" 
                disabled={isLoading}
                className="flex-1"
              >
                {isLoading ? 'Saving...' : (selectedProject ? 'Update Project' : 'Create Project')}
              </Button>
              
              {selectedProject && (
                <Button 
                  type="button" 
                  variant="outline"
                  onClick={handleCancelEdit}
                >
                  Cancel Edit
                </Button>
              )}
            </div>
          </form>
        </div>
      </div>

      {/* Sidebar */}
      <div className="w-full md:w-80 h-screen overflow-y-auto bg-gray-50 dark:bg-gray-900">
        <div className="p-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Projects</h2>
          </div>
          
          <div className="space-y-2">
            {projects.map(project => (
              <div 
                key={project.id} 
                className="p-3 md:p-4 rounded-lg border border-gray-200 dark:border-gray-800 hover:border-riptide-500 dark:hover:border-riptide-500 transition-colors bg-white dark:bg-gray-800"
              >
                {project.image && (
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-32 object-cover rounded-lg mb-2"
                  />
                )}
                <h3 className="font-medium text-sm truncate">
                  {project.title}
                </h3>
                <div className="flex items-center gap-1 md:gap-2 mt-2">
                  <button
                    onClick={() => handleEdit(project)}
                    className="p-1.5 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 text-blue-500"
                    title="Edit"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setProjectToDelete(project)}
                    className="p-1.5 rounded-md hover:bg-red-50 dark:hover:bg-red-900/20 text-red-500"
                    title="Delete"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                  <RouterLink
                    to={`/portfolio/${project.slug}`}
                    className="p-1.5 rounded-md hover:bg-green-50 dark:hover:bg-green-900/20 text-green-500 ml-auto"
                    title="View"
                  >
                    <Eye className="w-4 h-4" />
                  </RouterLink>
                </div>
              </div>
            ))}
            {projects.length === 0 && (
              <p className="text-gray-500 text-center py-4">
                No projects found.
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Delete Modal */}
      <DeleteProjectModal
        isOpen={!!projectToDelete}
        onClose={() => setProjectToDelete(null)}
        onConfirm={handleDeleteConfirm}
        projectTitle={projectToDelete?.title}
        isLoading={isLoading}
      />
    </div>
  );
};

export default PortfolioAdminPage; 