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
    <div className="flex flex-col items-start justify-start pt-20 pb-8 px-4 max-w-4xl mx-auto">
      <Badge variant="outline" className="mb-4">
        SERVICES
      </Badge>
      
      <h1 className="text-6xl text-gray-900 dark:text-gray-100 font-medium leading-tight mb-8">
        What I offer as<br />
        <span className="text-riptide-500">services</span>
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
        {services.map((service) => {
          const Icon = service.icon;
          return (
            <div 
              key={service.id}
              className="p-6 border-b-2 border-riptide-400 dark:border-riptide-400 hover:border-riptide-700 dark:hover:border-riptide-700"
            >
              <div className="mb-4">
                <Icon className="w-6 h-6 text-riptide-500" />
              </div>
              <h3 className="text-2xl text-gray-900 dark:text-gray-100 font-semibold mb-3">{service.title}</h3>
              <p className="text-gray-400">{service.description}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Services;
