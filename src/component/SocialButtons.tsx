import React, { useEffect, useRef } from 'react';
import { FaLinkedinIn, FaGithub, FaTwitter } from 'react-icons/fa';

import gsap from 'gsap';
import { GoDownload } from "react-icons/go";
const SocialButtons = () => {
  const buttonsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const buttons = buttonsRef.current?.children;
    if (buttons) {
      gsap.fromTo(
        
        buttons,
        { y: -100, opacity: 0 },
        {
            delay:4.2,
          y: 0,
          opacity: 1,
          stagger: 0.2, // Adjust delay between items
          duration: 1,
          ease: 'bounce.out',
        }
      );
    }
  }, []);

  return (
    <div
      ref={buttonsRef}
      className="flex flex-row space-x-4 text-white items-center "
    >
      <a
      href={"https://drive.google.com/file/d/1BUrEYLOsH2sFtSsCgps7HHKBwTEODj-U/view?usp=sharing"} // Replace with the actual path to your CV file
      download="Your_CV_Filename.pdf" // Optional: provide a default filename for the download
      className="flex items-center px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors duration-300 z-30"
    >
      Download CV
      <span className="ml-2">
        <GoDownload className="w-5 h-5" />
      </span>
    </a>
      <a href={"https://www.linkedin.com/in/mohit-khandelwal-034aaa236/"} className="p-2 border-2 border-purple-600 rounded-full text-purple-600 hover:bg-purple-600 hover:text-white transition-colors duration-300 z-30">
        <FaLinkedinIn />
      </a>
      <a href={"https://github.com/mohit579-pixel"} className="p-2 border-2 border-gray-600 rounded-full text-gray-600 hover:bg-gray-600 hover:text-white transition-colors duration-300 z-30">
        <FaGithub />
      </a>
      <button className="p-2 border-2 border-blue-600 rounded-full text-blue-600 hover:bg-blue-600 hover:text-white transition-colors duration-300 z-30">
        <FaTwitter />
      </button>
    </div>
  );
};

export default SocialButtons;
