import { Badge } from "@/components/ui/badge";
import { Briefcase, Code, Users, Palette, Building2 } from "lucide-react";
import ScrollingBanner from "@/components/ui/ScrollingBanner";

const Resume = () => {
  const experiences = [
    {
      period: "2022 - Present",
      active: true,
      roles: [
        {
          title: "UI/UX Designer & Developer",
          company: "Krontiva Africa",
          icon: <Code className="w-4 sm:w-5 h-4 sm:h-5 text-gray-900 dark:text-gray-100" />
        },
        {
          title: "Front-End Developer",
          company: "Krontiva Africa",
          icon: <Briefcase className="w-4 sm:w-5 h-4 sm:h-5 text-gray-900 dark:text-gray-100" />
        }
      ]
    },
    {
      period: "2020 - 2022",
      active: false,
      roles: [
        {
          title: "Graphic Designer",
          company: "Freelance",
          icon: <Building2 className="w-4 sm:w-5 h-4 sm:h-5 text-gray-900 dark:text-gray-100" />
        },
        {
          title: "Photographer",
          company: "Freelance",
          icon: <Palette className="w-4 sm:w-5 h-4 sm:h-5 text-gray-900 dark:text-gray-100" />
        },
        {
          title: "Front-End Developer",
          company: "ABS Digital Agency",
          icon: <Users className="w-4 sm:w-5 h-4 sm:h-5 text-gray-900 dark:text-gray-100" />
        }
      ]
    }
  ];

  return (
    <div id="resume" className="flex flex-col items-start justify-start pt-16 sm:pt-20 lg:pt-28 pb-8 px-4 max-w-4xl mx-auto">
      <Badge variant="outline" className="mb-4 sm:mb-6">
        RESUME
      </Badge>
      
      <h1 className="text-4xl sm:text-5xl lg:text-6xl text-gray-900 dark:text-gray-100 font-medium leading-tight mb-8 sm:mb-12">
        Work & <span className="text-riptide-500">Experience</span>
      </h1>
      
      <ScrollingBanner 
        items={["UI/UX DESIGN", "FRONT-END DEVELOPMENT", "GRAPHIC DESIGN", "PHOTOGRAPHY"]}
        speed={25}
        className="mb-8 sm:mb-12 -mx-4"
      />
      
      <div className="relative w-full max-w-2xl">
        {experiences.map((exp) => (
          <div key={exp.period} className="mb-12 sm:mb-16 last:mb-0">
            {/* Content */}
            <div className="space-y-6 sm:space-y-8">
              <div className="text-riptide-500 font-semibold text-sm sm:text-base">{exp.period}</div>
              
              {exp.roles.map((role, roleIndex) => (
                <div key={roleIndex} className="flex items-start gap-3 sm:gap-4">
                  <div className="mt-1">{role.icon}</div>
                  <div className="space-y-1">
                    <h3 className="text-lg sm:text-xl text-gray-900 dark:text-gray-100 font-medium">
                      {role.title}
                    </h3>
                    <p className="text-sm sm:text-base text-gray-400">{role.company}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Resume;
