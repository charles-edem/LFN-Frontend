import { verifyOtp } from "../lib/mockApi";
import { useNavigate, Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMobileScreenButton } from '@fortawesome/free-solid-svg-icons';
import styles from './OtpVerificationPage.module.css';

import { useContext } from "react";
import { AuthContext } from "../lib/AuthContext";

export default function OtpVerificationPage() {
  const { userData, setRegistrationStep } = useContext(AuthContext)
  
  const navigate = useNavigate();
  const mobileNumber = userData?.mobile;

  const [otpValues, setOtpValues] = useState(["", "", "", "", "", ""]);
  const [submitError, setSubmitError] = useState("");
  const [attempts, setAttempts] = useState(0);
  const [timer, setTimer] = useState(60);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const inputRefs = useRef([]);

  useEffect(() => {
    if (timer <= 0) return;
    const interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
    return () => clearInterval(interval);
  }, [timer]);

  function handleChange(index, value) {
    const digit = value.replace(/\D/g, "").slice(-1);
    const updated = [...otpValues];
    updated[index] = digit;
    setOtpValues(updated);

    if (digit && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  }

  function handleKeyDown(index, e) {
    if (e.key === "Backspace" && !otpValues[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  }

  function handlePaste(e) {
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
    if (pasted.length === 6) {
      setOtpValues(pasted.split(""));
      inputRefs.current[5]?.focus();
    }
    e.preventDefault();
  }

  const isComplete = otpValues.every((v) => v !== "");

  async function handleSubmit(e) {
    e.preventDefault();
    if (attempts >= 5 || !isComplete) return;

    setSubmitError("");
    setIsSubmitting(true);

    try {
      const code = otpValues.join("");
      const response = await verifyOtp(mobileNumber, code);

      if (response.success) {
        navigate("/success");
        setRegistrationStep(2);
      } else {
        const newAttempts = attempts + 1;
        setAttempts(newAttempts);
        setOtpValues(["", "", "", "", "", ""]);
        inputRefs.current[0]?.focus();

        setSubmitError(
          newAttempts >= 5
            ? "Maximum verification attempts reached. Please request a new OTP."
            : `Incorrect code. ${5 - newAttempts} attempt(s) remaining.`
        );
      }
    } catch (error) {
      console.error(error);
      setSubmitError("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  function handleResend() {
    setTimer(60);
    setAttempts(0);
    setSubmitError("");
    setOtpValues(["", "", "", "", "", ""]);
    inputRefs.current[0]?.focus();
    // TODO: call resend-OTP endpoint here
  }

  return (
    <div className={styles.page}>
      <div className={styles.card}>

        <div className={styles.mobileHeader}>
          <button className={styles.backButton} onClick={() => navigate(-1)} type="button">‹</button>
          <div className={styles.logoBadge}>LFN</div>
          <p className={styles.mobileTitle}>Verify your number</p>
        </div>

        <div className={styles.iconCircle}>
          <FontAwesomeIcon icon={faMobileScreenButton} />
        </div>

        <h1 className={styles.title}>Enter your code</h1>
        <p className={styles.subtext}>
          We sent a 6-digit code to <span className={styles.subtextMobile}>{mobileNumber}</span>.
          It expires in 10 minutes.
        </p>

        <form onSubmit={handleSubmit}>
          <div className={styles.otpRow} onPaste={handlePaste}>
            {otpValues.map((digit, index) => (
              <input
                key={index}
                ref={(el) => (inputRefs.current[index] = el)}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                className={`${styles.otpBox} ${submitError ? styles.otpBoxError : ""}`}
              />
            ))}
          </div>

          <div className={styles.resendRow}>
            {timer > 0 ? (
              <span className={styles.resendTimer}>Resend available in {timer}s</span>
            ) : (
              <button type="button" className={styles.resendLink} onClick={handleResend}>
                Resend code
              </button>
            )}
          </div>

          <button
            type="submit"
            className={styles.submitButton}
            disabled={!isComplete || attempts >= 5 || isSubmitting}
          >
            {isSubmitting ? "Verifying..." : "Verify & continue"}
          </button>

          {submitError && <p className={styles.errorText}>{submitError}</p>}
        </form>

        <p className={styles.wrongNumber}>
          Wrong number? <Link to="/register" className={styles.wrongNumberLink}>Go back and update it</Link>
        </p>
      </div>
    </div>
  );
}