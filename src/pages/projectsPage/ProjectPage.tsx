import React, { useEffect,useState , useContext} from 'react'
import ProjectCard from './ProjectCard.tsx'
import styles from './projectPage.module.css'
import { FiPlus } from "react-icons/fi";
import { useNavigate, Outlet } from 'react-router-dom';
import GlobalContext from '../../Context/GlobalContext.tsx';



export default function ProjectPage() {
      const userId = localStorage.getItem('userId') || sessionStorage.getItem('userId');
      const token = localStorage.getItem('token') || sessionStorage.getItem('token');
      const navigate = useNavigate();
      // let projects = []
      const {projects ,setProjects} = useContext(GlobalContext);

      useEffect(() => {

            (async() => {
                  console.log(userId);
                  console.log(token);

                  const projectsUrl = `http://localhost:8080/api/users/${userId}/projects`

                  const response = await fetch(projectsUrl, {headers:{'authorization':`Bearer ${token}`}});
                  const data = await response.json();
                  console.log(data);
                  setProjects(data);
            })()
      },[])

  return (
    <div className={styles.projectPage}>

       <div className={styles.createProject} style={{'cursor':'pointer'}} onClick={()=>{navigate('/dashboard/createProject')}}>
            <span className={styles.createProject__plus}>
                  <FiPlus/>      
            </span>
       </div>
       {
            projects.map((project)=>{
                  return(
                        <ProjectCard
                        project={project}
                        />
                  )

            })
       }
    </div>
  )
}
