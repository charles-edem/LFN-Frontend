import { useState, useRef, useEffect } from "react";
import styles from "./Dropdown.module.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";

export default function Dropdown({
  options,
  value,
  onChange,
  placeholder = "Select option",
  error,
}) {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  const selectedOption = options.find(
    (option) => option.value === value
  );

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setOpen(false);
      }
    }

    document.addEventListener(
      "mousedown",
      handleClickOutside
    );

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
    };
  }, []);

  return (
    <div 
      className={styles.container}
      ref={dropdownRef}
    >
      <button
        type="button"
        className={`${styles.trigger} ${
          open ? styles.active : ""
        }`}
        onClick={() => setOpen(!open)}
      >
        <span className={!selectedOption ? styles.placeholder : ""}>
          {selectedOption?.label || placeholder}
        </span>

        <span className={styles.arrow}>
          <FontAwesomeIcon icon={faChevronDown} />
        </span>
      </button>


      {open && (
        <div className={styles.menu}>
          {options.map((option) => (
            <button
              type="button"
              key={option.value}
              className={`${styles.option} ${
                option.value === value
                  ? styles.selected
                  : ""
              }`}
              onClick={() => {
                onChange(option.value);
                setOpen(false);
              }}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}

      {error && (
        <p className={styles.error}>
          {error}
        </p>
      )}
    </div>
  );
}