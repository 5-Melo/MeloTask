import React from 'react';
import styles from './figure.module.css'

interface props {
    parentStyles: object;
}
function Figure({parentStyles} : props) {
    return (
        <div className={`${styles.container} ${parentStyles.figure}`}>
            <div className={styles.heading}>
                <h2>hey There!</h2>
                <h2>let's pick up where we left off</h2>
            </div>
            <img className={styles.img} src="Illustration.png" alt="" />
        </div>
    );
}

export default Figure;

