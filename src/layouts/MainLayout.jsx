import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ThemeProvider } from '../contexts/ThemeContext';
import Navbar from '../components/Navbar/Navbar';
import MobileNavbar from '../components/Navbar/MobileNavbar';
import ThemeToggle from '../components/ThemeToggle/ThemeToggle';
import ProfileCard from '../components/ProfileCard/ProfileCard';
import { navigationConfig } from '../config/navigationConfig';
import { footerConfig } from '../config/footerConfig';
import Footer from '../components/Footer/Footer';
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
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const sectionId = entry.target.id;
            // Map section IDs to routes
            const routeMap = {
              'home': '/',
              'about': '/about',
              'resume': '/resume',
              'portfolio': '/portfolio',
              'expertise': '/expertise',
              'services': '/services',
              'blog': '/blog',
              'testimonial': '/testimonial',
              'contact': '/contact'
            };
            
            if (routeMap[sectionId]) {
              navigate(routeMap[sectionId], { replace: true });
            }
          }
        });
      },
      {
        threshold: 0.5,
        rootMargin: '-100px 0px'
      }
    );

    // Observe all sections
    const sections = document.querySelectorAll('[id]');
    sections.forEach((section) => observer.observe(section));

    return () => {
      sections.forEach((section) => observer.unobserve(section));
    };
  }, [navigate]);

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
              <div id="home">
                <Home />
              </div>
              <div id="about">
                <About />
              </div>
              <div id="resume">
                <Resume />
              </div>
              <div id="portfolio">
                <Portfolio />
              </div>
              <div id="expertise">
                <Expertise />
              </div>
              <div id="services">
                <Services />
              </div>
              <div id="blog">
                <Blog />
              </div>
              <div id="testimonial">
                <Testimonial />
              </div>
              <div id="contact">
                <Contact />
              </div>
            </div>
          </div>
        </main>
      </div>
    </ThemeProvider>
  );
};

export default MainLayout;
