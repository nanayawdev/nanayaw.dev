import React, { useState } from 'react';
import { LayoutGrid, X } from 'lucide-react';
import { NavLink, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { navigationConfig } from '../../config/navigation.jsx';

export default function MobileNavbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  return (
    <>
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40 md:hidden"
            onClick={() => setIsMenuOpen(false)}
          >
            <div className="fixed inset-x-4 bottom-24 bg-[#0f1a2c] rounded-2xl p-4">
              <ul className="space-y-2">
                {navigationConfig.map((item) => (
                  <li key={item.path}>
                    <NavLink
                      to={item.path}
                      onClick={() => setIsMenuOpen(false)}
                      className={({ isActive }) =>
                        `flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
                          isActive ? 'bg-[#34d134]/10 text-[#34d134]' : 'text-white hover:bg-white/10'
                        }`
                      }
                    >
                      {item.icon}
                      <span className="text-sm font-medium">{item.label}</span>
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <nav className="md:hidden fixed bottom-4 left-1/2 -translate-x-1/2 flex items-center justify-between w-[calc(100%-2rem)] px-4 py-3 rounded-full bg-[#0f1a2c] shadow-md z-50">
        <div className="flex w-full justify-between items-center">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2 rounded-full bg-[#1a2537]"
          >
            {isMenuOpen ? <X className="w-6 h-6 text-white" /> : <LayoutGrid className="w-6 h-6 text-white" />}
          </motion.button>
        </div>
      </nav>
    </>
  );
}
