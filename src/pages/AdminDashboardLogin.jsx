import { useState } from "react";
import { useForm } from "react-hook-form";
import styles from "./AdminDashboardLogin.module.css";
import { useNavigate } from "react-router-dom";
import MobileNavBar from "../components/MobileNav";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash, faArrowRight } from "@fortawesome/free-solid-svg-icons";

export default function AdminLogin() {
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false
    }
  });

  async function onSubmit(data) {
    setIsSubmitting(true);

    try {
      console.log("Sign in", data);
      navigate("/admin");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <MobileNavBar className={styles.mobileNavBar} />
        <h1 className={styles.heading}>Sign in as Admin</h1>
        <p className={styles.subText}>
          Authorised personnel only. Session expires after 8 hours.
        </p>

        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.field}>
            <label htmlFor="email" className={styles.label}>
              Email address
            </label>
            <input
              id="email"
              type="email"
              className={styles.input}
              placeholder="admin@lfn.com"
              autoComplete="username"
              {...register("email", {
                required: "Email address is required",
                pattern: {
                  value: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
                  message: "Enter a valid email address"
                }
              })}
            />
            {errors.email && (
              <p style={{color: 'crimson', fontSize: '0.875rem'}}className={styles.errorText}>{errors.email.message}</p>
            )}
          </div>

          <div className={styles.field}>
            <label htmlFor="password" className={styles.label}>
              Password
            </label>
            <div className={styles.passwordWrap}>
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                className={styles.input}
                placeholder="Enter your password"
                autoComplete="current-password"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 8,
                    message: "Password must be at least 8 characters"
                  }
                })}
              />
              <button
                type="button"
                className={styles.eyeToggle}
                onClick={() => setShowPassword((prev) => !prev)}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
              </button>
            </div>
            {errors.password && (
              <p style={{color: 'crimson', fontSize: '0.875rem'}} className={styles.errorText}>{errors.password.message}</p>
            )}
          </div>

          <div className={styles.row}>
            <label className={styles.checkboxLabel}>
              <input
                type="checkbox"
                className={styles.checkbox}
                {...register("rememberMe")}
              />
              Remember me
            </label>

            <a href="/admin/forgot-password" className={styles.forgotLink}>
              Forgot password?
            </a>
          </div>

          <button
            type="submit"
            className={styles.submitButton}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Signing in..." : "Sign in to Admin"}
            <FontAwesomeIcon icon={faArrowRight} />
          </button>
        </form>

        <p className={styles.contactText}>
          Need access? Contact{" "}
          <a href="mailto:ops@lfnetwork.com" className={styles.contactLink}>
            ops@lfnetwork.com
          </a>
        </p>
      </div>
    </div>
  );
}