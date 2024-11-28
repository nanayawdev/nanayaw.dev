import React from 'react';
import { Badge } from "@/components/ui/badge";
import { RotatingText } from "@/components/ui/rotating-text";

const Home = () => {
  return (
    <div className="flex flex-col items-start justify-start pt-16 sm:pt-20 lg:pt-28 pb-8 px-4 max-w-4xl mx-auto">
      <Badge variant="outline" className="mb-4 sm:mb-6">
        PERSONALITY
      </Badge>
      
      <div className="mb-4 sm:mb-6">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl text-gray-900 dark:text-gray-100 font-medium leading-tight">
          Hi, folks I'm <span className="text-riptide-400 dark:text-[#2bfd5f]">NY</span>,{' '}
          <br />
          UI/UX Designer
          <br />
          and Web Developer
        </h1>
      </div>

      <p className="text-gray-400 mb-8 sm:mb-12 text-sm sm:text-base">
        I design and code beautifully simple things and i love what i do.
        <br className="hidden sm:block" />
        Just simple like that!
      </p>

      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between w-full gap-8 sm:gap-0">
        <div className="grid grid-cols-2 gap-6 sm:gap-12">
          <div>
            <h2 className="text-4xl sm:text-5xl font-medium text-riptide-500">10+</h2>
            <p className="text-gray-400 mt-2 text-sm sm:text-base">YEARS OF<br />EXPERIENCE</p>
          </div>
          <div>
            <h2 className="text-4xl sm:text-5xl font-medium text-riptide-500">182+</h2>
            <p className="text-gray-400 mt-2 text-sm sm:text-base">PROJECTS COMPLETED ON<br />15 COUNTRIES</p>
          </div>
        </div>
        <RotatingText className="hidden sm:block" />
      </div>
    </div>
  );
};

export default Home;
