import React, { useEffect,useState , useContext} from 'react'
import ProjectCard from './ProjectCard.tsx'
import styles from './projectPage.module.css'
import { useNavigate, Outlet } from 'react-router-dom';
import GlobalContext, { GlobalContextState } from '../../Context/GlobalContext.tsx';
import ProjectTemplate from '../projectTemplate/ProjectTemplate.tsx';
import Header from '../../components/header/Header.tsx';


export default function ProjectPage() {
      const [projectModal, setProjectModal] = useState(false)
      const userId = localStorage.getItem('userId') || sessionStorage.getItem('userId');
      const token = localStorage.getItem('token') || sessionStorage.getItem('token');
      const navigate = useNavigate();
      // let projects = []
      const {projects ,setProjects} = useContext(GlobalContext) as GlobalContextState;

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


      function toggleCreateProject(e)
      {
            if (e.target.className === styles['project-page__create-project'] || e.target.className === styles['project-page__content__header__button'])
            setProjectModal(!projectModal)
      }

  return (
    <div className={styles['project-page']}>
      {projectModal?
      <div onClick={toggleCreateProject} className={styles['project-page__create-project']}>
      <ProjectTemplate />
      </div>
       :
        <></>
      }
       <Header/>
       <div className={styles['project-page__content']}>
            <div className={styles['project-page__content__header']}>
                  <h1>Projects</h1>
                  <button onClick={toggleCreateProject} className={styles['project-page__content__header__button']}>Create Project</button>
            </div>
            <div className={styles['project-page__content__projects']}>
            {
                  projects.map((project) => {
                        return(
                              <ProjectCard
                              key={project.id}
                              project={project}
                              /> 
                        )
                  })
            }
            </div>
      </div>
    </div>
  )
}
