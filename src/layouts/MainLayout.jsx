import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ThemeProvider } from '../contexts/ThemeContext';
import Navbar from '../components/Navbar/Navbar';
import MobileNavbar from '../components/Navbar/MobileNavbar';
import ThemeToggle from '../components/ThemeToggle/ThemeToggle';
import ProfileCard from '../components/ProfileCard/ProfileCard';
import Home from '../pages/Home';
import About from '../pages/About';
import Resume from '../pages/Resume';
import Portfolio from '../pages/Portfolio';
import Expertise from '../pages/Expertise';
import Services from '../pages/Services';
import Blog from '../pages/Blog';
import Testimonial from '../pages/Testimonial';
import Contact from '../pages/Contact';

const MainLayout = () => {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-white dark:bg-gray-900 dark:text-white">
        <div className="fixed top-4 right-4 z-50">
          <ThemeToggle />
        </div>
        <Navbar />
        <MobileNavbar />
        
        <main className="container mx-auto px-4 py-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Left Side - Profile Section */}
            <aside className="w-full lg:w-[420px] xl:w-[440px] 2xl:w-[480px] lg:-ml-24 xl:-ml-32 2xl:-ml-48">
              <div className="lg:sticky lg:top-8">
                <div className="flex flex-col">
                  <ProfileCard />
                </div>
              </div>
            </aside>
            
            {/* Right Side - Content */}
            <div className="flex-1 max-w-3xl lg:ml-24 xl:ml-32 2xl:ml-48">
              <div className="space-y-12 sm:space-y-16 pb-32">
                <section id="home"><Home /></section>
                <section id="about"><About /></section>
                <section id="portfolio"><Portfolio /></section>
                <section id="services"><Services /></section>
                <section id="expertise"><Expertise /></section>
                <section id="resume"><Resume /></section>
                <section id="testimonial"><Testimonial /></section>
                <section id="blog"><Blog /></section>
                <section id="contact"><Contact /></section>
              </div>
            </div>
          </div>
        </main>
      </div>
    </ThemeProvider>
  );
};

export default MainLayout;
