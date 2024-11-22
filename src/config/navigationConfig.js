import Home from '../pages/Home';
import About from '../pages/About';
import Blog from '../pages/Blog';
import Contact from '../pages/Contact';
import Expertise from '../pages/Expertise';
import Portfolio from '../pages/Portfolio';
import Resume from '../pages/Resume';
import Services from '../pages/Services';
import Testimonial from '../pages/Testimonial';
import Terms from '../pages/Terms';
import Privacy from '../pages/Privacy';
import Cookies from '../pages/Cookies';

export const navigationConfig = [
  {
    path: '/',
    component: Home,
  },
  {
    path: '/about',
    component: About,
  },
  {
    path: '/blog',
    component: Blog,
  },
  {
    path: '/contact',
    component: Contact,
  },
  {
    path: '/expertise',
    component: Expertise,
  },
  {
    path: '/portfolio',
    component: Portfolio,
  },
  {
    path: '/resume',
    component: Resume,
  },
  {
    path: '/services',
    component: Services,
  },
  {
    path: '/testimonial',
    component: Testimonial,
  },
  {
    path: '/terms',
    component: Terms,
  },
  {
    path: '/privacy',
    component: Privacy,
  },
  {
    path: '/cookies',
    component: Cookies,
  },
];
