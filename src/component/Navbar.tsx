import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GiHamburgerMenu } from "react-icons/gi";
import { IoMdClose } from "react-icons/io";
import { toggleSidebar } from '../redux/slices/sidebarSlice';
import Sidebar from './Sidebar';
import { RootState } from '../redux/store';

const Navbar: React.FC = () => {
  const dispatch = useDispatch();
  const isSidebarOpen = useSelector((state: RootState) => state.sidebar.isSidebarOpen);

  return (
    <nav className="bg-transparent  fixed top-0 w-full z-10 flex justify-between text-white p-5 pt-8 font-serif">
      <div className="logo flex justify-between gap-10 text-xl">
        <div>
          logo
        </div>
        <div className='hidden'>
          mohitkhandelwal579@gmail.com
        </div>
      </div>

      <div className="block md:hidden text-2xl mr-4">
        {isSidebarOpen ? (
          <IoMdClose onClick={() => dispatch(toggleSidebar())} />
        ) : (
          <GiHamburgerMenu onClick={() => dispatch(toggleSidebar())} />
        )}
      </div>

      <ul className="md:flex gap-x-20 text-xl pr-4 hidden">
        <li className="group relative z-30">
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

      <Sidebar />
    </nav>
  );
};

export default Navbar;