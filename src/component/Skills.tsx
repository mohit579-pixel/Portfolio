import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { AnimatedBeamDemo } from './Circle';
import { FadeText } from '@/components/magicui/fade-text';
import Particles from '@/components/magicui/particles';
import { useTheme } from 'next-themes';
import { IconCloudDemo } from './IconCloudDemo';

gsap.registerPlugin(ScrollTrigger);

const Skills = () => {
  const sectionRef = useRef(null);
  const textRef = useRef(null);
  const contentRef = useRef(null);
  const { theme } = useTheme();
  const [color, setColor] = useState("#ffffff");

  useEffect(() => {
    setColor(theme === "dark" ? "#000000" : "#ffffff");
  }, [theme]);

  useEffect(() => {
    // Define animations with GSAP and ScrollTrigger
    const section = sectionRef.current;
    const text = textRef.current;
    const content = contentRef.current;

    // gsap.fromTo(
    //   text,
    //   { opacity: 0, y: 50 },
    //   {
    //     opacity: 1,
    //     y: 0,
    //     duration: 1.5,
    //     scrollTrigger: {
    //       trigger: section,
    //       start: 'top 50%',
    //       end: 'top 30%',
    //       // scrub: true,
    //       // markers: true, // Use this for debugging
    //     },
    //   }
    // );

    gsap.fromTo(
      content,
      { opacity: 0, x: -100 },
      {
        opacity: 1,
        x: 0,
        duration: 2,
        scrollTrigger: {
          trigger: section,
          start: 'top 30%',
          end: 'top 0%',
          // scrub: true,
          // markers: true, // Use this for debugging
        },
      }
    );

    // Clean up ScrollTriggers
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [theme]);

  return (
    <section
      ref={sectionRef}
      className='h-[100vh] bg-black min-w-full min-h-full flex  p-4 sm:p-8 md:p-10 overflow-hidden'>
      <Particles
        className="absolute inset-0"
        quantity={100}
        ease={80}
        color={color}
        refresh
      />
        
      {/* <h3
        className='text-5xl sm:text-6xl md:text-7xl font-bold flex items-center justify-center mb-4 bg-gradient-to-r from-darkPurple to-white bg-clip-text text-transparent'
        ref={textRef}
      >
        Skills
      </h3> */}

      <div
        ref={contentRef}
        className='flex pt-32 md:flex-row md:space-x-10  md:space-y-0  text-white'
      >
        <div className='md:w-1/2  h-1/5 md:pl-32 '>
          <h3 className='text-7xl  font-bold mb-4 bg-gradient-to-r from-darkPurple to-white bg-clip-text text-transparent'>
            Skills
          </h3>
          <ul className='text-lg sm:text-xl font-thin'>
  <li className='mt-5 mb-3'>- Proficient in modern web development technologies.</li>
  <li className='mt-5 mb-3'>- Experienced in building scalable applications.</li>
  <li className='mt-5 mb-3'>- Strong focus on performance and user experience.</li>
  <li className='mt-5 mb-3'>- Transforming data into intelligence to drive innovation and scalability in web solutions.</li>
  <li className='mt-5 mb-3'>- Crafting intelligent web applications that learn and adapt to user behavior.</li>
  <li className='mt-5 mb-3'>- Fusing artificial intelligence with cutting-edge web technologies for smarter solutions.</li>
</ul>

        </div>
        <div className='md:w-1/2'>
          {/* <AnimatedBeamDemo /> */}
          <IconCloudDemo/>
        </div>
      </div>
    </section>
  );
};

export default Skills;
