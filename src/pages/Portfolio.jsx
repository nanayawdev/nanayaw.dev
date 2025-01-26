import { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { supabase } from '@/lib/supabase';
import { ArrowRight } from 'lucide-react';

const Portfolio = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      const { data, error } = await supabase
        .from('portfolio_projects')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching projects:', error);
      } else {
        setProjects(data);
      }
    };

    fetchProjects();
  }, []);

  return (
    <div className="flex flex-col items-start justify-start py-16 sm:py-20 lg:py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <Badge variant="outline" className="mb-4 sm:mb-6">
        PORTFOLIO
      </Badge>

      <h1 className="text-4xl sm:text-5xl lg:text-6xl text-gray-900 dark:text-gray-100 font-medium leading-tight mb-12">
        Collection of <span className="text-riptide-500">projects</span> I've worked on
      </h1>

      <p className="text-base text-gray-600 dark:text-gray-400 mb-8">
        Charging solutions for
      </p>

      <div className="w-full divide-y divide-gray-200 dark:divide-gray-800">
        {projects.map((project, index) => (
          <Link
            key={project.id}
            to={`/portfolio/${project.slug}`}
            className="group w-full py-8 sm:py-12 flex items-center justify-between hover:opacity-70 transition-opacity duration-300"
          >
            <div className="flex items-center space-x-8 sm:space-x-12">
              <span className="text-4xl sm:text-5xl lg:text-6xl font-light text-gray-400 dark:text-gray-600">
                {String(index + 1).padStart(2, '0')}
              </span>
              <span className="text-3xl sm:text-4xl lg:text-5xl font-normal text-gray-900 dark:text-gray-100">
                {project.title}
              </span>
            </div>
            <ArrowRight className="w-6 h-6 text-gray-400 dark:text-gray-600 transform group-hover:translate-x-2 transition-transform duration-300" />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Portfolio;
