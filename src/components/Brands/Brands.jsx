// Update these imports with tech stack icons
import react from "../../assets/tech/react.svg";
import typescript from "../../assets/tech/typescript.svg";
import javascript from "../../assets/tech/javascript.svg";
import nodejs from "../../assets/tech/nodejs.svg";
import tailwind from "../../assets/tech/tailwind.svg";
import mongodb from "../../assets/tech/mongodb.svg";
import git from "../../assets/tech/git.svg";
import firebase from "../../assets/tech/firebase.svg";

const Brands = () => {
  return (
    <div className="mt-20">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-center text-gray-900 dark:text-gray-100 mb-12">
          TECH STACK & TOOLS
        </h2>
      </div>
      
      {/* Rest of the structure remains the same, just update the image sources and alt text */}
      <div className="w-screen relative left-1/2 right-1/2 -mx-[50vw]">
        <div className="max-w-4xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 items-center">
            <img src={react} alt="React" className="w-auto h-12 md:h-16 opacity-50 hover:opacity-100 transition-opacity" />
            <img src={typescript} alt="TypeScript" className="w-auto h-12 md:h-16 opacity-50 hover:opacity-100 transition-opacity" />
            <img src={javascript} alt="JavaScript" className="w-auto h-12 md:h-16 opacity-50 hover:opacity-100 transition-opacity" />
            <img src={nodejs} alt="Node.js" className="w-auto h-12 md:h-16 opacity-50 hover:opacity-100 transition-opacity" />
            <img src={tailwind} alt="Tailwind CSS" className="w-auto h-12 md:h-16 opacity-50 hover:opacity-100 transition-opacity" />
            <img src={mongodb} alt="MongoDB" className="w-auto h-12 md:h-16 opacity-50 hover:opacity-100 transition-opacity" />
            <img src={git} alt="Git" className="w-auto h-12 md:h-16 opacity-50 hover:opacity-100 transition-opacity" />
            <img src={firebase} alt="Firebase" className="w-auto h-12 md:h-16 opacity-50 hover:opacity-100 transition-opacity" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Brands; 