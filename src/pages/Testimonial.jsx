import { Badge } from "@/components/ui/badge";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import mary from "../assets/images/mary.jpg";
import shito from "../assets/images/shito.jpg";
import banku from "../assets/images/banku.jpeg";

const Testimonial = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const testimonials = [
    {
      id: 1,
      name: "Mary Arthur",
      role: "Krontiva Africa",
      image: mary, // Add actual image path
      text: "Working with NY was an absolute pleasure! His innovative approach and technical prowess turned our vision into reality. The end result exceeded our expectations, both in terms of functionality and aesthetics.",
      project: "PROJECT"
    },
    // Add more testimonials here
    {
      id: 2,
      name: "Debby Adu",
      role: "Mills Animation Studios",
      image: shito, // Add actual image path
      text: "A true professional with exceptional skills! NY transformed our outdated website into a sleek, modern platform that perfectly represents our brand. The attention to detail and commitment to excellence were evident throughout the entire process.",
      project: "PROJECT"
    },
    {
      id: 3,
      name: "Fidelia Senam",
      role: "Imagine Media",
      image: banku, // Add actual image path
      text: "NY's expertise in React.js and Vue.js brought our project to life in ways we never imagined. Not only was the final product stunning, but the process was also seamless, thanks to clear communication and thoughtful design decisions.",
      project: "PROJECT"
    }
  ];

  const totalSlides = testimonials.length;

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  return (
    <div className="flex flex-col items-start justify-start pt-20 pb-8 px-4 max-w-4xl mx-auto">
      <Badge variant="outline" className="mb-4">
        TESTIMONIAL
      </Badge>
      
      <h1 className="text-6xl text-gray-900 dark:text-gray-100 font-medium leading-tight mb-12">
        Trusted by <span className="text-riptide-500">Hundered Clients</span>
      </h1>

      <div className="w-full rounded-2xl border border-gray-800 p-8 relative">
        <div className="flex items-start gap-4 mb-8">
          <img 
            src={testimonials[currentSlide].image} 
            alt={testimonials[currentSlide].name}
            className="w-12 h-12 rounded-full object-cover"
          />
          <div>
            <h3 className="text-xl text-gray-900 dark:text-gray-100 font-semibold">
              {testimonials[currentSlide].name}
            </h3>
            <p className="text-sm text-gray-400">
              Director of <span className="text-riptide-500">
                {testimonials[currentSlide].role}
              </span>
            </p>
          </div>
        </div>

        <p className="text-md text-gray-900 dark:text-gray-100 leading-relaxed mb-8">
          {testimonials[currentSlide].text}
        </p>

        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-500">
            {testimonials[currentSlide].project}
          </span>
          
          <div className="flex items-center gap-4">
            <button 
              onClick={prevSlide}
              className="p-2 rounded-full border border-gray-800 hover:border-riptide-500 transition-colors"
            >
              <ChevronLeft className="w-5 h-5 text-gray-900 dark:text-gray-100" />
            </button>
            
            <span className="text-sm text-gray-900 dark:text-gray-100">
              {currentSlide + 1} / {totalSlides}
            </span>
            
            <button 
              onClick={nextSlide}
              className="p-2 rounded-full border border-gray-800 hover:border-riptide-500 transition-colors"
            >
              <ChevronRight className="w-5 h-5 text-gray-900 dark:text-gray-100" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Testimonial;
