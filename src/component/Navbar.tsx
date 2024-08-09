import React, { useState } from 'react';
import { GiHamburgerMenu } from 'react-icons/gi';
import { MdClose } from 'react-icons/md';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="bg-transparent fixed top-0 w-full z-10 flex justify-between text-white p-5 pt-8 font-serif">
      <div className="logo flex justify-between gap-10 text-xl">
        <div>logo</div>
        <div className="hidden md:block">mohitkhandelwal579@gmail.com</div>
      </div>

      {/* Hamburger Icon for Mobile View */}
      <div className="md:hidden flex items-center">
        <button onClick={toggleMenu} className="text-2xl">
          {isOpen ? <MdClose /> : <GiHamburgerMenu />}
        </button>
      </div>

      {/* Menu Items for Desktop View */}
      <ul className={`md:flex ${isOpen ? 'flex' : 'hidden'} flex-col md:flex-row gap-x-20 text-xl pr-4`}>
        <li className="group relative">
          Home
          <span className="absolute left-0 bottom-[-2px] w-0 h-[2px] bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-500 group-hover:w-full"></span>
        </li>
        <li className="group relative">
          About
          <span className="absolute left-0 bottom-[-2px] w-0 h-[2px] bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-500 group-hover:w-full"></span>
        </li>
        <li className="group relative">
          Experience
          <span className="absolute left-0 bottom-[-2px] w-0 h-[2px] bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-500 group-hover:w-full"></span>
        </li>
        <li className="group relative">
          Skills
          <span className="absolute left-0 bottom-[-2px] w-0 h-[2px] bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-500 group-hover:w-full"></span>
        </li>
        <li className="group relative">
          Project
          <span className="absolute left-0 bottom-[-2px] w-0 h-[2px] bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-500 group-hover:w-full"></span>
        </li>
      </ul>

      {/* Dropdown Menu for Mobile View */}
      {isOpen && (
        <ul className="md:hidden flex flex-col items-center absolute top-16 right-0 bg-transparent text-white w-full text-center">
          <li className="py-2 border-b border-gray-700 w-full">
            <a href="#home" onClick={toggleMenu}>Home</a>
          </li>
          <li className="py-2 border-b border-gray-700 w-full">
            <a href="#about" onClick={toggleMenu}>About</a>
          </li>
          <li className="py-2 border-b border-gray-700 w-full">
            <a href="#experience" onClick={toggleMenu}>Experience</a>
          </li>
          <li className="py-2 border-b border-gray-700 w-full">
            <a href="#skills" onClick={toggleMenu}>Skills</a>
          </li>
          <li className="py-2 border-b border-gray-700 w-full">
            <a href="#project" onClick={toggleMenu}>Project</a>
          </li>
        </ul>
      )}
    </nav>
  );
};

export default Navbar;
