// HomePage.js
import React, { useState, useEffect, useRef } from 'react';
import { FaInstagram, FaTiktok, FaFacebookF, FaYoutube, FaSoundcloud, FaSpotify, FaApple, FaVolumeUp, FaVolumeMute } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import './HomePage.css';

const HomePage = () => {
  const [showPresave, setShowPresave] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [videoSource, setVideoSource] = useState('');
  const videoRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    document.body.style.overflow = 'hidden';

    const handleResize = () => {
      const isMobile = window.matchMedia("(max-width: 1280px)").matches;
      const newVideoSource = isMobile
        ? `${process.env.PUBLIC_URL}/backgroundfinal_mobile.mp4`
        : `${process.env.PUBLIC_URL}/websitetesteporfavor.mp4`;
      setVideoSource(newVideoSource);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    const timer = setTimeout(() => {
      setShowPresave(true);
    }, 4000);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', handleResize);
      document.body.style.overflow = 'auto';
    };
  }, []);

  useEffect(() => {
    if (videoRef.current) {
      const playVideo = async () => {
        try {
          const playPromise = videoRef.current.play();
          if (playPromise !== undefined) {
            await playPromise;
          }
        } catch (error) {
          console.error('Error trying to play video:', error);
          // Add a user gesture to start video playback
          const handleUserGesture = () => {
            videoRef.current.play().catch((err) => {
              console.error('Playback failed:', err);
            });
            document.removeEventListener('click', handleUserGesture);
            document.removeEventListener('touchstart', handleUserGesture);
          };
          document.addEventListener('click', handleUserGesture);
          document.addEventListener('touchstart', handleUserGesture);
        }
      };
      playVideo();
    }
  }, [videoSource]);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = isMuted;
    }
  }, [isMuted]);

  const handleMuteToggle = () => {
    setIsMuted(prevIsMuted => !prevIsMuted);
  };

  return (
    <div className="homepage">
      <video
        ref={videoRef}
        autoPlay
        loop
        muted={isMuted}
        className="background-video"
        playsInline
        key={videoSource} // Add key to force re-render when video source changes
      >
        <source src={videoSource} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <a className={`btn presave-btn ${showPresave ? 'show' : ''}`} href="https://linktr.ee/thisisgoncalo" target="_blank" rel="noopener noreferrer">
        PRE-SAVE
      </a>

      <nav className="navbar">
        <div className="navbar-buttons">
          <button className="btn join-btn" onClick={() => navigate('/joingoncaloclub')}>JOIN</button>
          <a href="https://linktr.ee/drinkwatergivelove_" target="_blank" rel="noopener noreferrer">
            <button className="btn listen-btn">LISTEN</button>
          </a>
        </div>
      </nav>

      <button className="mute-btn" onClick={handleMuteToggle}>
        {isMuted ? <FaVolumeMute /> : <FaVolumeUp />}
      </button>

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
