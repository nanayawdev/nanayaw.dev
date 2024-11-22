import React from 'react';
import { Badge } from "@/components/ui/badge";

const Home = () => {
  return (
    <div className="flex flex-col items-start justify-center min-h-screen max-w-4xl mx-auto px-4">
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
      
      <p className="text-gray-400 text-lg">
        I design and code beautifully simple things and i love what i do.
        <br />
        Just simple like that!
      </p>
    </div>
  );
};

export default Home;
