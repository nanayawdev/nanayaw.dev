import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import logo from '../../assets/logos/nylogo.png';
import { navigationConfig } from '../../config/navigation.jsx';

export default function Navbar() {
  const [hoveredItem, setHoveredItem] = useState(null);
  const [activeSection, setActiveSection] = useState('home');
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll('section[id]');
      const scrollPosition = window.scrollY + window.innerHeight / 2;

      sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
          setActiveSection(sectionId);
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="hidden lg:flex fixed bottom-4 left-1/2 -translate-x-1/2 items-center justify-between w-auto max-w-4xl px-6 py-3 rounded-md 
      bg-slate-50/80 dark:bg-slate-950/80 
      backdrop-blur-md 
      shadow-[0_4px_6px_-1px_rgba(51,65,85,0.1),0_2px_4px_-2px_rgba(51,65,85,0.1)]
      border border-slate-200/20 dark:border-slate-800/20
      z-50">
      <div className="flex items-center gap-8">
        <button onClick={() => scrollToSection('home')} className="flex items-center">
          <img src={logo} alt="Logo" className="h-6 w-auto" />
        </button>
        <ul className="flex space-x-6">
          {navigationConfig.map((item) => {
            const sectionId = item.path.replace('/', '') || 'home';
            const isActive = activeSection === sectionId;
            
            return (
              <li key={item.path}>
                <button
                  onClick={() => scrollToSection(sectionId)}
                  className={`relative flex items-center transition-colors ${
                    isActive 
                      ? 'text-rose-500 dark:text-rose-400' 
                      : 'text-slate-950 dark:text-slate-50 hover:text-rose-500 dark:hover:text-rose-400'
                  }`}
                  onMouseEnter={() => setHoveredItem(item.path)}
                  onMouseLeave={() => setHoveredItem(null)}
                >
                  <motion.div
                    className="relative flex items-center gap-2 px-3 py-2 rounded-md"
                    animate={{
                      backgroundColor: hoveredItem === item.path || isActive
                        ? 'rgba(244, 63, 94, 0.1)' // rose-500 with opacity
                        : 'rgba(0, 0, 0, 0)',
                    }}
                    transition={{ duration: 0.2 }}
                  >
                    {item.icon}
                    <motion.span
                      className="text-sm font-normal"
                      initial={false}
                      animate={{
                        width: hoveredItem === item.path || isActive ? 'auto' : 0,
                        opacity: hoveredItem === item.path || isActive ? 1 : 0,
                      }}
                      transition={{ duration: 0.2 }}
                    >
                      {item.label}
                    </motion.span>
                  </motion.div>
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
