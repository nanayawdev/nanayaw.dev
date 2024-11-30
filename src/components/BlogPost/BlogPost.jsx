import { Badge } from "@/components/ui/badge";
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const BlogPost = ({ category, title, excerpt, slug, date, imageUrl }) => {
  const formattedDate = new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <Link to={`/blog/${slug}`} className="group block">
      <article className="border border-gray-200 dark:border-gray-800 rounded-lg overflow-hidden transition-colors hover:border-riptide-500 dark:hover:border-riptide-500">
        {imageUrl && (
          <div className="aspect-[16/9] w-full overflow-hidden">
            <img 
              src={imageUrl} 
              alt={title}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              onError={(e) => {
                e.target.style.display = 'none';
              }}
            />
          </div>
        )}
        
        <div className="p-6 flex flex-col h-[250px]">
          <Badge variant="outline" className="w-fit mb-4">
            {category}
          </Badge>

          <div className="flex-grow space-y-2">
            <h2 className="text-[20px] font-medium text-gray-900 dark:text-gray-100 group-hover:text-gray-600 dark:group-hover:text-gray-400 line-clamp-2">
              {title}
            </h2>
            <p className="text-gray-500 dark:text-gray-400 line-clamp-2">
              {excerpt}
            </p>
          </div>

          <div className="flex items-center justify-between mt-4">
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {formattedDate}
            </span>
            <span className="text-sm font-medium text-riptide-500 group-hover:text-riptide-400">
              Read More
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
};

BlogPost.propTypes = {
  category: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  excerpt: PropTypes.string.isRequired,
  slug: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  imageUrl: PropTypes.string
};

export default BlogPost; 