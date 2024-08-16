import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const useNavbarAnimation = () => {
  useEffect(() => {
    gsap.fromTo(
      'nav', // or use a ref if you prefer
      { y: 0, backgroundColor: 'transparent' },
      {
        y: -10,
        backgroundColor: 'linear-gradient(to right, purple, pink)',
        duration: 0.5,
        ease: 'bounce.out',
        scrollTrigger: {
          trigger: '#skills-section', // or the ID of your "Skills" section
          start: 'top center',
          end: 'bottom top',
          toggleActions: 'play none none reverse', // Play animation on entering and reverse on leaving
          markers: true, // Use this for debugging
        },
      }
    );
    
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);
};

export default useNavbarAnimation;
