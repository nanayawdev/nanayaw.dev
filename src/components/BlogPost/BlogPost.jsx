import { Badge } from "@/components/ui/badge";
import { ArrowRight } from "lucide-react";
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const BlogPost = ({ category, title, excerpt, slug, date }) => {
  return (
    <Link to={`/blog/${slug}`} className="block">
      <article className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white/50 dark:bg-gray-900/50 p-6 hover:border-riptide-400 dark:hover:border-riptide-600 transition-colors">
        <Badge variant="outline" className="mb-4">
          {category}
        </Badge>
        <h2 className="text-xl font-bold mb-3 text-gray-900 dark:text-gray-100">
          {title}
        </h2>
        <p className="text-gray-400 mb-4">
          {excerpt}
        </p>
        <div className="flex items-center justify-between">
          <button 
            className="text-riptide-500 hover:text-riptide-600 transition-colors font-medium inline-flex items-center gap-2"
            onClick={() => window.location.href = `/blog/${slug}`}
          >
            Read more
            <ArrowRight className="w-4 h-4" />
          </button>
          <span className="text-sm text-gray-400">{date}</span>
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
  date: PropTypes.string.isRequired
};

export default BlogPost; 