import { Badge } from "@/components/ui/badge";

const About = () => {
  return (
    <div id="about" className="flex flex-col items-start justify-start pt-20 pb-8 px-4 max-w-4xl mx-auto">
      <Badge variant="outline" className="mb-6">
        ABOUT ME
      </Badge>
      
      <h1 className="text-6xl text-gray-900 dark:text-gray-100 font-normal leading-tight mb-8">
        Crafting digital experiences that blend{' '}
        <span className="text-riptide-500">creativity</span>, innovation, and code
      </h1>
      
      <div className="space-y-6 text-gray-400">
        <p>
          Hello! I'm NY, a passionate web developer specializing in React.js, Next.js, and Vue.js, 
          with a knack for crafting engaging and efficient digital experiences. With a strong 
          foundation in HTML, CSS, and JavaScript, I bring creative visions to life while ensuring 
          functionality and performance remain top-notch.
        </p>

        <p>
          I thrive on solving complex problems and staying ahead of the curve with modern tools 
          and technologies. Whether it's building sleek front-end interfaces, ensuring responsive 
          designs, or enhancing user experiences, I take pride in delivering impactful solutions 
          that make a difference.
        </p>

        <p>
          Beyond the code, I enjoy exploring innovative ideas, sharing knowledge through blogs, 
          and collaborating with fellow developers. When I'm not coding, you'll likely find me 
          diving into tech trends or brainstorming ways to push boundaries in the ever-evolving 
          world of web development.
        </p>

        <p className="text-riptide-500 font-medium">
          Let's build something extraordinary together!
        </p>
      </div>
    </div>
  );
};

export default About;
