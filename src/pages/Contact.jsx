import { Badge } from "@/components/ui/badge";
import { ChevronDown } from 'lucide-react';

const Contact = () => {
  return (
    <div className="flex flex-col items-start justify-start pt-20 pb-8 px-4 max-w-4xl mx-auto">
      <Badge variant="outline" className="mb-6">
        GET IN TOUCH
      </Badge>

      <div className="space-y-6 w-full">
        <h1 className="text-6xl text-gray-900 dark:text-gray-100 font-medium leading-tight">
          Let's work <span className="text-riptide-500">together!</span>
        </h1>
        <p className="text-gray-400">
          Let us help you become even greater at what you do.
          <br />
          Fill out the following form and we will get back to you in the next minute.
        </p>

        <form className="grid grid-cols-1 gap-6 w-full mt-12">
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <label htmlFor="name" className="text-gray-400">What's your name?</label>
              <input 
                type="text" 
                id="name" 
                placeholder="Type your full name" 
                className="w-full px-4 py-3 rounded-lg border text-gray-600 dark:text-gray-50 border-gray-200 dark:border-gray-800 bg-white/50 dark:bg-gray-900/50 focus:border-riptide-400 dark:focus:border-riptide-600 focus:outline-none"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="email" className="text-gray-400">What's your email address?</label>
              <input 
                type="email" 
                id="email" 
                placeholder="example@email.com" 
                className="w-full px-4 py-3 rounded-lg border text-gray-600 dark:text-gray-50 border-gray-200 dark:border-gray-800 bg-white/50 dark:bg-gray-900/50 focus:border-riptide-400 dark:focus:border-riptide-600 focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <label htmlFor="phone" className="text-gray-400">What's your phone number?</label>
              <input 
                type="tel" 
                id="phone" 
                placeholder="+1 2222 333344" 
                className="w-full px-4 py-3 rounded-lg border text-gray-600 dark:text-gray-50 border-gray-200 dark:border-gray-800 bg-white/50 dark:bg-gray-900/50 focus:border-riptide-400 dark:focus:border-riptide-600 focus:outline-none"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="company" className="text-gray-400">What's your company/organization name?</label>
              <input 
                type="text" 
                id="company" 
                placeholder="Type your company/organization name" 
                className="w-full px-4 py-3 rounded-lg border text-gray-600 dark:text-gray-50 border-gray-200 dark:border-gray-800 bg-white/50 dark:bg-gray-900/50 focus:border-riptide-400 dark:focus:border-riptide-600 focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <label htmlFor="services" className="text-gray-400">What services are you looking for?</label>
              <div className="relative">
                <select 
                  id="services" 
                  className="w-full px-4 py-3 rounded-lg border text-gray-600 dark:text-gray-50 border-gray-200 dark:border-gray-800 bg-white/50 dark:bg-gray-900/50 focus:border-riptide-400 dark:focus:border-riptide-600 focus:outline-none appearance-none"
                >
                  <option value="">Choose from a list here</option>
                  <option value="ui-ux">UI/UX</option>
                  <option value="web">Web Design/Development</option>
                  <option value="mentorship">Mentorship</option>
                  <option value="tutorials">Tutorials/PDF</option>
                  <option value="collaboration">Collaboration</option>
                </select>
                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="project" className="text-gray-400">Tell us about your project</label>
              <textarea 
                id="project" 
                placeholder="Please type your project description"
                rows="1"
                className="w-full px-4 py-3 rounded-lg border text-gray-600 dark:text-gray-50 border-gray-200 dark:border-gray-800 bg-white/50 dark:bg-gray-900/50 focus:border-riptide-400 dark:focus:border-riptide-600 focus:outline-none resize-none min-h-[46px] overflow-hidden"
              ></textarea>
            </div>
          </div>

          <button 
            type="submit" 
            className="px-8 py-3 bg-riptide-500 hover:bg-riptide-600 text-white rounded-lg font-medium transition-colors"
          >
            SEND MESSAGE
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
