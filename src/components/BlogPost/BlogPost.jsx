import { Helmet } from 'react-helmet-async';
import { Badge } from "@/components/ui/badge";
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const BlogPost = ({ category, title, excerpt, slug, imageUrl }) => {
  return (
    <>
      <Helmet>
        <title>{title} | Your Site Name</title>
        <meta name="description" content={excerpt} />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="article" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={excerpt} />
        <meta property="og:image" content={imageUrl} />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={excerpt} />
        <meta name="twitter:image" content={imageUrl} />

        {/* Additional SEO tags */}
        <meta name="keywords" content={`${category}, blog, your-keywords`} />
        <link rel="canonical" href={`${window.location.origin}/blog/${slug}`} />

        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            "headline": title,
            "image": imageUrl,
            "description": excerpt,
            "author": {
              "@type": "Person",
              "name": "Your Name"
            },
            "datePublished": "YYYY-MM-DD",
            "mainEntityOfPage": {
              "@type": "WebPage",
              "@id": `${window.location.origin}/blog/${slug}`
            }
          })}
        </script>

        {/* Article specific metadata */}
        <meta property="article:published_time" content="YYYY-MM-DD" />
        <meta property="article:author" content="Your Name" />
        <meta property="article:section" content={category} />
        
        {/* Additional social media tags */}
        <meta property="og:site_name" content="Your Site Name" />
        <meta name="twitter:creator" content="@yourtwitter" />
      </Helmet>

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
              
              <p className="text-gray-200 text-sm line-clamp-2">
                {excerpt}
              </p>
            </div>
          </div>
        </article>
      </Link>
    </>
  );
};

BlogPost.propTypes = {
  category: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  excerpt: PropTypes.string.isRequired,
  slug: PropTypes.string.isRequired,
  imageUrl: PropTypes.string
};

export default BlogPost; 