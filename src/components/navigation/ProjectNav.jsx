import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight } from "lucide-react";

const ProjectNav = ({ 
  type = 'project', // or 'blog'
  nextItem,
  previousItem 
}) => {
  const baseUrl = type === 'project' ? '/portfolio' : '/blog';

  return (
    <div className="fixed bottom-4 sm:bottom-8 right-4 sm:right-8 z-50 max-w-[calc(100vw-2rem)] sm:max-w-md">
      <div className="bg-black dark:bg-white rounded-2xl shadow-lg flex flex-col sm:flex-row text-sm sm:text-base">
        {previousItem && (
          <Link
            to={`${baseUrl}/${previousItem.slug}`}
            className="flex items-center gap-2 sm:gap-3 p-3 sm:p-4 text-white dark:text-black hover:bg-gray-900 dark:hover:bg-gray-100 rounded-t-2xl sm:rounded-l-2xl sm:rounded-tr-none transition-colors group border-b sm:border-b-0 sm:border-r border-gray-800 dark:border-gray-200"
          >
            <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 transition-transform group-hover:-translate-x-1" />
            <div className="flex-1 min-w-0">
              <p className="text-xs sm:text-sm font-medium opacity-60 mb-0.5 sm:mb-1">Previous {type}</p>
              <p className="font-medium truncate">{previousItem.title}</p>
            </div>
          </Link>
        )}
        {nextItem && (
          <Link
            to={`${baseUrl}/${nextItem.slug}`}
            className="flex items-center gap-2 sm:gap-3 p-3 sm:p-4 text-white dark:text-black hover:bg-gray-900 dark:hover:bg-gray-100 rounded-b-2xl sm:rounded-r-2xl sm:rounded-bl-none transition-colors group"
          >
            <div className="flex-1 min-w-0">
              <p className="text-xs sm:text-sm font-medium opacity-60 mb-0.5 sm:mb-1">Next {type}</p>
              <p className="font-medium truncate">{nextItem.title}</p>
            </div>
            <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 transition-transform group-hover:translate-x-1" />
          </Link>
        )}
      </div>
    </div>
  );
};

export default ProjectNav; 