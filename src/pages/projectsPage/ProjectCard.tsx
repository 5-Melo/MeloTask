import React from 'react'
import styles from './projectCard.module.css'
export default function ProjectCard(props) {
  return (
        <div className={styles.pageCard}>
            <div className={styles.pageCard__container}>
                <div>
                     <h2 className={styles.pageCard__heading}>{props.heading}</h2>
                      <div className={styles.pageCard__description}>{props.description}</div>
                </div>
                <button className={styles.pageCard__leaveButton}>Leave</button>
            </div>
        </div>
  )
}
