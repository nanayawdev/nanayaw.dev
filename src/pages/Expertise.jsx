import { Figma, Framer, Code2, Globe, Database } from 'lucide-react';
import { Badge } from "@/components/ui/badge";

const Expertise = () => {
  const skills = [
    { name: 'Figma', percentage: 92, icon: <Figma className="w-8 h-8" /> },
    { name: 'Framer', percentage: 85, icon: <Framer className="w-8 h-8" /> },
    { name: 'Webflow', percentage: 80, icon: <Globe className="w-8 h-8" /> },
    { name: 'React', percentage: 90, icon: <Code2 className="w-8 h-8" /> },
    { name: 'WordPress', percentage: 86, icon: <Globe className="w-8 h-8" /> },
    { name: 'Laravel/PHP', percentage: 70, icon: <Database className="w-8 h-8" /> },
  ];

  return (
    <div className="flex flex-col items-start justify-start pt-20 pb-8 px-4 max-w-4xl mx-auto">
      <Badge variant="outline" className="mb-6">
        MY SKILLS
      </Badge>
      
      <div className="space-y-12 w-full">
        <h1 className="text-6xl text-gray-900 dark:text-gray-100 font-medium leading-tight">
          My <span className="text-riptide-500">Advantages</span>
        </h1>
        
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          {skills.map((skill) => (
            <div 
              key={skill.name} 
              className="relative rounded-2xl border border-gray-200 dark:border-gray-800 bg-white/50 dark:bg-gray-900/50 p-6 flex flex-col items-center gap-4 hover:border-riptide-500/50 transition-colors"
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
