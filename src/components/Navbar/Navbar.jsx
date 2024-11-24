import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import logo from '../../assets/logos/logogreen.png';
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
    <nav className="hidden md:flex fixed bottom-4 left-1/2 -translate-x-1/2 items-center justify-between w-auto max-w-4xl px-6 py-3 rounded-md bg-gray-900 dark:bg-gray-800 shadow-md z-50">
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
                    location.pathname === item.path ? 'text-[#00d72c] dark:text-[#00d72c]' : 'text-white hover:text-[#00d72c]'
                  }`}
                  onMouseEnter={() => setHoveredItem(item.path)}
                  onMouseLeave={() => setHoveredItem(null)}
                >
                  <motion.div
                    className="relative flex items-center gap-2 px-3 py-2 rounded-md"
                    animate={{
                      backgroundColor: hoveredItem === item.path || location.pathname === item.path
                        ? 'rgba(51, 206, 201, 0.1)'
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
