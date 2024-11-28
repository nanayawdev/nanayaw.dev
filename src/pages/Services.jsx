import { Badge } from "@/components/ui/badge";
import { Palette, Code, Layers, BarChart } from "lucide-react";

const Services = () => {
  const services = [
    {
      id: 1,
      number: "01",
      title: "UI/UX Design",
      description: "Crafting intuitive and engaging user experiences through thoughtful interface design and user-centered solutions.",
      icon: Palette
    },
    {
      id: 2,
      number: "02",
      title: "Development",
      description: "Building robust and scalable web applications using modern technologies and best practices.",
      icon: Code
    },
    {
      id: 3,
      number: "03",
      title: "Brand Identity",
      description: "Creating distinctive visual identities that communicate your brand's values and resonate with your audience.",
      icon: Layers
    },
    {
      id: 4,
      number: "04",
      title: "Digital Marketing",
      description: "Implementing strategic digital marketing solutions to enhance your online presence and reach.",
      icon: BarChart
    }
  ];

  return (
    <div className="flex flex-col items-start justify-start pt-16 sm:pt-20 lg:pt-28 pb-8 px-4 max-w-4xl mx-auto">
      <Badge variant="outline" className="mb-4 sm:mb-6">
        SERVICES
      </Badge>
      
      <h1 className="text-4xl sm:text-5xl lg:text-6xl text-gray-900 dark:text-gray-100 font-medium leading-tight mb-6 sm:mb-8 lg:mb-12">
        What I offer as<br />
        <span className="text-riptide-500">services</span>
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 w-full">
        {services.map((service) => {
          const Icon = service.icon;
          return (
            <div 
              key={service.id}
              className="p-4 sm:p-6 border-b-2 border-riptide-400 dark:border-riptide-400 hover:border-riptide-700 dark:hover:border-riptide-700"
            >
              <div className="mb-3 sm:mb-4">
                <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-riptide-500" />
              </div>
              <h3 className="text-xl sm:text-2xl text-gray-900 dark:text-gray-100 font-semibold mb-2 sm:mb-3">
                {service.title}
              </h3>
              <p className="text-sm sm:text-base text-gray-400">
                {service.description}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Services;
