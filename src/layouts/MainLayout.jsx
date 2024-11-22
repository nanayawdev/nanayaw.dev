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
      <div className="h-screen overflow-hidden flex flex-col dark:bg-gray-900 dark:text-white">
        <div className="fixed top-4 right-4 z-50">
          <ThemeToggle />
        </div>
        <Navbar />
        <MobileNavbar />
        <main className="flex-1 w-full mx-auto px-4 py-24 md:py-16">
          <div className="flex flex-col md:flex-row gap-4 h-full">
            {/* Left Side - Static Profile Card */}
            <aside className="md:w-[420px] shrink-0 overflow-hidden">
              <div className="h-full">
                <ProfileCard />
                <div className="mt-4">
                  <Footer />
                </div>
              </div>
            </aside>
            
            {/* Right Side - Scrollable Content */}
            <div className="flex-1 md:ml-4 overflow-y-auto max-h-[calc(100vh-12rem)]">
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
