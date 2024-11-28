import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import logo from '../../assets/logos/nylogo.png';
import { navigationConfig } from '../../config/navigation.jsx';

export default function Navbar() {
  const [hoveredItem, setHoveredItem] = useState(null);
  const location = useLocation();

  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="hidden lg:flex fixed bottom-4 left-1/2 -translate-x-1/2 items-center justify-between w-auto max-w-4xl px-6 py-3 rounded-md 
      bg-rose-50/80 dark:bg-rose-950/80 
      backdrop-blur-md 
      shadow-[0_4px_6px_-1px_rgba(244,63,94,0.1),0_2px_4px_-2px_rgba(244,63,94,0.1)]
      border border-rose-200/20 dark:border-rose-800/20
      z-50">
      <div className="flex items-center gap-8">
        <button onClick={() => scrollToSection('home')} className="flex items-center">
          <img src={logo} alt="Logo" className="h-6 w-auto" />
        </button>
        <ul className="flex space-x-6">
          {navigationConfig.map((item) => {
            const sectionId = item.path.replace('/', '') || 'home';
            return (
              <li key={item.path}>
                <button
                  onClick={() => scrollToSection(sectionId)}
                  className={`relative flex items-center transition-colors ${
                    location.pathname === item.path 
                      ? 'text-rose-500 dark:text-rose-400' 
                      : 'text-gray-950 dark:text-gray-50 hover:text-rose-500 dark:hover:text-rose-400'
                  }`}
                  onMouseEnter={() => setHoveredItem(item.path)}
                  onMouseLeave={() => setHoveredItem(null)}
                >
                  <motion.div
                    className="relative flex items-center gap-2 px-3 py-2 rounded-md"
                    animate={{
                      backgroundColor: hoveredItem === item.path || location.pathname === item.path
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
                        width: hoveredItem === item.path || location.pathname === item.path ? 'auto' : 0,
                        opacity: hoveredItem === item.path || location.pathname === item.path ? 1 : 0,
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
