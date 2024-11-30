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
      <article className="relative overflow-hidden rounded-xl transition-all duration-300 hover:scale-[1.02]">
        <div className="relative w-full h-[300px]">
          <img
            src={imageUrl}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            onError={(e) => {
              e.target.style.display = 'none';
            }}
          />
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent transition-colors duration-300 group-hover:from-riptide-900/80 group-hover:via-riptide-800/50" />
          
          {/* Content overlay */}
          <div className="absolute inset-0 p-6 flex flex-col justify-end">
            <Badge variant="outline" className="w-fit mb-4 bg-white/10 text-white backdrop-blur-sm border-none">
              {category}
            </Badge>

            <h2 className="text-xl font-semibold text-white mb-2 line-clamp-2">
              {title}
            </h2>
            
            <p className="text-gray-200 text-sm mb-4 line-clamp-2">
              {excerpt}
            </p>

            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-200">
                {formattedDate}
              </span>
              <span className="text-sm font-medium text-riptide-400">
                Read More
              </span>
            </div>
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