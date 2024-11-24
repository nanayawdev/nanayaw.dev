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
    { name: 'React', percentage: 92, icon: <SiReact className="w-8 h-8" /> },
    { name: 'Next', percentage: 85, icon: <SiNextdotjs className="w-8 h-8" /> },
    { name: 'Figma', percentage: 80, icon: <Figma className="w-8 h-8" /> },
    { name: 'Vue', percentage: 81, icon: <Framer className="w-8 h-8" /> },
    { name: 'Remix/Astro', percentage: 76, icon: <SiAstro className="w-8 h-8" /> },
    { name: 'Tailwind', percentage: 90, icon: <SiTailwindcss className="w-8 h-8" /> },
  ];

  return (
    <div className="flex flex-col items-start justify-start pt-20 pb-8 px-4 max-w-4xl mx-auto">
      <Badge variant="outline" className="mb-6">
        MY SKILLS
      </Badge>
      
      <div className="space-y-12 w-full">
        <h1 className="text-6xl text-gray-900 dark:text-gray-100 font-medium leading-tight">
          Tech Stack I <span className="text-riptide-500">Work With</span>
        </h1>
        
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          {skills.map((skill) => (
            <div 
              key={skill.name} 
              className="relative rounded-2xl border border-gray-200 dark:border-gray-800 bg-white/50 dark:bg-gray-900/50 p-6 flex flex-col items-center gap-4 hover:border-riptide-400 dark:hover:border-riptide-600 transition-colors"
            >
              <div className="text-gray-900 dark:text-gray-200">{skill.icon}</div>
              <div className="text-3xl font-bold text-riptide-500">{skill.percentage}%</div>
              <div className="text-sm text-gray-400">{skill.name}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Expertise;
