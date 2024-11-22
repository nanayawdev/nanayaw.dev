import React from 'react';
import { Mail, Instagram, Twitter, Dribbble, Github } from "lucide-react";
import profileImage from '@/assets/images/ny.jpg';
import { LetsTalkButton } from '@/components/ui/lets-talk-button';

const socialLinks = [
  {
    icon: <Instagram className="w-5 h-5" />,
    href: "https://instagram.com",
    label: "Instagram"
  },
  {
    icon: <Twitter className="w-5 h-5" />,
    href: "https://twitter.com",
    label: "Twitter"
  },
  {
    icon: <Dribbble className="w-5 h-5" />,
    href: "https://dribbble.com",
    label: "Dribbble"
  },
  {
    icon: <Github className="w-5 h-5" />,
    href: "https://github.com",
    label: "Github"
  }
];

export default function ProfileCard() {
  return (
    <div className="pt-28 pb-8 px-4">
      <div className="max-w-[350px] mx-auto dark:bg-gray-900 text-gray-900 dark:text-gray-100 border border-gray-200 dark:border-gray-700 p-8 rounded-xl">
        <div className="flex items-center justify-between w-60 mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
            NY Dev
          </h1>
          <span className="inline-flex items-center rounded-full bg-blue-100 dark:bg-blue-900 px-2.5 py-0.5 text-xs font-medium text-blue-800 dark:text-blue-300">
            Web Developer
          </span>
        </div>

        <div className="my-6">
          <img
            src={profileImage}
            alt="Nana Yaw Dev's profile"
            className="w-60 h-60 mx-auto rounded-lg object-cover"
          />
        </div>

        <div className="text-center space-y-1">
          <p className="text-gray-500 dark:text-gray-400">nana@yawdev.com</p>
          <p className="text-gray-500 dark:text-gray-400 text-xs">Based in Accra, GH</p>
        </div>

        <div className="flex justify-center space-x-4 mt-6">
          {socialLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 transition-colors duration-200"
              aria-label={link.label}
            >
              {link.icon}
            </a>
          ))}
        </div>

        <div className="mt-6 flex justify-center">
          <LetsTalkButton />
        </div>

        <div className="text-center text-xs mt-6 text-gray-400">
          <p>© {new Date().getFullYear()} Nana Yaw Dev. All Rights Reserved</p>
        </div>
      </div>
    </div>
  );
}
