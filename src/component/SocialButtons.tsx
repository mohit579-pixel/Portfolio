import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { FaLinkedinIn, FaGithub, FaTwitter } from 'react-icons/fa';
import gsap from 'gsap';
import { GoDownload } from "react-icons/go";
import { RootState } from '../redux/store';

const SocialButtons: React.FC = () => {
  const buttonsRef = useRef<HTMLDivElement>(null);
  const isSidebarOpen = useSelector((state: RootState) => state.sidebar.isSidebarOpen);

  useEffect(() => {
    const buttons = buttonsRef.current?.children;
    if (buttons && !isSidebarOpen) {
      gsap.fromTo(
        buttons,
        { y: -100, opacity: 0 },
        {
          delay: 4.2,
          y: 0,
          opacity: 1,
          stagger: 0.2,
          duration: 1,
          ease: 'bounce.out',
        }
      );
    } else if (buttons && isSidebarOpen) {
      gsap.to(buttons, {
        opacity: 0,
        duration: 0.5,
        ease: 'power3.inOut',
      });
    }
  }, [isSidebarOpen]);

  if (isSidebarOpen) return null;

  return (
    <div ref={buttonsRef} className="flex flex-row space-x-4 text-white items-center absolute md:bottom-20 bottom-16 z-20">
      <a href={"https://drive.google.com/file/d/1BUrEYLOsH2sFtSsCgps7HHKBwTEODj-U/view?usp=sharing"} className="flex items-center px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors duration-300">
        Download CV
        <span className="ml-2">
          <GoDownload className="w-5 h-5" />
        </span>
      </a>
      <a href={"https://www.linkedin.com/in/mohit-khandelwal-034aaa236/"} className="p-2 border-2 border-purple-600 rounded-full text-purple-600 hover:bg-purple-600 hover:text-white transition-colors duration-300">
        <FaLinkedinIn />
      </a>
      <a href={"https://github.com/mohit579-pixel"} className="p-2 border-2 border-gray-600 rounded-full text-gray-600 hover:bg-gray-600 hover:text-white transition-colors duration-300">
        <FaGithub />
      </a>
      <button className="p-2 border-2 border-blue-600 rounded-full text-blue-600 hover:bg-blue-600 hover:text-white transition-colors duration-300">
        <FaTwitter />
      </button>
    </div>
  );
};

export default SocialButtons;
