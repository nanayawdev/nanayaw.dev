import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <div className="flex justify-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
      <Link to="/terms" className="hover:text-gray-700 dark:hover:text-gray-300">Terms</Link>
      <Link to="/privacy" className="hover:text-gray-700 dark:hover:text-gray-300">Privacy</Link>
      <Link to="/cookies" className="hover:text-gray-700 dark:hover:text-gray-300">Cookies</Link>
    </div>
  );
};

export default Footer;
