import styles from "./MobileNav.module.css"
export default function MobileNavBar({className = " "})  {
    return (
        <div className={`${styles.logo} ${className}`}>
            <div className={styles.logoBadge}>LFN</div>
            <span className={styles.brandName}>Leverage & Freedom Network</span>
      </div>
    );
}