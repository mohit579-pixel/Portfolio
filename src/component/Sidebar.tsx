import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { closeSidebar } from '../redux/slices/sidebarSlice';
import { IoMdClose } from "react-icons/io";
import gsap from 'gsap';
import { RootState } from '../redux/store';

const Sidebar: React.FC = () => {
  const isSidebarOpen = useSelector((state: RootState) => state.sidebar.isSidebarOpen);
  const dispatch = useDispatch();

  useEffect(() => {
    if (isSidebarOpen) {
      gsap.to('.sidebar', { x: 0, duration: 0.5, ease: 'power3.inOut' });
    } else {
      gsap.to('.sidebar', { x: '-100%', duration: 0.5, ease: 'power3.inOut' });
    }
  }, [isSidebarOpen]);

  return (
    <div className={`sidebar fixed top-0 left-0 w-full h-full bg-black z-20 transform -translate-x-full`}>
      <IoMdClose className='absolute right-10 top-10 text-2xl' onClick={() => dispatch(closeSidebar())} />
      <div className="p-10 text-white text-xl">
        <ul>
          <li className="mb-4">Home</li>
          <li className="mb-4">About</li>
          <li className="mb-4">Experience</li>
          <li className="mb-4">Skills</li>
          <li className="mb-4">Projects</li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
