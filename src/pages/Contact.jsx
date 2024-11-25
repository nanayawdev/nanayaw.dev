import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { User, Mail, Phone, Building2, Wrench, MessageSquare } from "lucide-react";

const SERVICES = [
  { value: "ui-ux", label: "UI/UX" },
  { value: "web", label: "Web Design/Development" },
  { value: "mentorship", label: "Mentorship" },
  { value: "tutorials", label: "Tutorials/PDF" },
  { value: "collaboration", label: "Collaboration" }
];

const inputClasses = "w-full px-4 py-3 rounded-lg border text-gray-600 dark:text-gray-50 border-gray-200 dark:border-gray-800 bg-white/50 dark:bg-gray-900/50 focus:border-riptide-400 dark:focus:border-riptide-600 focus:outline-none h-[46px] pl-10";

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
              <div className="relative">
                <User className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input 
                  type="text" 
                  id="name" 
                  placeholder="Type your full name" 
                  className={inputClasses}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="email" className="text-gray-400">What's your email address?</label>
              <div className="relative">
                <Mail className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input 
                  type="email" 
                  id="email" 
                  placeholder="example@email.com" 
                  className={inputClasses}
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <label htmlFor="phone" className="text-gray-400">What's your phone number?</label>
              <div className="relative">
                <Phone className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input 
                  type="tel" 
                  id="phone" 
                  placeholder="+1 2222 333344" 
                  className={inputClasses}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="company" className="text-gray-400">What's your company/organization name?</label>
              <div className="relative">
                <Building2 className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input 
                  type="text" 
                  id="company" 
                  placeholder="Type your company/organization name" 
                  className={inputClasses}
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-gray-400">What services are you looking for?</label>
              <div className="relative">
                <Wrench className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 z-10" />
                <Select>
                  <SelectTrigger className="w-full px-4 py-3 rounded-lg border text-gray-600 dark:text-gray-50 border-gray-200 dark:border-gray-800 bg-white/50 dark:bg-gray-900/50 focus:border-riptide-400 dark:focus:border-riptide-600 focus:outline-none h-[46px] pl-10">
                    <SelectValue placeholder="Choose from a list here" />
                  </SelectTrigger>
                  <SelectContent>
                    {SERVICES.map(service => (
                      <SelectItem 
                        key={service.value} 
                        value={service.value}
                      >
                        {service.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="project" className="text-gray-400">Tell us about your project</label>
              <div className="relative">
                <MessageSquare className="w-5 h-5 absolute left-3 top-[14px] text-gray-400" />
                <textarea 
                  id="project" 
                  placeholder="Please type your project description"
                  rows="1"
                  className="w-full px-4 py-3 rounded-lg border text-gray-600 dark:text-gray-50 border-gray-200 dark:border-gray-800 bg-white/50 dark:bg-gray-900/50 focus:border-riptide-400 dark:focus:border-riptide-600 focus:outline-none resize-none min-h-[46px] pl-10"
                ></textarea>
              </div>
            </div>
          </div>

          <button 
            type="submit" 
            className="px-8 py-3 bg-riptide-500 hover:bg-riptide-600 text-white rounded-lg font-medium transition-colors h-[46px]"
          >
            SEND MESSAGE
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
