import React, { useState, useEffect } from 'react';
import { 
  NotebookPen, 
  FolderPlus, 
  LogOut, 
  LogIn, 
  Github, 
  Instagram, 
  Twitter, 
  Dribbble, 
  Linkedin
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import profileImage from '@/assets/images/ny.jpg';
import { LetsTalkButton } from '@/components/ui/lets-talk-button';
import { supabase } from '@/lib/supabase';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { LogoutWarningModal } from "@/components/LogoutWarningModal";
import { toast } from "sonner";

const socialLinks = [
  {
    icon: <Instagram className="w-5 h-5" />,
    href: "https://instagram.com/nanayawdev",
    label: "Instagram"
  },
  {
    icon: <Twitter className="w-5 h-5" />,
    href: "https://twitter.com/nycre8ivestudio",
    label: "Twitter"
  },
  {
    icon: <Linkedin className="w-5 h-5" />,
    href: "https://linkedin.com/in/nanayawisrael",
    label: "LinkedIn"
  },
  {
    icon: <Github className="w-5 h-5" />,
    href: "https://github.com/nanayawdev",
    label: "Github"
  }
];

const menuItems = [
  {
    icon: <NotebookPen className="w-4 h-4" />,
    name: "Add Post",
    link: '/admin'
  },
  {
    icon: <FolderPlus className="w-4 h-4" />,
    name: "Add Project",
    link: '/portfolio-admin'
  }
];

export default function ProfileCard() {
  const navigate = useNavigate();
  const [showLogoutWarning, setShowLogoutWarning] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [session, setSession] = useState(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleLogoutClick = () => {
    setShowLogoutWarning(true);
  };

  const handleLogoutConfirm = async () => {
    setIsLoading(true);
    try {
      await supabase.auth.signOut();
      toast.success("Logged out successfully");
      // Stay on the current page
    } catch (error) {
      console.error('Error logging out:', error);
      toast.error("Error logging out");
    } finally {
      setIsLoading(false);
      setShowLogoutWarning(false);
    }
  };

  const checkAuth = async (e, path) => {
    e.preventDefault();
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      navigate('/signin');
    } else {
      navigate(path);
    }
  };

  return (
    <div className="flex-grow flex items-start justify-center px-2 sm:px-4 py-4 sm:py-8 lg:pt-28">
      <div className="w-full max-w-[320px] sm:max-w-[360px] lg:max-w-[380px] xl:max-w-[320px] dark:bg-gray-900 text-gray-900 dark:text-gray-100 border border-gray-200 dark:border-gray-700 p-4 sm:p-6 rounded-xl">
        <div className="flex items-center justify-between w-full sm:w-60 mx-auto">
          <h1 className="text-2xl sm:text-3xl font-medium text-gray-900 dark:text-gray-100">
            NY Dev
          </h1>
          <DropdownMenu>
            <DropdownMenuTrigger className="focus:outline-none">
              <Avatar className="h-8 w-8">
                <AvatarFallback 
                  className={
                    session 
                      ? "bg-rose-600 text-white text-sm" 
                      : "bg-rose-500 text-white text-xs font-medium"
                  }
                >
                  {session ? "NY" : "v1.0"}
                </AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-64">
              {session ? (
                <>
                  <div className="grid grid-cols-2 gap-2 p-2">
                    {menuItems.map((item) => (
                      <DropdownMenuItem
                        key={item.name}
                        onClick={(e) => checkAuth(e, item.link)}
                        className="cursor-pointer flex flex-col items-center justify-center p-2 h-24"
                      >
                        <div className="h-8 w-8 flex items-center justify-center bg-gray-100 dark:bg-gray-800 rounded-lg mb-2">
                          {item.icon}
                        </div>
                        <span className="text-xs text-center">{item.name}</span>
                      </DropdownMenuItem>
                    ))}
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem 
                    onClick={handleLogoutClick} 
                    className="cursor-pointer text-red-600 dark:text-red-400"
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Logout
                  </DropdownMenuItem>
                </>
              ) : (
                <DropdownMenuItem 
                  onClick={() => navigate('/signin')} 
                  className="cursor-pointer text-blue-600 dark:text-blue-400"
                >
                  <LogIn className="w-4 h-4 mr-2" />
                  Login
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="my-4 sm:my-6">
          <img
            src={profileImage}
            alt="Nana Yaw Dev's profile"
            className="w-40 h-40 sm:w-48 sm:h-48 lg:w-60 lg:h-60 mx-auto rounded-lg object-cover"
          />
        </div>

        <div className="text-center space-y-1">
          <p className="text-sm sm:text-base text-gray-500 dark:text-gray-400">nanayawisrael@gmail.com</p>
          <p className="text-xs text-gray-500 dark:text-gray-400">Based in Accra, GH</p>
        </div>

        <div className="flex justify-center space-x-3 sm:space-x-4 mt-4 sm:mt-6">
          {socialLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 dark:text-gray-400 hover:text-rose-500 dark:hover:text-blue-400 transition-colors duration-200"
              aria-label={link.label}
            >
              {link.icon}
            </a>
          ))}
        </div>

        <div className="mt-4 sm:mt-6 flex justify-center">
          <LetsTalkButton />
        </div>

        <div className="text-center text-xs mt-4 sm:mt-6 text-gray-500 dark:text-gray-400">
          <p>© {new Date().getFullYear()} All Rights Reserved</p>
        </div>
      </div>

      <LogoutWarningModal
        isOpen={showLogoutWarning}
        onClose={() => setShowLogoutWarning(false)}
        onConfirm={handleLogoutConfirm}
        isLoading={isLoading}
      />
    </div>
  );
}
