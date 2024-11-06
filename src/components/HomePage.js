// HomePage.js
import React, { useState, useEffect, useRef } from 'react';
import { FaInstagram, FaTiktok, FaFacebookF, FaYoutube, FaSoundcloud, FaSpotify, FaApple } from 'react-icons/fa';
import './HomePage.css';

const HomePage = () => {
  const [showPresave, setShowPresave] = useState(false);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [videoSource, setVideoSource] = useState('');
  const videoRef = useRef(null);

  useEffect(() => {
    const handleResize = () => {
      const isMobile = window.matchMedia("(max-width: 1280px)").matches;
      const newVideoSource = isMobile
        ? `${process.env.PUBLIC_URL}/websitetesteporfavor.mp4`
        : `${process.env.PUBLIC_URL}/websitetesteporfavor.mp4`;
      setVideoSource(newVideoSource);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    // Set up autoplay when component mounts
    if (videoRef.current) {
      videoRef.current.muted = true; // Mute video initially to allow autoplay
      videoRef.current.play().catch((err) => {
        console.error('Playback failed:', err);
      });
      setIsVideoPlaying(true);
    }

    const timer = setTimeout(() => {
      setShowPresave(true);
    }, 1000);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleVideoEnded = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0; // Reset the video to the beginning
      videoRef.current.play(); // Play the video again
    }
  };

  return (
    <div className="homepage">
      <video
        ref={videoRef}
        loop={false} 
        className="background-video"
        playsInline
        key={videoSource}
        onEnded={handleVideoEnded} // Call handleVideoEnded when video ends
        autoPlay // Added for autoplay
        muted // Added to ensure autoplay is not blocked
      >
        <source src={videoSource} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* New button to watch the official video */}
      <a
        className={`btn presave-btn ${showPresave ? 'show' : ''}`}
        href="https://www.youtube.com/watch?v=O3P251wiYcU" // Replace with your video link
        target="_blank"
        rel="noopener noreferrer"
      >
        WATCH 'CAN I GO BACK IN TIME' OFFICIAL VIDEO
      </a>

      {/* Existing button to stream the song */}
      <a
        className={`btn presave-btn ${showPresave ? 'show' : ''}`}
        href="https://lnkfi.re/canigobackintime"
        target="_blank"
        rel="noopener noreferrer"
      >
        STREAM 'CAN I GO BACK IN TIME?'
      </a>

      <nav className="navbar">
        <div className="navbar-buttons">
          <a href="https://linktr.ee/drinkwatergivelove_" target="_blank" rel="noopener noreferrer">
            <button className="btn listen-btn">LISTEN</button>
          </a>
        </div>
      </nav>

      <footer className="social-icons">
        <a href="https://www.instagram.com/drinkwatergivelove" target="_blank" rel="noopener noreferrer">
          <FaInstagram />
        </a>
        <a href="https://www.tiktok.com/@drinkwatergivelove" target="_blank" rel="noopener noreferrer">
          <FaTiktok />
        </a>
        <a href="https://www.facebook.com/drinkwatergivelove" target="_blank" rel="noopener noreferrer">
          <FaFacebookF />
        </a>
        <a href="https://www.youtube.com/@thisisgoncalo" target="_blank" rel="noopener noreferrer">
          <FaYoutube />
        </a>
        <a href="https://open.spotify.com/artist/2ZGAXUydLLiHcpg7mdpiTT" target="_blank" rel="noopener noreferrer">
          <FaSpotify />
        </a>
        <a href="https://soundcloud.com/@drinkwatergivelove" target="_blank" rel="noopener noreferrer">
          <FaSoundcloud />
        </a>
        <a href="https://music.apple.com/us/artist/gon%C3%A7alo/1525036818" target="_blank" rel="noopener noreferrer">
          <FaApple />
        </a>
      </footer>
    </div>
  );
};

export default HomePage;
