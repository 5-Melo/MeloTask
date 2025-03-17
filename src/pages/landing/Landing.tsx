import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styles from './Landing.module.css';
import Header from "../../components/header/Header";
import { isValidToken } from "../../utils/auth";
import { FaChevronDown } from "react-icons/fa";
import { RiAccountCircleLine } from "react-icons/ri";
import styles2 from '../../components/header/Header.module.css'

interface UserData {
    username: string;
    email: string;
}

export default function Landing() {
  const navigate = useNavigate();
  const isAuthenticated = isValidToken();
  const [userData, setUserData] = useState<UserData | null>(null);
  const userId = localStorage.getItem('userId') || sessionStorage.getItem('userId');
  const token = localStorage.getItem('token') || sessionStorage.getItem('token');

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/users/${userId}`, {
          headers: {
            'authorization': `Bearer ${token}`
          }
        });
        
        if (response.ok) {
          const data = await response.json();
          setUserData(data);
        } else {
          console.error('Failed to fetch user data');
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    if (userId && token && isAuthenticated) {
      fetchUserData();
    }
  }, [userId, token, isAuthenticated]);

  const handleLogout = () => {
    sessionStorage.clear();
    localStorage.clear();
    navigate('/')
  };


  return (
    <div className={styles.landing}>
      <div className={styles.landing__header}>
        <h1 className={styles.landing__logo} onClick={() => navigate('/')}>MeloTask</h1>
        <ul className={styles.landing__nav}>
          <li><a className={styles.landing__navItem} href="/">Home</a></li>
          <li><a className={styles.landing__navItem} href="/">Contact</a></li>
          <li><a className={styles.landing__navItem} href="/">About</a></li>    
          {isAuthenticated ? (
            <>
              <div className={styles2.profile}>
                <div className={styles2.profileMain}>
                  <RiAccountCircleLine className={styles2.profileIcon} />
                  <div className={styles2.profileInfo}>
                    <span className={styles2.profileName}>{userData?.username || 'Loading...'}</span>
                    <span className={styles2.profileEmail}>{userData?.email}</span>
                  </div>
                </div>
                <FaChevronDown className={styles2.profileDown} />
                <div className={styles2.dropdownMenu}>
                  <div className={styles2.dropdownItem} onClick={() => navigate('/account')}>Account</div>
                  <div className={styles2.dropdownItem} onClick={() => navigate('/projects')}>Projects</div>
                  <div className={styles2.dropdownItem} onClick={handleLogout}>Logout</div>
                </div>
              </div>
            </>
          ) : (
            <>
              <li><a className={`${styles.landing__navItem} ${styles.landing__navItemHighlight}`} href="/login">Log In</a></li>    
              <li><a className={styles.landing__navItem} href="/signup">Sign up</a></li>    
            </>
          )}
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
