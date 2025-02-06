import React from "react";
import styles from './Landing.module.css'; 

export default function Landing() {
  return (
    <div className={styles.landing}>
      <div className={styles.landing__header}>
        <h1 className={styles.landing__logo}>MeloTask</h1>
        <ul className={styles.landing__nav}>
          <li><a className={styles.landing__navItem} href="/">Home</a></li>
          <li><a className={styles.landing__navItem} href="/">Contact</a></li>
          <li><a className={styles.landing__navItem} href="/">About</a></li>    
          <li><a className={`${styles.landing__navItem} ${styles.landing__navItemHighlight}`} href="/signin">Sign In</a></li>    
          <li><a className={styles.landing__navItem} href="/signup">Sign up</a></li>    
        </ul>
      </div>
      <img className={`${styles.landing__vector} ${styles.landing__vectorRight}`} src="/vector.png" alt="" />
      <img className={`${styles.landing__vector} ${styles.landing__vectorLeft}`} src="/vector1.png" alt="" />
      <div className={styles.landing__content}>
        <div className={styles.landing__text}>
          <span className={styles.landing__headline}>Get it Done!</span>
          <p className={styles.landing__description}>
            "Keeping Projects Sweet and on Track Like Watermelons in Season!"
          </p>
        </div>
        <div className={styles.landing__image}>
          <img className={styles.landing__illustration} src="/illustration1.png" alt="" />
        </div>
      </div>
    </div>
  );
}
