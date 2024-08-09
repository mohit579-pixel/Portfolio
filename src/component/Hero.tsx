import React from 'react';
import { FadeText } from '@/components/magicui/fade-text';
import SocialButtons from './SocialButtons';
import Profile from './Profile';

const Hero = ({ imageRef }) => {
  return (
    <>
      <section className="absolute min-h-full min-w-full bg-gradient bg-black z-2 flex items-center justify-center font-sans">
        <div className="flex-col p-5 md:p-20 space-y-4 text-left">
          <FadeText
            className="text-4xl font-medium text-white"
            direction="up"
            framerProps={{
              show: { transition: { delay: 3.3 } },
            }}
            text="I am Mohit"
          />
          <FadeText
            className="text-7xl font-bold bg-gradient-to-r from-darkPurple to-white bg-clip-text text-transparent"
            direction="right"
            framerProps={{
              show: { transition: { delay: 3.5 } },
            }}
            text="Web + AI&ML"
          />
          <FadeText
            className="text-7xl font-bold bg-gradient-to-r from-darkPurple to-white bg-clip-text text-transparent"
            direction="down"
            framerProps={{
              show: { transition: { delay: 3.7 } },
            }}
            text="Developer"
          />
          <FadeText
            className="text-xl text-white font-thin"
            direction="left"
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
        <Profile ref={imageRef} />
      </section>
    </>
  );
};

export default Hero;
