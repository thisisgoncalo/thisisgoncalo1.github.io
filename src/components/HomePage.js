// src/components/HomePage.js

import React, { useState, useEffect, useRef } from 'react';
import { FaInstagram, FaTiktok, FaFacebookF, FaYoutube, FaSoundcloud, FaSpotify, FaApple, FaMusic, FaVolumeUp, FaVolumeMute } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import './HomePage.css'; // Import HomePage.css for styles

const HomePage = () => {
  const [showPresave, setShowPresave] = useState(false); // State to handle the visibility of the PRE-SAVE button
  const [isMuted, setIsMuted] = useState(true); // State to handle mute/unmute functionality
  const videoRef = useRef(null); // Ref to access the video element
  const navigate = useNavigate(); // Hook to handle navigation

  useEffect(() => {
    // Set a timeout to show the PRE-SAVE button after 3 seconds
    const timer = setTimeout(() => {
      setShowPresave(true);
    }, 3000); // 3000ms = 3 seconds

    // Clear timeout if the component unmounts before the timeout completes
    return () => clearTimeout(timer);
  }, []);

  const handleMuteToggle = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(videoRef.current.muted);
    }
  };

  return (
    <div className="homepage">
      {/* Background Video */}
      <video
        ref={videoRef}
        autoPlay
        loop
        muted={isMuted} // Use the muted state
        className="background-video"
      >
        <source src={`${process.env.PUBLIC_URL}/websitetesteporfavor.mp4`} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* PRE-SAVE Button */}
      <a href="https://linktr.ee/thisisgoncalo" target="_blank" rel="noopener noreferrer">
        <button className={`btn presave-btn ${showPresave ? 'show' : ''}`}>PRE-SAVE</button>
      </a>

      {/* Navbar */}
      <nav className="navbar">
        <div className="navbar-buttons">
          <button className="btn join-btn" onClick={() => navigate('/join-form')}>JOIN</button>
          <a href="https://linktr.ee/drinkwatergivelove_" target="_blank" rel="noopener noreferrer">
            <button className="btn listen-btn">LISTEN</button>
          </a>
        </div>
      </nav>

      {/* Mute/Unmute Button */}
      <button className="mute-btn" onClick={handleMuteToggle}>
        {isMuted ? <FaVolumeMute /> : <FaVolumeUp />}
      </button>

      {/* Social Icons */}
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
