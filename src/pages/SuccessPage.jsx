import { useState } from "react";
import styles from "./SuccessPage.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faCopy,
  faLink,
  faSms,
} from "@fortawesome/free-solid-svg-icons";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import { Link } from "react-router-dom";

const WHATSAPP_COMMUNITY_LINK =
  "https://chat.whatsapp.com/your-lfn-community-invite-code";

export default function SuccessPage() {
  const referralCode = "LFN-X12345";
  const referralLink = `https://leveragefreedomnetwork.com/join?ref=${referralCode}`;
  const shareMessage = `Join me on the Leverage Freedom Network! Use my referral code ${referralCode} to get started: ${referralLink}`;

  const [codeCopied, setCodeCopied] = useState(false);
  const [linkCopied, setLinkCopied] = useState(false);

  async function handleCopyCode() {
    try {
      await navigator.clipboard.writeText(referralCode);
      setCodeCopied(true);
      setTimeout(() => setCodeCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy referral code", err);
    }
  }

  async function handleCopyInviteLink() {
    try {
      await navigator.clipboard.writeText(referralLink);
      setLinkCopied(true);
      setTimeout(() => setLinkCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy invite link", err);
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.iconCircle}>
        <div className={styles.iconOuterCircle}>
          <div className={styles.iconInnerCircle}>
            <FontAwesomeIcon icon={faCheck} className={styles.icon} />
          </div>
        </div>
      </div>

      <h1 className={styles.heading}>You're In</h1>

      <p className={styles.subText}>
        You're in! Tap below to join the LFN WhatsApp community.
      </p>

      <div className={styles.middleSide}>
        <div className={styles.leftSide}>
          <p className={styles.referralText}>Your referral code</p>

          <div className={styles.referralCodeSection}>
            <h1 className={styles.referralCode}>{referralCode}</h1>

            <button onClick={handleCopyCode}>
              <FontAwesomeIcon icon={codeCopied ? faCheck : faCopy} />
              {" "}
              {codeCopied ? "Copied" : "Copy Code"}
            </button>
          </div>

          <p className={styles.referralText}>
            Share this code and earn{" "}
            <span className={styles.referralEndingAccent}>
              1 month free
            </span>{" "}
            for every person who joins using it.
          </p>
        </div>

        <div className={styles.rightSide}>
          <p className={styles.referralText}>Share your code</p>

          <div className={styles.rightSideLinks}>
            <a
              href={`https://wa.me/?text=${encodeURIComponent(shareMessage)}`}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.links}
            >
              <FontAwesomeIcon
                icon={faWhatsapp}
                className={styles.whatsappLink}
              />
              {" "}
              Share on WhatsApp
            </a>

            <a
              href={`sms:?body=${encodeURIComponent(shareMessage)}`}
              className={styles.links}
            >
              <FontAwesomeIcon
                icon={faSms}
                className={styles.smsLink}
              />
              {" "}
              Share via SMS
            </a>

            <button
              type="button"
              onClick={handleCopyInviteLink}
              className={styles.links}
            >
              <FontAwesomeIcon
                icon={linkCopied ? faCheck : faLink}
                className={styles.copyLink}
              />
              {" "}
              {linkCopied ? "Link copied" : "Copy invite link"}
            </button>
          </div>
        </div>
      </div>

      <div className={styles.bottomSide}>
        <a
          href={WHATSAPP_COMMUNITY_LINK}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.bottomSideWhatsapp}
        >
          <FontAwesomeIcon
            icon={faWhatsapp}
            className={styles.whatsappLink}
          />
          {" "}
          Join the Community
        </a>

        <Link
          to="/home"
          className={styles.bottomSideDashboard}
        >
          Go to my dashboard
        </Link>
      </div>
    </div>
  );
}