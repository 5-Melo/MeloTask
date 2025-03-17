import React, { useState, useEffect } from 'react'
import styles from './Header.module.css'
import { RiAccountCircleLine } from 'react-icons/ri'
import { FaChevronDown } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'

interface UserData {
    username: string;
    email: string;
}

export default function Header() {
    const navigate = useNavigate();
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

        if (userId && token) {
            fetchUserData();
        }
    }, [userId, token]);

    const handleLogout = () => {
        sessionStorage.clear();
        localStorage.clear();
        navigate('/');
    };

    return (
        <header className={styles.header}>
            <div className={styles.logo}>
                <h2 className={styles.logoText} onClick={() => navigate('/')}>MeloTask</h2>
            </div>
            <div className={styles.profile}>
                <div className={styles.profileMain}>
                    <RiAccountCircleLine className={styles.profileIcon} />
                    <div className={styles.profileInfo}>
                        <span className={styles.profileName}>{userData?.username || 'Loading...'}</span>
                        <span className={styles.profileEmail}>{userData?.email}</span>
                    </div>
                </div>
                <FaChevronDown className={styles.profileDown} />
                <div className={styles.dropdownMenu}>
                    <div className={styles.dropdownItem} onClick={() => navigate('/account')}>Account</div>
                    <div className={styles.dropdownItem} onClick={() => navigate('/projects')}>Projects</div>
                    <div className={styles.dropdownItem} onClick={handleLogout}>Logout</div>
                </div>
            </div>
        </header>
    )
}
