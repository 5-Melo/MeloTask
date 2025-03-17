import React, {useContext}from 'react'
import styles from './projectCard.module.css'
import GlobalContext, { GlobalContextState } from '../../Context/GlobalContext.tsx';
import { useNavigate } from 'react-router-dom';
import {Project} from '../../types/project.ts'

interface ProjectCardProps {
  project: Project;
}
export default function ProjectCard({project}:ProjectCardProps) {

  const userId = localStorage.getItem('userId') || sessionStorage.getItem('userId');
  const token = localStorage.getItem('token') || sessionStorage.getItem('token');
  const navigate = useNavigate();

  function navProjectPage(e)
  {
    console.log(e.target.tagName);
   
    sessionStorage.setItem('currentProject', JSON.stringify(project));
    navigate(`/dashboard/project/${project.id}`)
      

    
  }


  return (
        <div className={styles.pageCard}style={{cursor:'pointer'}} onClick={navProjectPage}>
            <div className={styles.pageCard__container}>
                <div>
                     <h2 className={styles.pageCard__heading} title={project.title}>{project.title}</h2>
                     <div className={styles.pageCard__description}>{project.description}</div>
                </div>
            </div>
        </div>
  )
}
