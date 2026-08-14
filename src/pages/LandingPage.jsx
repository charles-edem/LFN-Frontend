import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import LandingVideo from "../assets/videos/LandingVideo.mp4";
import {
  faPlay,
  faRightFromBracket,
  faVolumeXmark,
  faVolumeHigh,
  faPause,
  faStar,
} from '@fortawesome/free-solid-svg-icons';

import styles from './LandingPage.module.css';
import NavBar from '../components/NavBar';
import MobileNavBar from '../components/MobileNav';

export default function LandingPage() {
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const videoRef = useRef(null);

  function handlePlay() {
    setIsPlaying(true);
    setIsPaused(false);

    setTimeout(() => {
      if (videoRef.current) {
        videoRef.current.play();
      }
    }, 100);
  }

  function togglePlay() {
    if (!videoRef.current) return;

    if (isPaused) {
      videoRef.current.play();
      setIsPaused(false);
    } else {
      videoRef.current.pause();
      setIsPaused(true);
    }
  }

  function handleVideoEnd() {
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
    }

    setIsPlaying(false);
    setIsPaused(false);
  }
  function formatTime(time) {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);

    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  }


  return (
    <div className={styles.page}>
      
      <NavBar className={styles.navbar} />
      <MobileNavBar className={styles.logo} />
      <div className={styles.hero}>
        <div className={styles.heroLeft}>
          <h1 className={styles.heading}>
            <span className={styles.desktopLine}>Build real</span>
            <span className={styles.desktopLine}>leverage.</span>
            <span className={styles.mobileLine}>Build real leverage.</span>

            <span className={styles.desktopLine}>
              <span className={styles.headingAccent}>Own your</span>
            </span>

            <span className={styles.mobileLine}>
              <span className={styles.headingAccent}>Own your</span> freedom.
            </span>

            <span className={styles.desktopLine}>freedom.</span>
          </h1>

          <p className={styles.subtext}>
            LFN connects driven people with the strategies, capital, and community
            to generate income on their own terms no gatekeepers, no guesswork.
          </p>

          <div className={styles.ctaRow}>
            <Link to="/register" className={styles.primaryCta}>
              Join LFN <FontAwesomeIcon icon={faRightFromBracket} />
            </Link>

            <button
              className={styles.secondaryCta}
              onClick={handlePlay}
            >
              Watch intro
            </button>
          </div>
          <p className={styles.microcopy}>
            <span className={styles.microcopyStar}><FontAwesomeIcon icon={faStar} /></span>
            Free to join · 4,200 members · No credit card
          </p>
        </div>

        <div className={styles.heroRight}>
          <div className={styles.videoCard}>
            <span className={styles.mutedBadge}>
              <FontAwesomeIcon
                icon={isMuted ? faVolumeXmark : faVolumeHigh}
                className={isMuted ? styles.mutedIcon : styles.soundIcon}
              />
              {isMuted ? "MUTED" : "SOUND ON"}
            </span>

            {isPlaying && (
              <video
                ref={videoRef}
                className={styles.video}
                src={LandingVideo}
                muted={isMuted}
                onLoadedMetadata={() => {
                  setDuration(videoRef.current.duration);
                }}
                onTimeUpdate={() => {
                  setCurrentTime(videoRef.current.currentTime);
                }}
                onEnded={handleVideoEnd}
              />
            )}

            <button
              className={styles.playButton}
              onClick={isPlaying ? togglePlay : handlePlay}
            >
              <FontAwesomeIcon
                icon={isPlaying && !isPaused ? faPause : faPlay}
              />
            </button>

            <span className={styles.timestamp}>
              {isPlaying ? formatTime(currentTime) : formatTime(duration)}
            </span>

            <button
              className={styles.soundToggle}
              onClick={() => setIsMuted(!isMuted)}
            >
              <FontAwesomeIcon
                icon={isMuted ? faVolumeXmark : faVolumeHigh}
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}