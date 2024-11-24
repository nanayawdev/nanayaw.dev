const BlogPost = () => {
  return (
    <article className="max-w-md bg-black text-white rounded-lg overflow-hidden">
      <div className="relative">
        <img 
          src="/path-to-your-image.jpg" 
          alt="Glucose monitoring" 
          className="w-full h-48 object-cover"
        />
        <div className="p-6">
          <h2 className="text-xl font-bold mb-2">
            How Monitoring Glucose Levels Can Improve Skin Health
          </h2>
          <p className="text-gray-300 mb-4">
            Real-time glucose monitoring shows deeper insight into metabolic signals monitoring and provides data into the underlying physiology of overall skin and health.
          </p>
          <button className="bg-white text-black px-4 py-2 rounded-md hover:bg-gray-200 transition">
            Read more
          </button>
        </div>
      </div>
    </article>
  );
};

export default BlogPost; 