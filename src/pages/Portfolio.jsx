import { Badge } from "@/components/ui/badge";
import { portfolioData } from "../data/portfolioData";

const Portfolio = () => {
  return (
    <div id="portfolio" className="flex flex-col items-start justify-start pt-20 pb-8 px-4 max-w-4xl mx-auto">
      <Badge variant="outline" className="mb-6">
        PORTFOLIO
      </Badge>

      <h1 className="text-6xl text-gray-900 dark:text-gray-100 font-medium leading-tight mb-6">
        Collection of <span className="text-riptide-500">projects</span> I've worked on
      </h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
        {portfolioData.map((project) => (
          <a
            key={project.id}
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="relative group overflow-hidden rounded-xl transition-all duration-300 hover:scale-[1.02]"
          >
            <div className="relative w-full h-80">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent" />
              
              {/* Content overlay */}
              <div className="absolute inset-0 p-6 flex flex-col justify-end">
                <h3 className="text-xl font-semibold text-white mb-2">{project.title}</h3>
                <p className="text-gray-200 text-sm mb-4 line-clamp-2">{project.description}</p>
                
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 text-xs rounded-full bg-white/10 text-white backdrop-blur-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};

export default Portfolio;
