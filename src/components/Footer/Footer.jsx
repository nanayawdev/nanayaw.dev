import { Link } from 'react-router-dom';
import { footerConfig } from '../../config/footerConfig';

const Footer = () => {
  return (
    <footer className="w-full py-4">
      <div className="flex justify-center space-x-4 text-sm text-gray-500 dark:text-gray-400 pb-20 pt-20">
        {footerConfig.map(({ path, label }) => (
          <Link 
            key={path}
            to={path} 
            className="hover:text-gray-700 dark:hover:text-gray-300"
          >
            {label}
          </Link>
        ))}
      </div>
    </footer>
  );
};

export default Footer;
