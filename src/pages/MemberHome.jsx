import { useState, useContext } from "react";
import styles from "./MemberHome.module.css";
import { AuthContext } from "../lib/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCopy,
  faCheck,
  faBell,
  faPen,
  faSms,
  faHand,
  faLink,
  faPaperPlane,
  faUserGroup,
} from "@fortawesome/free-solid-svg-icons";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import NavBar from "../components/NavBar"
import MobileNavBar from "../components/MobileNav"

export default function Dashboard() {
  const { userData } = useContext(AuthContext);

  const [editingField, setEditingField] = useState(null);
  const [draftValue, setDraftValue] = useState("");

  const referralCode = userData?.referral_code || "LFN-XY4821";
  const referralLink = `https://leveragefreedomnetwork.com/join?ref=${referralCode}`;
  const shareMessage = `Join me on the Leverage Freedom Network! Use my referral code ${referralCode} to get started: ${referralLink}`;

  const [codeCopied, setCodeCopied] = useState(false);
  const [linkCopied, setLinkCopied] = useState(false);

  const impact = {
  referralsSent: 0,
  membersJoined: 0,
  monthsEarned: 0
  };
  

  function startEdit(field) {
    setEditingField(field);
    if (field === "whatsappNumber") {
      setDraftValue(
        userData?.whatsappNumber ||
        userData?.phone_number ||
        ""
      );
    }
    if (field === "email") {
      setDraftValue(userData?.email || "");
    }
  }

  function saveEdit(field) {
    // Connect this to backend update later
    console.log("Update", field, draftValue);
    setEditingField(null);
  }

  function cancelEdit() {
    setEditingField(null);
  }

  async function handleCopyCode() {
    try {
      await navigator.clipboard.writeText(referralCode);
      setCodeCopied(true);
      setTimeout(() => {
        setCodeCopied(false);
      }, 2000);

    } catch (err) {
      console.error(err);
    }
  }

  async function handleCopyInviteLink() {
    try {
      await navigator.clipboard.writeText(referralLink);
      setLinkCopied(true);
      setTimeout(() => {
        setLinkCopied(false);
      }, 2000);

    } catch (err) {
      console.error(err);
    }
  }

  const firstName =
    userData?.first_name ||
    userData?.firstName ||
    "Member";

  const lastName =
    userData?.last_name ||
    userData?.lastName ||
    "";

  const fullName =
    `${firstName} ${lastName}`.trim();

  const whatsapp =
    userData?.whatsappNumber ||
    userData?.phone_number ||
    "Not provided";

  return (
    <div className={styles.pageWrapper}>
      <NavBar className={styles.navBar} />
      <MobileNavBar className={styles.mobileNav} />
      <div className={styles.page}>
        <div className={styles.greetingSection}>
          <h1 className={styles.greeting}>
            Hello, {firstName}
            <span className={styles.wave}><FontAwesomeIcon icon={faHand} /></span>
          </h1>
        </div>
        <div className={styles.mainGrid}>
          <div className={styles.leftColumn}>
            <div className={styles.noticeCard}>
              <div className={styles.noticeIcon}>
                <FontAwesomeIcon icon={faBell} />
              </div>
              <div>
                <p className={styles.noticeTitle}>
                  Earning opportunities launch soon
                </p>
                <p className={styles.noticeText}>
                  We'll notify you on WhatsApp the moment they go live no action needed from you right now.
                </p>
              </div>
            </div>
            <div className={styles.profileCard}>
              <div className={styles.profileHeader}>
                <div className={styles.avatar}>
                  {firstName[0]}
                  {lastName[0]}
                </div>
                <div>
                  <p className={styles.profileName}>
                    {fullName}
                  </p>
                  <p className={styles.profileSince}>
                    Member since {userData?.created_at || "N/A"}
                  </p>
                </div>
              </div>
              <div className={styles.field}>
                <div className={styles.fieldInfo}>
                  <p className={styles.fieldLabel}>
                    WhatsApp number
                  </p>
                  {editingField === "whatsappNumber" ? (
                    <input
                      className={styles.fieldInput}
                      value={draftValue}
                      onChange={(e) => setDraftValue(e.target.value)}
                    />
                  ) : (
                    <p className={styles.fieldValue}>
                      {whatsapp}
                    </p>
                  )}
                </div>
                {editingField === "whatsappNumber" ? (
                  <div className={styles.editActions}>
                    <button
                      className={styles.saveLink}
                      onClick={() => saveEdit("whatsappNumber")}
                    >
                      Save
                    </button>
                    <button
                      className={styles.cancelLink}
                      onClick={cancelEdit}
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  <button
                    className={styles.editLink}
                    onClick={() => startEdit("whatsappNumber")}
                  >
                    <FontAwesomeIcon icon={faPen} />
                    Edit
                  </button>
                )}
              </div>
              <div className={styles.field}>
                <div className={styles.fieldInfo}>
                  <p className={styles.fieldLabel}>
                    Email address
                  </p>
                  {editingField === "email" ? (
                    <input
                      className={styles.fieldInput}
                      value={draftValue}
                      onChange={(e) => setDraftValue(e.target.value)}
                    />
                  ) : (
                    <p className={styles.fieldValue}>
                      {userData?.email || "Not provided"}
                    </p>
                  )}
                </div>
                {editingField === "email" ? (
                  <div className={styles.editActions}>
                    <button
                      className={styles.saveLink}
                      onClick={() => saveEdit("email")}
                    >
                      Save
                    </button>
                    <button
                      className={styles.cancelLink}
                      onClick={cancelEdit}
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  <button
                    className={styles.editLink}
                    onClick={() => startEdit("email")}
                  >
                    <FontAwesomeIcon icon={faPen} />
                    Edit
                  </button>
                )}
              </div>
              <div className={styles.field}>
                <div className={styles.fieldInfo}>
                  <p className={styles.fieldLabel}>
                    Full name
                  </p>
                  <p className={styles.fieldValue}>
                    {fullName}
                  </p>
                </div>
                <span className={styles.readOnly}>
                  Read-only
                </span>
              </div>
              <div className={styles.field}>
                <div className={styles.fieldInfo}>
                  <p className={styles.fieldLabel}>
                    Age range
                  </p>
                  <p className={styles.fieldValue}>
                    {userData?.age_range || "Not provided"}
                  </p>
                </div>
                <span className={styles.readOnly}>
                  Read-only
                </span>
              </div>
            </div>
            <a
              href={""}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.communityButton}
            >
              <FontAwesomeIcon
                icon={faWhatsapp}
              />
              Join the WhatsApp community
            </a>
          </div>
          <div className={styles.rightColumn}>
            <div className={styles.referralCard}>
              <p className={styles.referralLabel}>
                Your referral code
              </p>

              <div className={styles.referralCodeRow}>
                <h2 className={styles.referralCode}>
                  {referralCode}
                </h2>
                <button
                  className={styles.copyButton}
                  onClick={handleCopyCode}
                >
                  <FontAwesomeIcon
                    icon={codeCopied ? faCheck : faCopy}
                  />
                  {codeCopied ? "Copied" : "Copy"}
                </button>
              </div>
              <div className={styles.shareTiles}>
                <a
                  href={`https://wa.me/?text=${encodeURIComponent(shareMessage)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.shareTile}
                >
                  <FontAwesomeIcon icon={faWhatsapp} />
                  WhatsApp
                </a>
                <a
                  href={`sms:?body=${encodeURIComponent(shareMessage)}`}
                  className={styles.shareTile}
                >
                  <FontAwesomeIcon icon={faSms} />
                  SMS
                </a>
                <button
                  className={styles.shareTile}
                  onClick={handleCopyInviteLink}
                >
                  <FontAwesomeIcon
                    icon={linkCopied ? faCheck : faLink}
                  />
                  {linkCopied ? "Copied" : "Link"}
                </button>
              </div>

              <p className={styles.referralFooter}>
                Earn <strong>1 month free</strong> for every person who joins with your code.
              </p>
            </div>

            <div className={styles.impactCard}>
              <p className={styles.impactTitle}>
                Your impact
              </p>

              <div className={styles.impactRow}>
                <div className={styles.impactLeft}>
                  <span className={`${styles.impactIcon} ${styles.impactIconBlue}`}>
                    <FontAwesomeIcon icon={faPaperPlane} />
                  </span>
                  <span>Referrals sent</span>
                </div>
                <strong>{impact.referralsSent}</strong>
              </div>

              <div className={styles.impactRow}>
                <div className={styles.impactLeft}>
                  <span className={`${styles.impactIcon} ${styles.impactIconGreen}`}>
                    <FontAwesomeIcon icon={faUserGroup} />
                  </span>
                  <span>Members joined</span>
                </div>
                <strong>{impact.membersJoined}</strong>
              </div>

              <div className={styles.impactRow}>
                <div className={styles.impactLeft}>
                  <span className={`${styles.impactIcon} ${styles.impactIconGold}`}>
                    <FontAwesomeIcon icon={faCheck} />
                  </span>
                  <span>Months earned</span>
                </div>
                <strong>{impact.monthsEarned}</strong>
              </div>
            </div>
            <button className={styles.signOut}>
              Sign out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}