import React, { useEffect, useRef, useState } from 'react';

const LoadingAnimation = ({onAudioEnd}) => {
    const audioRef = useRef();
const [loading, setLoading] = useState(true)
const isloading= loading ?'fade-in':'fade-out'
   
    useEffect(() => {
        audioRef.current.play();
        const timer = setTimeout(() => {
          setLoading(false); 
          const fadeOutTimer = setTimeout(() => {
            onAudioEnd(); 
          }, 800); 
    
          return () => clearTimeout(fadeOutTimer);
        }, 6000); 
    
        return () => clearTimeout(timer);
      }, [onAudioEnd]);
  return (
    <div
      style={{
        color: "white",
        border: "2px solid white",
        borderRadius: "50%",
        backgroundColor: "black",
        width: "130px",
        height: "130px",
        position: "relative",
      }}
      className={isloading}
    >
      <img src="/spincartoon.png" alt="loading" className="spinner-image" />
      <audio ref={audioRef} src="/music.mp3" />
    </div>
  );
};

export default LoadingAnimation;
