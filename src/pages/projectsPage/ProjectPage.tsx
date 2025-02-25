import React from 'react'
import ProjectCard from './ProjectCard.tsx'
import styles from './projectPage.module.css'
export default function ProjectPage() {
  return (
    <div className={styles.projectPage}>
        <ProjectCard
        heading = "project1"
              description="this is a description for project 1 
              this is a description for project 1 
              this is a description for project 1
        "
        />
        <ProjectCard
        heading = "project1"
              description="this is a description for project 1 
              this is a description for project 1 
              this is a description for project 1
        "
        />
        <ProjectCard
        heading = "project1"
              description="this is a description for project 1 
              this is a description for project 1 
              this is a description for project 1
        "
        />
        <ProjectCard
        heading = "project1"
              description="this is a description for project 1 
              this is a description for project 1 
              this is a description for project 1
        "
        />
    </div>
  )
}
