import styles from "./ErrorPage.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <div className={styles.page}>
      <div className={styles.illustrationWrap}>
        <svg
          className={styles.illustration}
          viewBox="0 0 260 200"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern
              id="grid"
              width="20"
              height="20"
              patternUnits="userSpaceOnUse"
            >
              <circle cx="1" cy="1" r="1" fill="#dfe6f2" />
            </pattern>
          </defs>
          <rect x="60" y="30" width="140" height="140" fill="url(#grid)" />

          <circle cx="55" cy="35" r="5" fill="#ffffff" stroke="#c7d6f0" strokeWidth="2" />
          <circle cx="205" cy="42" r="4" fill="#c7d6f0" />
          <circle cx="212" cy="150" r="6" fill="#ffffff" stroke="#c7d6f0" strokeWidth="2" />
          <circle cx="48" cy="145" r="3" fill="#c7d6f0" />

          <ellipse
            cx="112"
            cy="100"
            rx="38"
            ry="34"
            fill="none"
            stroke="#0a6dee"
            strokeWidth="6"
          />
          <ellipse
            cx="150"
            cy="100"
            rx="38"
            ry="34"
            fill="#eaf1ff"
            stroke="#8fb4f5"
            strokeWidth="6"
          />
          <circle cx="150" cy="86" r="3" fill="#9db9ee" />
          <circle cx="160" cy="98" r="3" fill="#9db9ee" />
          <circle cx="148" cy="110" r="3" fill="#9db9ee" />
        </svg>
      </div>

      <div className={styles.eyebrow}>
        <span className={styles.eyebrowLine} />
        <span className={styles.eyebrowText}>Error 404</span>
        <span className={styles.eyebrowLine} />
      </div>

      <h1 className={styles.heading}>This page doesn't exist.</h1>

      <p className={`${styles.subText} ${styles.subTextLong}`}>
        The link may be broken, the page may have moved, or you may have
        typed the address incorrectly.
      </p>
      <p className={`${styles.subText} ${styles.subTextShort}`}>
        The link may be broken or the page may have moved.
      </p>

      <div className={styles.actions}>
        <Link to="/home" className={styles.primaryButton}>
          <FontAwesomeIcon icon={faArrowLeft} />
          Back to home
        </Link>
      </div>

      <div className={styles.tryLinks}>
        <span className={styles.tryLabel}>Or try:</span>
        <Link to="/register" className={styles.tryLink}>
          Join LFN
        </Link>
      </div>
    </div>
  );
}