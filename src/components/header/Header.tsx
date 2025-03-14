import React, { useState } from 'react'
import styles from './Header.module.css'
import { RiAccountCircleLine } from 'react-icons/ri'
import { FaChevronDown } from 'react-icons/fa'

export default function Header() {

    const handleLogout = () => {
        sessionStorage.clear();
        localStorage.clear();
        window.location.href = '/';
    };

    

    return (
        <header className={styles.header}>
            <div className={styles.logo}>
                <h2 className={styles.logoText}>MeloTask</h2>
                {/* <h1 className={styles.title}>{activePage}</h1> */}
            </div>
            <div className={styles.profile}>
                <div className={styles.profileMain}>
                    <RiAccountCircleLine className={styles.profileIcon} />
                    <div className={styles.profileInfo}>
                        <span className={styles.profileName}>John Doe</span>
                        <span className={styles.profileRole}>Role</span>
                    </div>
                </div>
                <FaChevronDown className={styles.profileDown} />
                <div className={styles.dropdownMenu}>
                    <div className={styles.dropdownItem}>Account</div>
                    <div className={styles.dropdownItem}>Projects</div>
                    <div className={styles.dropdownItem} onClick={handleLogout}>Logout</div>
                </div>
            </div>
        </header>
    )
}
