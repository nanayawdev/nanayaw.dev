import { Badge } from "@/components/ui/badge";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useEffect } from "react";
import mary from "../assets/images/mary.jpg";
import shito from "../assets/images/shito.jpg";
import banku from "../assets/images/banku.jpeg";
import { SiReact, SiVuedotjs, SiTailwindcss, SiTypescript } from "react-icons/si";
import { FaNodeJs, FaGitAlt, FaDocker } from "react-icons/fa";
import { TbBrandNextjs } from "react-icons/tb";

const Testimonial = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  
  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  const testimonials = [
    {
      id: 1,
      name: "Mrs. Gertrude Dzifa",
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
      name: "Ronald Osei Kuffour",
      role: "Imagine Media",
      image: banku, // Add actual image path
      text: "NY's expertise in React.js and Vue.js brought our project to life in ways we never imagined. Not only was the final product stunning, but the process was also seamless, thanks to clear communication and thoughtful design decisions.",
      project: "PROJECT"
    }
  ];

  const totalSlides = testimonials.length;

  const nextSlide = () => {
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentSlide((prev) => (prev + 1) % totalSlides);
      setIsAnimating(false);
    }, 300);
  };

  const prevSlide = () => {
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
      setIsAnimating(false);
    }, 300);
  };

  return (
    <div className="flex flex-col items-start justify-start pt-16 sm:pt-20 lg:pt-28 pb-8 px-4 max-w-4xl mx-auto">
      <Badge variant="outline" className="mb-4 sm:mb-6">
        TESTIMONIAL
      </Badge>
      
      <h1 className="text-4xl sm:text-5xl lg:text-6xl text-gray-900 dark:text-gray-100 font-medium leading-tight mb-8 sm:mb-12">
        Trusted by <span className="text-riptide-500">13+ Clients</span>
      </h1>

      <div className="w-full rounded-2xl border border-gray-800 p-4 sm:p-6 lg:p-8 relative">
        <div 
          className={`
            transition-all duration-500 ease-in-out
            ${isAnimating ? 'opacity-0 transform translate-y-4' : 'opacity-100 transform translate-y-0'}
          `}
        >
          <div className="flex items-start gap-3 sm:gap-4 mb-6 sm:mb-8">
            <img 
              src={testimonials[currentSlide].image} 
              alt={testimonials[currentSlide].name}
              className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover"
            />
            <div>
              <h3 className="text-lg sm:text-xl text-gray-900 dark:text-gray-100 font-semibold">
                {testimonials[currentSlide].name}
              </h3>
              <p className="text-xs sm:text-sm text-gray-400">
                Director of <span className="text-riptide-500">
                  {testimonials[currentSlide].role}
                </span>
              </p>
            </div>
          </div>

          <p className="text-sm sm:text-base text-gray-900 dark:text-gray-100 leading-relaxed mb-6 sm:mb-8">
            {testimonials[currentSlide].text}
          </p>

          <div className="flex items-center justify-between">
            <span className="text-xs sm:text-sm text-gray-500">
              {testimonials[currentSlide].project}
            </span>
            
            <div className="flex items-center gap-3 sm:gap-4">
              <button 
                onClick={prevSlide}
                className="p-1.5 sm:p-2 rounded-full border border-gray-800 hover:border-riptide-500 transition-colors"
              >
                <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 text-gray-900 dark:text-gray-100" />
              </button>
              
              <span className="text-xs sm:text-sm text-gray-900 dark:text-gray-100">
                {currentSlide + 1} / {totalSlides}
              </span>
              
              <button 
                onClick={nextSlide}
                className="p-1.5 sm:p-2 rounded-full border border-gray-800 hover:border-riptide-500 transition-colors"
              >
                <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-gray-900 dark:text-gray-100" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Testimonial;
