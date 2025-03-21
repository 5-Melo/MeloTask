import React, { useState , useContext } from "react";
import styles from "./SideNavBar.module.css";
import { RiAccountCircleLine } from "react-icons/ri";
import { RxDashboard } from "react-icons/rx";
import { LuBriefcaseBusiness } from "react-icons/lu";
import { FaListCheck, FaRegClock } from "react-icons/fa6";
import { GoStack } from "react-icons/go";
import { FaChevronDown } from "react-icons/fa";
import { useNavigate, useLocation, Outlet } from "react-router-dom";
import Dashboard from "../dashboard/Dashboard.tsx";
import ProjectTemplate from "../projectTemplate/ProjectTemplate.tsx";
import ProjectPage from '../projectsPage/ProjectPage.tsx'
import IssuePopup from "../../components/issuePopup/IssuePopup.tsx";
import GlobalContext, { GlobalContextState } from "../../Context/GlobalContext.tsx";
import Header from "../../components/header/Header.tsx";
import { Project } from "../../types/project.ts";

export default function SideNavBar() {
    const navigate = useNavigate();
    const location = useLocation();
    const {popUp, setPopUp} = useContext(GlobalContext) as GlobalContextState
    const currentProject = sessionStorage.getItem('currentProject')
    ? JSON.parse(sessionStorage.getItem('currentProject')!) as Project 
    : null;
    return (
        <div className={styles["side-nav"]}>
            {popUp ? <IssuePopup create={true} taskid={''}/>:''}
            <Header/>

            <div className={styles["side-nav__grid"]}>
                <aside className={styles["side-nav__sidebar"]}>
                    {location.pathname.startsWith('/dashboard/project/') ? 
                    <div className={styles["side-nav__create-issue"]} onClick={()=>{sessionStorage.removeItem('openedTaskId');setPopUp(true)}}>
                        <div className={styles["side-nav__create-icon"]}>
                            <span>+</span>
                        </div>
                        <h4 className={styles["side-nav__create-title"]}>
                            Create new issue
                        </h4>
                    </div>
                        :
                        <div className={styles["side-nav__create-issue"]}>
                            <div className={styles["side-nav__create-icon"]}>
                                <span>+</span>
                            </div>
                            <h4 className={styles["side-nav__create-title"]}>
                                Create new Project
                            </h4>
                        </div>}
                    <nav className={styles["side-nav__nav"]}>
                        <ul className={styles["side-nav__nav-list"]}>
                            <li className={`${styles["side-nav__nav-item"]} ${location.pathname.startsWith(`/dashboard/project/${currentProject?.id}`)? styles["side-nav__nav-item--active"]:''}`} onClick={()=>{navigate(`/dashboard/project/${currentProject?.id}`)}}><RxDashboard /><span className={styles["side-nav__nav-name"]}>Dashboard</span></li>
                            <li className={`${styles["side-nav__nav-item"]}`}><FaListCheck /><span className={styles["side-nav__nav-name"]}>Backlog</span></li>
                            <li className={`${styles["side-nav__nav-item"]}`}><FaRegClock /><span className={styles["side-nav__nav-name"]}>Gantt Chart</span></li>
                            <li className={`${styles["side-nav__nav-item"]} ${location.pathname === '/dashboard/createProject' ? styles["side-nav__nav-item--active"] : ''}`} onClick={() => { navigate('/dashboard/projectSettings') }}> <GoStack /><span className={styles["side-nav__nav-name"]}>Project Settings</span></li>
                        </ul>
                    </nav>
                </aside>

                <section className={styles["side-nav__content"]}>                    
                  {/* {content} */}
                  <Outlet/>
                </section>
            </div>
        </div>
    );
}
