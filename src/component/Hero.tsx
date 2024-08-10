import React from 'react';
import { FadeText } from '@/components/magicui/fade-text';
import SocialButtons from './SocialButtons';
import Profile from './Profile';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'src/redux/store';
import Skills from './Skills';

const Hero = ({ imageRef }) => {
  const dispatch = useDispatch();
  const isSidebarOpen = useSelector((state: RootState) => state.sidebar.isSidebarOpen);

  return (
    <>
      <section className="absolute min-h-full min-w-full bg-gradient bg-black z-2 flex-row md:flex items-center justify-center font-sans">
        <div className="flex-col p-5 mt-14 md:mt-0 md:p-20 space-y-4 text-left">
          <FadeText
            className="md:text-4xl text-xl font-medium text-white"
            direction="up"
            framerProps={{
              show: { transition: { delay: 3.3 } },
            }}
            text="I am Mohit"
          />
          <FadeText
            className="md:text-7xl text-4xl font-bold bg-gradient-to-r from-darkPurple to-white bg-clip-text text-transparent"
            direction="right"
            framerProps={{
              show: { transition: { delay: 3.5 } },
            }}
            text="Web + AI&ML"
          />
          <FadeText
            className="md:text-7xl text-4xl font-bold bg-gradient-to-r from-darkPurple to-white bg-clip-text text-transparent"
            direction="down"
            framerProps={{
              show: { transition: { delay: 3.7 } },
            }}
            text="Developer"
          />
          {!isSidebarOpen && (
            <Profile ref={imageRef} className="md:hidden block" />
          )}
          <FadeText
            className="md:text-xl text-sm text-white font-thin absolute md:bottom-36 bottom-32"
            direction="down"
            framerProps={{
              show: { transition: { delay: 3.9 } },
            }}
            text={
              <>
                I break down complex user experience{' '}
                <span className="block">problems to create integrity-focused</span>
                <span className="block">solutions that connect billions of people</span>
              </>
            }
          />
          <SocialButtons />
          
        </div>
        {!isSidebarOpen && (
          <Profile ref={imageRef} className="hidden md:block" />
        )}
      </section>
    </>
  );
};

export default Hero;
