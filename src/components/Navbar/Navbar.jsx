import React, { useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import logo from '../../assets/logos/logo.png';
import { navigationConfig } from '../../config/navigation.jsx';

export default function Navbar() {
  const [hoveredItem, setHoveredItem] = useState(null);
  const location = useLocation();

  return (
    <nav className="hidden md:flex fixed bottom-4 left-1/2 -translate-x-1/2 items-center justify-between w-auto max-w-4xl px-6 py-3 rounded-full bg-riptide-950 shadow-md z-50">
      <div className="flex items-center gap-8">
        <Link to="/" className="flex items-center">
          <img src={logo} alt="Logo" className="h-8 w-auto" />
        </Link>
        <ul className="flex space-x-6">
          {navigationConfig.map((item) => (
            <li key={item.path}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `relative flex items-center transition-colors ${
                    isActive ? 'text-riptide-400' : 'text-white hover:text-riptide-400'
                  }`
                }
                onMouseEnter={() => setHoveredItem(item.path)}
                onMouseLeave={() => setHoveredItem(null)}
              >
                <motion.div
                  className="relative flex items-center gap-2 px-3 py-2 rounded-full"
                  animate={{
                    backgroundColor: hoveredItem === item.path || location.pathname === item.path
                      ? 'rgba(51, 206, 201, 0.1)'
                      : 'rgba(0, 0, 0, 0)',
                  }}
                  transition={{ duration: 0.2 }}
                >
                  {item.icon}
                  <motion.span
                    className="text-sm font-medium"
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
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
