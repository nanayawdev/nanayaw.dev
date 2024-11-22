import React from 'react';
import { Badge } from "@/components/ui/badge";

const Home = () => {
  return (
    <div className="flex flex-col items-start justify-start pt-20 pb-8 px-4 max-w-4xl mx-auto">
      <Badge variant="outline" className="mb-6">
        PERSONALITY
      </Badge>
      
      <h1 className="text-6xl font-normal leading-tight mb-6">
        Hi, folks I'm <span className="text-riptide-500">NY</span>,{' '}
        <br />
        UI/UX Designer
        <br />
        and Web Developer
      </h1>
      
      <p className="text-gray-400 text-lg mb-12">
        I design and code beautifully simple things and i love what i do.
        <br />
        Just simple like that!
      </p>

      {/* Stats Section */}
      <div className="flex gap-12">
        <div>
          <h2 className="text-5xl font-semibold text-riptide-500">10+</h2>
          <p className="text-gray-400 mt-2">YEARS OF<br />EXPERIENCE</p>
        </div>
        <div>
          <h2 className="text-5xl font-semibold text-riptide-500">182+</h2>
          <p className="text-gray-400 mt-2">PROJECTS COMPLETED ON<br />15 COUNTRIES</p>
        </div>
      </div>
    </div>
  );
};

export default Home;
