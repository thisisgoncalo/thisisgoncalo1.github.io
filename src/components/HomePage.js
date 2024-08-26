// HomePage.js
import React, { useState, useEffect, useRef } from 'react';
import { FaInstagram, FaTiktok, FaFacebookF, FaYoutube, FaSoundcloud, FaSpotify, FaApple } from 'react-icons/fa';

import './HomePage.css';

const HomePage = () => {
  const [showPresave, setShowPresave] = useState(false);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [showYesButton, setShowYesButton] = useState(false); // State for showing the YES button
  const [videoSource, setVideoSource] = useState('');
  const videoRef = useRef(null);

  useEffect(() => {
    document.body.style.overflow = 'hidden';

    const handleResize = () => {
      const isMobile = window.matchMedia("(max-width: 1280px)").matches;
      const newVideoSource = isMobile
        ? `${process.env.PUBLIC_URL}/websitetesteporfavor.mp4`
        : `${process.env.PUBLIC_URL}/websitetesteporfavor.mp4`;
      setVideoSource(newVideoSource);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    const timer = setTimeout(() => {
      setShowPresave(true);
    }, 1000);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', handleResize);
      document.body.style.overflow = 'auto';
    };
  }, []);

  const handleStartVideo = () => {
    if (videoRef.current) {
      videoRef.current.muted = false; // Unmute the video
      videoRef.current.play().catch((err) => {
        console.error('Playback failed:', err);
      });
      setIsVideoPlaying(true);
      setShowYesButton(false); // Hide YES button when the video starts playing
    }
  };

  const handleVideoEnded = () => {
    setShowYesButton(true); // Show YES button when video ends
  };

  const handleRestartVideo = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0; // Reset the video to the beginning
      videoRef.current.play(); // Play the video
      setShowYesButton(false); // Hide YES button after restarting
    }
  };

  return (
    <div className="homepage">
      <video
        ref={videoRef}
        loop={false} // Do not loop the video so it stops at the end
        className="background-video"
        playsInline
        key={videoSource} // Add key to force re-render when video source changes
        onEnded={handleVideoEnded} // Event listener for when the video ends
      >
        <source src={videoSource} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {!isVideoPlaying && !showYesButton && (
        <div className="overlay-container">
          <button className="insert-disk-btn" onClick={handleStartVideo}>
            INSERT DISK
          </button>
        </div>
      )}

      {showYesButton && (
        <div className="overlay-container">
          <button className="insert-disk-btn" onClick={handleRestartVideo}>
            YES
          </button>
        </div>
      )}

      <a className={`btn presave-btn ${showPresave ? 'show' : ''}`} href="https://tr.ee/aeDkf41ji6" target="_blank" rel="noopener noreferrer">
        PRE-SAVE 'CAN I GO BACK IN TIME?'
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
