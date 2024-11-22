import { House, User, FolderKanban, BookOpen, Mail, Briefcase, FileText, Video, Star } from 'lucide-react';
import Home from '../pages/Home';
import About from '../pages/About';
import Blog from '../pages/Blog';
import Contact from '../pages/Contact';
import Expertise from '../pages/Expertise';
import Portfolio from '../pages/Portfolio';
import Resume from '../pages/Resume';
import Services from '../pages/Services';
import Testimonial from '../pages/Testimonial';

export const navigationConfig = [
  { path: '/', label: 'Home', icon: <House className="w-5 h-5" />, component: Home },
  { path: '/about', label: 'About', icon: <User className="w-5 h-5" />, component: About },
  { path: '/portfolio', label: 'Portfolio', icon: <FolderKanban className="w-5 h-5" />, component: Portfolio },
  { path: '/expertise', label: 'Expertise', icon: <Briefcase className="w-5 h-5" />, component: Expertise },
  { path: '/resume', label: 'Resume', icon: <FileText className="w-5 h-5" />, component: Resume },
  { path: '/services', label: 'Services', icon: <Video className="w-5 h-5" />, component: Services },
  { path: '/blog', label: 'Blog', icon: <BookOpen className="w-5 h-5" />, component: Blog },
  { path: '/testimonial', label: 'Testimonial', icon: <Star className="w-5 h-5" />, component: Testimonial },
  { path: '/contact', label: 'Contact', icon: <Mail className="w-5 h-5" />, component: Contact },
]; 