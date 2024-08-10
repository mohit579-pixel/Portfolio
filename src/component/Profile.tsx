import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

interface ProfileProps {
  className?: string; // Optional className prop for additional styling
}

const Profile: React.FC<ProfileProps> = ({ className }) => {
  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (imageRef.current) {
      gsap.fromTo(
        imageRef.current,
        { y: -100, opacity: 0 },
        {
          delay: 4.5,
          y: 0,
          opacity: 1,
          duration: 1,
          ease: 'bounce.out',
        }
      );
    }
  }, []);

  return (
    <div className={`flex justify-center items-center md:h-[70vh] h-[30vh] w-full md:w-[50vw] p-5 md:ml-11 relative md:top-10  top-6 md:p-10 z-20 rounded-lg ${className || ''}`}>
      <div className="w-[90%] md:w-[70%] md:h-[110%] md:relative flex justify-center items-center rotate-10 rounded-lg transition-transform duration-500 hover:rotate-0 border-purple-500 md:left-40">
        <img
          ref={imageRef}
          src="https://res.cloudinary.com/dymfsdc1w/image/upload/v1723193458/a-young-men-with-dark-hair-and-a-comfident-smile-h-LeKXBOguRWa1V0DW1p7V-A-q5vE4h_8QH60HovwU6g5VA_w6eqet.jpg"
          alt="Profile"
          className="rounded-3xl w-full h-full object-cover border-2 border-purple-700 transition-all duration-500 hover:border-[1px] hover:border-purple-500"
        />
      </div>
    </div>
  );
};

export default Profile;
