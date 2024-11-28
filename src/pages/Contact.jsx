import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { User, Mail, Phone, Building2, Wrench, MessageSquare } from "lucide-react";
import { supabase } from "@/lib/supabase";

const SERVICES = [
  { value: "ui-ux", label: "UI/UX" },
  { value: "web", label: "Web Design/Development" },
  { value: "mentorship", label: "Mentorship" },
  { value: "tutorials", label: "Tutorials/PDF" },
  { value: "collaboration", label: "Collaboration" }
];

const inputClasses = "w-full px-4 py-3 rounded-lg border text-gray-600 dark:text-gray-50 border-gray-200 dark:border-gray-800 bg-white/50 dark:bg-gray-900/50 focus:border-riptide-400 dark:focus:border-riptide-600 focus:outline-none h-[46px] pl-10";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    service: "",
    project: ""
  });
  const [showSuccess, setShowSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    });
  };

  const handleServiceChange = (value) => {
    setFormData({
      ...formData,
      service: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    // Validate required fields
    const requiredFields = {
      name: 'Name',
      email: 'Email',
      phone: 'Phone',
      service: 'Service'
    };

    const emptyFields = Object.entries(requiredFields)
      .filter(([key]) => !formData[key])
      .map(([_, label]) => label);

    if (emptyFields.length > 0) {
      setError(`Please fill in the required fields: ${emptyFields.join(', ')}`);
      return;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError('Please enter a valid email address');
      return;
    }

    // Validate phone number format
    const phoneRegex = /^\+?[1-9]\d{1,14}$/;
    if (!phoneRegex.test(formData.phone.replace(/\s+/g, ''))) {
      setError('Please enter a valid phone number');
      return;
    }

    setIsSubmitting(true);

    try {
      const { data, error: supabaseError } = await supabase
        .from('contact_submissions')
        .insert([
          {
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            company: formData.company || null,
            service: formData.service,
            project: formData.project || null,
            status: 'new'
          }
        ]);

      if (supabaseError) {
        console.error('Supabase error details:', supabaseError);
        throw new Error(supabaseError.message);
      }

      setShowSuccess(true);
      
      setFormData({
        name: "",
        email: "",
        phone: "",
        company: "",
        service: "",
        project: ""
      });
    } catch (error) {
      console.error('Full error object:', error);
      setError(error.message || 'Failed to submit form. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col items-start justify-start pt-16 sm:pt-20 lg:pt-28 pb-8 px-4 max-w-4xl mx-auto">
      <Badge variant="outline" className="mb-4 sm:mb-6">
        GET IN TOUCH
      </Badge>

      <div className="space-y-4 sm:space-y-6 w-full">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl text-gray-900 dark:text-gray-100 font-medium leading-tight">
          Let's work <span className="text-riptide-500">together!</span>
        </h1>
        <p className="text-gray-400 text-sm sm:text-base">
          Let us help you become even greater at what you do.
          <br className="hidden sm:block" />
          Fill out the following form and we will get back to you in the next minute.
        </p>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4 sm:gap-6 w-full mt-8 sm:mt-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm sm:text-base text-gray-400">
                What's your name? <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <User className="w-4 sm:w-5 h-4 sm:h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input 
                  type="text" 
                  id="name" 
                  placeholder="Type your full name" 
                  className={inputClasses}
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="email" className="text-sm sm:text-base text-gray-400">
                What's your email address? <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Mail className="w-4 sm:w-5 h-4 sm:h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input 
                  type="email" 
                  id="email" 
                  placeholder="example@email.com" 
                  className={inputClasses}
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            <div className="space-y-2">
              <label htmlFor="phone" className="text-sm sm:text-base text-gray-400">
                What's your phone number? <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Phone className="w-4 sm:w-5 h-4 sm:h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input 
                  type="tel" 
                  id="phone" 
                  placeholder="+1 2222 333344" 
                  className={inputClasses}
                  value={formData.phone}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="company" className="text-sm sm:text-base text-gray-400">
                What's your company/organization name?
              </label>
              <div className="relative">
                <Building2 className="w-4 sm:w-5 h-4 sm:h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input 
                  type="text" 
                  id="company" 
                  placeholder="Type your company name" 
                  className={inputClasses}
                  value={formData.company}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            <div className="space-y-2">
              <label className="text-sm sm:text-base text-gray-400">
                What services are you looking for? <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Wrench className="w-4 sm:w-5 h-4 sm:h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 z-10" />
                <Select value={formData.service} onValueChange={handleServiceChange}>
                  <SelectTrigger className={inputClasses}>
                    <SelectValue placeholder="Choose from a list here" />
                  </SelectTrigger>
                  <SelectContent>
                    {SERVICES.map(service => (
                      <SelectItem key={service.value} value={service.value}>
                        {service.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="project" className="text-sm sm:text-base text-gray-400">
                Tell us about your project
              </label>
              <div className="relative">
                <MessageSquare className="w-4 sm:w-5 h-4 sm:h-5 absolute left-3 top-[14px] text-gray-400" />
                <textarea 
                  id="project" 
                  placeholder="Please type your project description"
                  rows="1"
                  className={`${inputClasses} resize-none min-h-[46px]`}
                  value={formData.project}
                  onChange={handleChange}
                ></textarea>
              </div>
            </div>
          </div>

          {error && (
            <p className="text-red-500 text-xs sm:text-sm">{error}</p>
          )}

          <button 
            type="submit" 
            disabled={isSubmitting}
            className="px-6 sm:px-8 py-3 bg-riptide-500 hover:bg-riptide-600 text-white rounded-lg font-medium transition-colors h-[46px] disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
          >
            {isSubmitting ? 'SENDING...' : 'SEND MESSAGE'}
          </button>
        </form>
      </div>

      <Dialog open={showSuccess} onOpenChange={setShowSuccess}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Message Sent Successfully!</DialogTitle>
          </DialogHeader>
          <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base">
            Thank you for reaching out. We'll get back to you shortly!
          </p>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Contact;
