import React, {useContext}from 'react'
import styles from './projectCard.module.css'
import GlobalContext from '../../Context/GlobalContext.tsx';
import { useNavigate } from 'react-router-dom';

export default function ProjectCard(props) {


  const navigate = useNavigate();


  function navProjectPage(e)
  {
    console.log(e);
    navigate(`/dashboard/projects/${props.project.id}`)
    
  }

  

  return (
        <div className={styles.pageCard}style={{cursor:'pointer'}} onClick={navProjectPage}>
            <div className={styles.pageCard__container}>
                <div>
                     <h2 className={styles.pageCard__heading}>{props.project.title}</h2>
                     <div className={styles.pageCard__description}>{props.project.description}</div>
                </div>
                <button className={styles.pageCard__leaveButton}>Leave</button>
            </div>
        </div>
  )
}
