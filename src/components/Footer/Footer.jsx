import { Link } from 'react-router-dom';
import { footerConfig } from '../../config/footerConfig';

const Footer = () => {
  return (
    <footer className="w-full py-4 shrink-0">
      <div className="max-w-[320px] mx-auto px-6">
        <div className="flex space-x-4 text-sm text-gray-500 dark:text-gray-400 py-4">
          {footerConfig.map(({ path, label }) => (
            <Link 
              key={path}
              to={path} 
              className="hover:text-gray-700 dark:hover:text-riptide-300"
            >
              {label}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
