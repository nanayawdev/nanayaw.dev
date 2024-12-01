import { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { useParams, Link } from "react-router-dom";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import Contact from "./Contact";
import { portfolioService } from '@/services/portfolioService';
import { ChevronRight, ExternalLink } from "lucide-react";

const PortfolioView = () => {
  const { slug } = useParams();
  const [project, setProject] = useState(null);
  const [allProjects, setAllProjects] = useState([]);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isProjectOpen, setIsProjectOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [projectData, allProjectsData] = await Promise.all([
          portfolioService.getProjectBySlug(slug),
          portfolioService.getAllProjects()
        ]);
        
        setProject(projectData);
        setAllProjects(allProjectsData);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [slug]);

  // Filter out the current project from all projects
  const otherProjects = allProjects.filter(p => p.slug !== slug);

  if (isLoading) return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
  if (!project) return <div className="flex justify-center items-center min-h-screen">Project not found</div>;

  return (
    <div className="flex flex-col items-start justify-start pt-16 sm:pt-24 pb-8 px-4 max-w-7xl mx-auto">
      {/* Hero Section */}
      <div className="w-full mb-16 sm:mb-24">
        <div className="max-w-4xl mb-12">
          <Badge variant="outline" className="mb-6">
            {project?.tags[0].toUpperCase()}
          </Badge>
          
          <h1 className="text-4xl sm:text-5xl lg:text-6xl text-gray-900 dark:text-gray-100 font-medium leading-tight mb-8">
            {project?.title}
          </h1>

          <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
            {project?.description}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-12">
          <div>
            <h3 className="text-lg font-medium mb-3">Task</h3>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{project?.task}</p>
          </div>
          
          <div>
            <h3 className="text-lg font-medium mb-3">Strategy</h3>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{project?.strategy}</p>
          </div>
          
          <div>
            <h3 className="text-lg font-medium mb-3">Design Approach</h3>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{project?.design}</p>
          </div>
        </div>

        <div className="mt-12">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-1">Client</h3>
                <p className="text-base font-medium">{project?.client}</p>
              </div>
              {project?.link && (
                <button
                  onClick={() => setIsProjectOpen(true)}
                  className="inline-flex items-center px-6 py-3 text-sm font-medium text-white bg-black dark:bg-white dark:text-black rounded-full hover:opacity-90 transition-opacity"
                >
                  View Project
                  <ChevronRight className="ml-2 w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Project Image */}
      <div className="w-full mb-12">
        <img
          src={project?.image}
          alt="Project showcase"
          className="w-full h-auto max-h-[700px] object-cover rounded-2xl"
          onError={(e) => {
            console.error('Error loading main image:', e);
          }}
        />
      </div>

      {/* Gallery Grid */}
      <div className="w-full mb-24 grid grid-cols-1 sm:grid-cols-2 gap-6">
        {project?.gallery_images?.map((img, index) => (
          <div 
            key={index}
            className="group relative overflow-hidden rounded-xl"
          >
            <img
              src={img}
              alt={`Project detail ${index + 1}`}
              className="w-full h-auto aspect-video object-cover transition-transform duration-500 hover:scale-105"
              onError={(e) => {
                console.error(`Error loading gallery image ${index + 1}:`, e);
              }}
            />
          </div>
        ))}
      </div>

      {/* Other Projects Section */}
      <div className="w-full mt-8 sm:mt-16 border-t pt-8 sm:pt-16">
        <div className="mb-8 sm:mb-12">
          <p className="text-sm font-medium mb-2">EXPLORE MORE</p>
          <h2 className="text-3xl sm:text-4xl font-medium">Other Projects</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {otherProjects.map((otherProject) => (
            <Link
              key={otherProject.slug}
              to={`/portfolio/${otherProject.slug}`}
              className="group block"
            >
              <div className="relative aspect-video overflow-hidden rounded-xl mb-4">
                <img
                  src={otherProject.image}
                  alt={otherProject.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <Badge variant="outline" className="mb-3">
                {otherProject.tags[0].toUpperCase()}
              </Badge>
              <h3 className="text-xl font-medium mb-2">{otherProject.title}</h3>
              <p className="text-gray-600 dark:text-gray-300 line-clamp-3">
                {otherProject.description}
              </p>
            </Link>
          ))}
        </div>
      </div>

      {/* Collaboration Section */}
      <div className="w-full mt-16 border-t pt-16">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8">
          <div>
            <p className="text-sm font-medium mb-2">LET'S COLLABORATE</p>
            <h2 className="text-3xl sm:text-4xl font-medium">Got a project?</h2>
          </div>
          
          <button
            onClick={() => setIsContactOpen(true)}
            className="inline-flex items-center px-6 py-3 text-sm font-medium text-white bg-black dark:bg-white dark:text-black rounded-full hover:opacity-90 transition-opacity"
          >
            Contact Me
            <ChevronRight className="ml-2 w-4 h-4" />
          </button>
        </div>

        <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed max-w-3xl">
          I'm a passionate creative and developer who is excited about unique ideas and help companies to{' '}
          <span className="font-medium text-gray-900 dark:text-gray-100">
            create amazing identities and experiences
          </span>{' '}
          by crafting top-notch UI/UX and website design.
        </p>
      </div>

      {/* Dialogs remain the same */}
      <Dialog open={isContactOpen} onOpenChange={setIsContactOpen}>
        <DialogContent className="sm:max-w-[900px] max-h-[90vh] overflow-y-auto">
          <Contact />
        </DialogContent>
      </Dialog>

      <Dialog open={isProjectOpen} onOpenChange={setIsProjectOpen}>
        <DialogContent className="sm:max-w-[900px] h-[90vh]">
          <div className="h-full flex flex-col">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-medium">{project?.title}</h2>
              <a 
                href={project?.link} 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 bg-gray-100 dark:bg-gray-800 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              >
                <span className="mr-2">Open in new tab</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
            
            <div className="flex-grow relative">
              <iframe
                src={project?.link}
                className="w-full h-full absolute inset-0"
                title={project?.title}
                loading="lazy"
                sandbox="allow-scripts allow-same-origin allow-forms"
              />
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PortfolioView; 