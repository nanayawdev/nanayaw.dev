import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '../contexts/ThemeContext';
import Navbar from '../components/Navbar/Navbar';
import MobileNavbar from '../components/Navbar/MobileNavbar';
import ThemeToggle from '../components/ThemeToggle/ThemeToggle';
import ProfileCard from '../components/ProfileCard/ProfileCard';
import { navigationConfig } from '../config/navigationConfig';
import { footerConfig } from '../config/footerConfig';
import Footer from '../components/Footer/Footer';

const MainLayout = () => {
  return (
    <ThemeProvider>
      <div className="min-h-screen flex flex-col dark:bg-gray-900 dark:text-white">
        <div className="fixed top-4 right-4 z-50">
          <ThemeToggle />
        </div>
        <Navbar />
        <MobileNavbar />
        <main className="flex-1 w-full mx-auto px-4 py-24 md:py-16">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Left Side - Profile Card */}
            <div className="md:w-[420px] shrink-0">
              <div className="sticky top-20 transition-all duration-300">
                <ProfileCard />
                <div className="mt-4">
                  <Footer />
                </div>
              </div>
            </div>
            
            {/* Right Side - Page Content */}
            <div className="flex-1 md:ml-4">
              <Routes>
                {[...navigationConfig, ...footerConfig].map(({ path, component: Component }) => (
                  <Route key={path} path={path} element={<Component />} />
                ))}
              </Routes>
            </div>
          </div>
        </main>
      </div>
    </ThemeProvider>
  );
};

export default MainLayout;
