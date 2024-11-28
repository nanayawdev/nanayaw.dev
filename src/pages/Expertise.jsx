import { 
  SiTailwindcss, 
  SiReact, 
  SiNextdotjs, 
  SiAstro
} from "react-icons/si";
import { Figma, Framer } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const Expertise = () => {
  const skills = [
    { name: 'React', percentage: 92, icon: <SiReact className="w-6 sm:w-8 h-6 sm:h-8" /> },
    { name: 'Next', percentage: 85, icon: <SiNextdotjs className="w-6 sm:w-8 h-6 sm:h-8" /> },
    { name: 'Figma', percentage: 80, icon: <Figma className="w-6 sm:w-8 h-6 sm:h-8" /> },
    { name: 'Framer', percentage: 81, icon: <Framer className="w-6 sm:w-8 h-6 sm:h-8" /> },
    { name: 'Astro', percentage: 76, icon: <SiAstro className="w-6 sm:w-8 h-6 sm:h-8" /> },
    { name: 'Tailwind', percentage: 90, icon: <SiTailwindcss className="w-6 sm:w-8 h-6 sm:h-8" /> },
  ];

  return (
    <div className="flex flex-col items-start justify-start pt-16 sm:pt-20 lg:pt-28 pb-8 px-4 max-w-4xl mx-auto">
      <Badge variant="outline" className="mb-4 sm:mb-6">
        MY SKILLS
      </Badge>
      
      <div className="space-y-8 sm:space-y-12 w-full">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl text-gray-900 dark:text-gray-100 font-medium leading-tight">
          Tech Stack I <span className="text-riptide-500">Work With</span>
        </h1>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {skills.map((skill) => (
            <div 
              key={skill.name} 
              className="relative rounded-2xl border border-gray-200 dark:border-gray-800 bg-white/50 dark:bg-gray-900/50 p-4 sm:p-6 flex flex-col items-center gap-3 sm:gap-4 hover:border-riptide-400 dark:hover:border-riptide-600 transition-colors"
            >
              <div className="text-gray-900 dark:text-gray-200">{skill.icon}</div>
              <div className="text-2xl sm:text-3xl font-bold text-riptide-500">{skill.percentage}%</div>
              <div className="text-xs sm:text-sm text-gray-400">{skill.name}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Expertise;
