import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import GradualSpacing from "@/components/magicui/gradual-spacing";
import Hero from './Hero';
import Navbar from './Navbar';
import Skills from './Skills';

const Loading = () => {
  const loadingRef = useRef(null);
  const heroRef = useRef(null);
  const navRef = useRef(null);
  const imageRef = useRef(null);
  const skillRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline();

    // Move Loading component up and curve the bottom corners
    tl.to(loadingRef.current, {
      delay: 1.3,
      duration: 2,
      y: -200,
      borderBottomLeftRadius: '50%',
      borderBottomRightRadius: '50%',
      ease: 'power3.inOut',
    })
      // Fade out Loading and fade in Hero
      .to(loadingRef.current, {
        duration: 0.5,
        opacity: 0,
        onComplete: () => {
          gsap.to(heroRef.current, { opacity: 1, duration: 1 });
          gsap.to(navRef.current, { opacity: 1, duration: 1 });
          gsap.to(imageRef.current, { opacity: 1, duration: 1 });
          gsap.to(skillRef.current, { opacity: 1, duration: 1 });
          gsap.set(loadingRef.current, { y: -1000 });
        }
      }, "-=0.5");

    gsap.set(heroRef.current, { opacity: 1 });
    gsap.set(navRef.current, { opacity: 1 });
    gsap.set(imageRef.current, { opacity: 0 });
    gsap.set(skillRef.current, { opacity: 0 });
  }, []);

  return (
    <>
      <section
        ref={loadingRef}
        className="absolute min-w-full min-h-full bg-black flex items-center justify-center text-stone-100 z-30"
        style={{ borderBottomLeftRadius: 0, borderBottomRightRadius: 0 }}
      >
        <GradualSpacing
          className="font-display text-center text-4xl font-serif font-bold tracking-wide opacity-5 text-white dark:text-white md:text-7xl md:leading-[5rem]"
          text="Loading"
        />
      </section>
      <div ref={navRef}>
        <Navbar />
      </div>
      <div ref={heroRef} >
        <Hero imageRef={imageRef} />
      </div>
      <div ref={skillRef} className="relative z-2">
        <Skills />
      </div>
    </>
  );
};

export default Loading;
