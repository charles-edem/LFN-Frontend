import { useForm, useWatch } from "react-hook-form";
import { useEffect } from "react";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import { useContext } from "react";
import { AuthContext } from "../lib/AuthContext";

import styles from "./RegistrationPage.module.css";
import { registerUser } from "../lib/mockApi";

import { Controller } from "react-hook-form";
import Dropdown from "../components/Dropdown";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChartLine,
  faUsers,
  faShieldHalved,
} from "@fortawesome/free-solid-svg-icons";

export default function RegistrationPage() {
  const {setUserData, setRegistrationStep} = useContext(AuthContext)
  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors, isValid },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      age_range: "",
      how_did_you_hear: "",
    },
  });

  const navigate = useNavigate();

  const normalizeGhanaPhone = (phone) => {
    if (!phone) return "";
    if (phone.startsWith("0")) {
      return `+233${phone.substring(1)}`;
    }
    return phone;
  };

  const [submitError, setSubmitError] = useState(null);

  async function onSubmit(data) {
    const timestamp = new Date().toISOString();

    const registrationData = {
      firstName: data.first_name,
      lastName: data.last_name,
      mobile: normalizeGhanaPhone(data.mobile),
      whatsappNumber: normalizeGhanaPhone(data.whatsapp),
      email: data.email,
      ageRange: data.age_range,
      referredBy: data.referred_by || null,
      howDidYouHear: data.how_did_you_hear,
      universityCommunity: data.university_community || null,
      consents: {
        communications: {
          accepted: data.consent_communications,
          acceptedAt: data.consent_communications ? timestamp : null,
        },
        communityParticipation: {
          accepted: data.community_participation,
          acceptedAt: data.community_participation ? timestamp : null,
        },
        imageVideoUsage: {
          accepted: data.image_video_usage,
          acceptedAt: data.image_video_usage ? timestamp : null,
        },
      }
    };

    try {
      const response = await registerUser(registrationData);
      setUserData(registrationData); 
      setRegistrationStep(1);

      if (response.success) {
        navigate("/verify");
        console.log("Registration successful");
      } else {
        setSubmitError(response.message || "Registration failed");
      }
    } catch {
      setSubmitError(
        "Something went wrong. Please check your connection and try again.",
      );
    }
  }

  const universityCommunityValue = useWatch({
    control,
    name: "how_did_you_hear",
  });

  const mobileValue = useWatch({ control, name: "mobile" });
  const whatsappValue = useWatch({ control, name: "whatsapp" });

  useEffect(() => {
    const isValidMobile = /^(?:\+233|0)(2[0-9]|5[0-9])[0-9]{7}$/.test(
      mobileValue || "",
    );

    if (isValidMobile && !whatsappValue) {
      setValue("whatsapp", mobileValue);
    }
  }, [mobileValue, whatsappValue, setValue]);

  const [searchParams] = useSearchParams();
  const referralCode = searchParams.get("ref");
  const hasReferralLink = Boolean(referralCode);

  return (
    <div className={styles.page}>
      <div className={styles.leftPanel}>
        <h1 className={styles.heading}>
          Create your
          <br />
          LFN account
        </h1>
        <p className={styles.subtext}>
          Join our growing community of members building trust in every review.
        </p>

        <div className={styles.featureList}>
          <div className={styles.featureItem}>
            <div className={styles.iconCircle}>
              <FontAwesomeIcon icon={faChartLine} />
            </div>
            <div>
              <p className={styles.featureTitle}>Real Feedback</p>
              <p className={styles.featureDesc}>
                Get paid for honest, verified feedback.
              </p>
            </div>
          </div>
          <div className={styles.featureItem}>
            <div className={styles.iconCircle}>
              <FontAwesomeIcon icon={faUsers} />
            </div>
            <div>
              <p className={styles.featureTitle}>Accountable community</p>
              <p className={styles.featureDesc}>
                Peer-validated, not anonymous.
              </p>
            </div>
          </div>
          <div className={styles.featureItem}>
            <div className={styles.iconCircle}>
              <FontAwesomeIcon icon={faShieldHalved} />
            </div>
            <div>
              <p className={styles.featureTitle}>No gatekeeping</p>
              <p className={styles.featureDesc}>
                Transparent rewards, disclosed every time.
              </p>
            </div>
          </div>
        </div>

        <hr className={styles.divider} />

        <div className={styles.statsRow}>
          <div>
            <p className={styles.statNumber}>4,200+</p>
            <p className={styles.statLabel}>Active members</p>
          </div>
          <div>
            <p className={styles.statNumber}>$2.4M</p>
            <p className={styles.statLabel}>Total Rewards Paid</p>
          </div>
          <div>
            <p className={styles.statNumber}>93%</p>
            <p className={styles.statLabel}>Satisfaction Rate</p>
          </div>
        </div>
        <div className={styles.avatarSection}>
          <div className={styles.avatarRow}>
            <div className={styles.avatar}></div>
            <div className={styles.avatar}></div>
            <div className={styles.avatar}></div>
            <div className={styles.avatar}></div>
            <div className={styles.avatar}></div>
          </div>
          <span style={{ fontSize: "12px", color: "#dbeafe" }}>
            Joined this week
          </span>
        </div>
      </div>

      <div className={styles.formCard}>
        <div className={styles.mobileHeader}>
          <div className={styles.mobileBrandRow}>
            <button
              className={styles.backButton}
              type="button"
              onClick={() => navigate(-1)}
            >
              <span className={styles.backIcon}>‹</span>
            </button>
            <div className={styles.logoBadge}>LFN</div>
            <p className={styles.mobileTitle}>Create your account</p>
          </div>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.row}>
            <div className={styles.field}>
              <label className={styles.label}>First Name</label>
              <input
                className={styles.input}
                type="text"
                {...register("first_name", {
                  required: "First name is required",
                  setValueAs: (value) => value.trim(),
                  minLength: {
                    value: 2,
                    message: "First name must be at least 2 characters",
                  },
                })}
              />
              {errors.first_name && (
                <p className={styles.errorText}>{errors.first_name.message}</p>
              )}
            </div>

            <div className={styles.field}>
              <label className={styles.label}>Last Name</label>
              <input
                className={styles.input}
                type="text"
                {...register("last_name", {
                  required: "Last name is required",
                  setValueAs: (value) => value.trim(),
                  minLength: {
                    value: 2,
                    message: "Last name must be at least 2 characters",
                  },
                })}
              />
              {errors.last_name && (
                <p className={styles.errorText}>{errors.last_name.message}</p>
              )}
            </div>
          </div>

          <div className={styles.row}>
            <div className={styles.field}>
              <label className={styles.label}>Mobile Number</label>
              <input
                className={styles.input}
                type="tel"
                placeholder="+233 24 000 0000"
                {...register("mobile", {
                  required: "Mobile number is required",
                  setValueAs: (value) => value.replace(/\s+/g, ""),
                  pattern: {
                    value: /^(?:\+233|0)(2[0-9]|5[0-9])[0-9]{7}$/,
                    message: "Enter a valid Ghanaian mobile number",
                  },
                })}
              />
              <p className={styles.hint}>Include country code</p>
              {errors.mobile && (
                <p className={styles.errorText}>{errors.mobile.message}</p>
              )}
            </div>

            <div className={styles.field}>
              <label className={styles.label}>WhatsApp Number</label>
              <input
                className={styles.input}
                type="tel"
                {...register("whatsapp", {
                  required: "Whatsapp number is required",
                  setValueAs: (value) => value.replace(/\s+/g, ""),
                  pattern: {
                    value: /^(?:\+233|0)(2[0-9]|5[0-9])[0-9]{7}$/,
                    message: "Enter a valid Ghanaian mobile number",
                  },
                })}
              />
              <p className={styles.hint}>Edit if different</p>
              {errors.whatsapp && (
                <p className={styles.errorText}>{errors.whatsapp.message}</p>
              )}
            </div>
          </div>

          <div className={styles.field}>
            <label className={styles.label}>Email Address</label>
            <input
              className={styles.input}
              type="email"
              placeholder="your@example.com"
              {...register("email", {
                required: "Email address is required",
                setValueAs: (value) => value.trim(),
                pattern: {
                  value: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
                  message: "Enter a valid email address",
                },
              })}
            />
            {errors.email && (
              <p className={styles.errorText}>{errors.email.message}</p>
            )}
          </div>

          <div className={styles.row}>
            <div className={styles.field}>
              <label className={styles.label}>Age Range</label>
              <Controller
                name="age_range"
                control={control}
                rules={{
                  required: "Age range is required",
                }}
                render={({ field }) => (
                  <Dropdown
                    value={field.value}
                    onChange={field.onChange}
                    placeholder="Select range"
                    options={[
                      {
                        value: "18-24",
                        label: "18-24",
                      },
                      {
                        value: "25-34",
                        label: "25-34",
                      },
                      {
                        value: "35-44",
                        label: "35-44",
                      },
                      {
                        value: "45+",
                        label: "45+",
                      },
                    ]}
                    error={errors.age_range?.message}
                  />
                )}
              />
            </div>

            <div className={styles.field}>
              <label className={styles.label}>Referral code (optional)</label>
              <input
                className={styles.input}
                type="text"
                readOnly={hasReferralLink}
                defaultValue={referralCode || ""}
                {...register("referred_by")}
              />
              {hasReferralLink && <p className={styles.hintSuccess}>Applied</p>}
            </div>
          </div>

          <div className={styles.field}>
            <label className={styles.label}>How did you hear about us?</label>
            <Controller
              name="how_did_you_hear"
              control={control}
              rules={{
                required: "Please select an option",
              }}
              render={({ field }) => (
                <Dropdown
                  value={field.value}
                  onChange={field.onChange}
                  placeholder="Select a source"
                  options={[
                    {
                      value: "instagram",
                      label: "Instagram",
                    },
                    {
                      value: "tiktok",
                      label: "TikTok",
                    },
                    {
                      value: "facebook",
                      label: "Facebook",
                    },
                    {
                      value: "university-community",
                      label: "University/Community",
                    },
                    {
                      value: "snapchat",
                      label: "Snapchat",
                    },
                    {
                      value: "linkedin",
                      label: "LinkedIn",
                    },
                    {
                      value: "x",
                      label: "X",
                    },
                    {
                      value: "word-of-mouth",
                      label: "Word of Mouth",
                    },
                    {
                      value: "email",
                      label: "Email",
                    },
                    {
                      value: "pulse-africa",
                      label: "Pulse Africa",
                    },
                    {
                      value: "space-jam-event",
                      label: "Space Jam Event",
                    },
                    {
                      value: "other",
                      label: "Other",
                    },
                  ]}
                  error={errors.how_did_you_hear?.message}
                />
              )}
            />
          </div>

          {universityCommunityValue === "university-community" && (
            <div className={styles.field}>
              <label className={styles.label}>University/Community</label>
              <input
                className={styles.input}
                type="text"
                {...register("university_community", {
                  required: "This field is required",
                  setValueAs: (value) => value.trim(),
                })}
              />
            </div>
          )}

          <div className={styles.checkboxGroup}>
            <label className={styles.checkboxLabel}>
              <input
                type="checkbox"
                {...register("consent_communications", {
                  required: "Please agree to receive communications",
                })}
              />
              I agree to receive communications from LFN including updates,
              announcements and offers.
            </label>
            {errors.consent_communications && (
              <p className={styles.errorText}>
                {errors.consent_communications.message}
              </p>
            )}

            <label className={styles.checkboxLabel}>
              <input
                type="checkbox"
                {...register("community_participation", {
                  required: "Please agree to participate in the community",
                })}
              />
              I agree to participate in the LFN community in line with community
              guidelines.
            </label>
            {errors.community_participation && (
              <p className={styles.errorText}>
                {errors.community_participation.message}
              </p>
            )}

            <label className={styles.checkboxLabel}>
              <input
                type="checkbox"
                {...register("image_video_usage", {
                  required:
                    "Please agree to the potential use of your image and/or video",
                })}
              />
              I agree to the potential use of my image and/or video in LFN
              content.
            </label>
            {errors.image_video_usage && (
              <p className={styles.errorText}>
                {errors.image_video_usage.message}
              </p>
            )}
          </div>

          <button
            className={`${styles.submitButton} ${!isValid ? styles.disabledButton : ""}`}
            type="submit"
            disabled={!isValid}
          >
            Join LFN
          </button>
          {submitError && <p className={styles.errorText}>{submitError}</p>}
        </form>
      </div>
    </div>
  );
}
