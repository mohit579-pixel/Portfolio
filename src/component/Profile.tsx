import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

const Profile = () => {
  const imageRef = useRef(null);

  useEffect(() => {
    if (imageRef.current) {
      gsap.fromTo(
        imageRef.current,
        { y: -100, opacity: 0 },
        {
          delay: 4.5,
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
    <div className="flex justify-center items-center h-[70vh] w-full md:w-[50vw] p-5 md:p-10 z-20 rounded-lg">
      <div className="w-[90%] md:w-[60%] h-[110%] rotate-10 rounded-lg transition-transform duration-500 hover:rotate-0 border-purple-500">
        <img
          ref={imageRef}
          src="https://res.cloudinary.com/dymfsdc1w/image/upload/v1723193458/a-young-men-with-dark-hair-and-a-comfident-smile-h-LeKXBOguRWa1V0DW1p7V-A-q5vE4h_8QH60HovwU6g5VA_w6eqet.jpg"
          alt="Profile"
          className="rounded-3xl w-full h-full object-cover border-2 border-purple-500 transition-all duration-500 hover:border-[1px] hover:border-purple-700"
        />
      </div>
    </div>
  );
};

export default Profile;
