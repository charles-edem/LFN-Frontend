import styles from './NavBar.module.css';
import { Link } from 'react-router-dom';
export default function NavBar({className = " "}) { 
    return (
        <nav className={`${styles.navbar} ${className}`}>
                <div className={styles.navLeft}>
                  <div className={styles.logoBadge}>LFN</div>
                  <span className={styles.brandName}>Leverage & Freedom Network</span>
                </div>
        
                <div className={styles.navLinks}>
                  <a href="#how-it-works" className={styles.navLink}>How it works</a>
                  <a href="#pricing" className={styles.navLink}>Pricing</a>
                </div>
        
                <div className={styles.navRight}>
                  <Link to="/register" className={styles.joinButton}>Join LFN</Link>
                </div>
              </nav>
    );
}