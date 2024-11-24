// Add these imports at the top
import blb from "../../assets/brands/card.png"; // You'll need to add your brand images
import christopher from "../../assets/brands/apple-pay.png";
import serenity from "../../assets/brands/cc-visa.png";
import artchive from "../../assets/brands/discord.svg";
import neuton from "../../assets/brands/google-pay.png";
import papillon from "../../assets/brands/nike.png";
import goodhabits from "../../assets/brands/stripexl.png";
import creative from "../../assets/brands/visaxl.png";

const Brands = () => {
  return (
    <div className="mt-20">
      {/* Heading stays within testimonial width */}
      <div className="max-w-4xl mx-auto">
        <h2 className="text-center text-gray-900 dark:text-gray-100 mb-12">
          WORK WITH 60+ BRANDS WORLDWIDE
        </h2>
      </div>
      
      {/* Brand grid starts from the left edge and extends right */}
      <div className="w-screen relative left-1/2 right-1/2 -mx-[50vw]">
        <div className="max-w-4xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 items-center">
            <img src={blb} alt="BLB" className="w-auto h-12 md:h-16 opacity-50 hover:opacity-100 transition-opacity" />
            <img src={christopher} alt="Christopher Willis" className="w-auto h-12 md:h-16 opacity-50 hover:opacity-100 transition-opacity" />
            <img src={serenity} alt="Serenity Hotel" className="w-auto h-12 md:h-16 opacity-50 hover:opacity-100 transition-opacity" />
            <img src={artchive} alt="Artchive" className="w-auto h-12 md:h-16 opacity-50 hover:opacity-100 transition-opacity" />
            <img src={neuton} alt="Neuton Interactive" className="w-auto h-12 md:h-16 opacity-50 hover:opacity-100 transition-opacity" />
            <img src={papillon} alt="Papillon" className="w-auto h-12 md:h-16 opacity-50 hover:opacity-100 transition-opacity" />
            <img src={goodhabits} alt="Good Habits" className="w-auto h-12 md:h-16 opacity-50 hover:opacity-100 transition-opacity" />
            <img src={creative} alt="Creative Space" className="w-auto h-12 md:h-16 opacity-50 hover:opacity-100 transition-opacity" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Brands; 