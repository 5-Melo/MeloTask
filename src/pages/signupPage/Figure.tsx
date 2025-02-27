import React from 'react';
import styles from './figure.module.css'

interface props {
    parentStyles: {figure: string};
}

const Figure: React.FC<props> = ({ parentStyles }) => {
return (
        <div className={`${styles.container} ${parentStyles.figure}`}>
            <div className={styles.heading}>
                <h2>start your projects</h2>
                <h2>"Empowering you to stay organized and achieve more with our cutting-edge tools."</h2>
            </div>
            <img className={styles.img} src="Illustration.png" alt="" />
        </div>
    );
}

export default Figure;

