import React, { useState, useContext, useEffect } from 'react';
import { FaAngleLeft } from "react-icons/fa";
import { FiEdit3 } from "react-icons/fi";
import IssueDetail from '../issueDetail/IssueDetail.tsx';
import styles from './IssuePopup.module.css'; // Import the CSS module
import GlobalContext from '../../Context/GlobalContext.tsx';
import { useParams } from 'react-router-dom';

export default function IssuePopup() {

    const [edit, setEdit] = useState(false);
    const [title, setTitle] = useState('Issue Title');
    const [description, setDescription] = useState('Issue Description');

    const { setPopUp } = useContext(GlobalContext)

    const username = localStorage.getItem('username') || sessionStorage.getItem('username')
    const userId = localStorage.getItem('userId') || sessionStorage.getItem('userId')
    const token = localStorage.getItem('token') || sessionStorage.getItem('token')

    const {id:projectId} = useParams();
    
    const [statuses,setStatuses] = useState([]);
    const [statue, setStatue] = useState('');

    useEffect(()=>{
        (async()=>{
            setStatuses(await getStatuses());
        })()

    },[])
    function backgroundClick(e: React.MouseEvent<HTMLDivElement>)
    {
        if(e.target.className === styles['wrapper'])
         setPopUp(false);
    }
    function issueClick()
    {
        setPopUp(true);

    }
    async function getStatuses()
    {
        const url = `http://localhost:8080/api/users/${userId}/projects/${projectId}/statuses`
        const response = await fetch(url, {method:'GET',headers:{'Content-Type':'application/json','authorization':`Bearer ${token}`}})
        if(response.ok)
        {
            const data = await response.json();
            console.log(data);
            return data;
        }
    }
    async function getTasks()
    {
        const tasksUrl = `http://localhost:8080/api/users/${userId}/projects/${projectId}/tasks`
        const response = await fetch(tasksUrl,{method:'GET',headers:{'authorization':`Bearer ${token}`}})
        const data = await response.json()
        console.log(response)
        console.log(data);
        
    }
    async function saveTask(){
        const task={
            title,
            description,    
            assigneeIds:[],
            statusId:statue.id,
            labelIds:[],
            dependencyIds:[],
            dueDate: "",
            startDate: "",
            endDate: "",
            estimatedHours: 10,
            actualHours: 5,
            projectId

            
        }        
        await getTasks();
        await postTask(task);
        setPopUp(false);

        
    }
    async function postTask(task: any)
    {
        console.log(task);
        
        const saveTaskUrl = `http://localhost:8080/api/users/${userId}/projects/${projectId}/tasks`
        const response = await fetch(saveTaskUrl, { method: 'POST', headers: { 'authorization': `Bearer ${token}`, 'Content-Type': 'application/json' }, body: JSON.stringify(task) })
        const data = await response.json();
        console.log(data);
        console.log(response);
        
    }

    return (
        <div className={styles["wrapper"]} onClick={backgroundClick}>
            <div className={styles["issue-popup"]} onClick={issueClick}>
                <div className={styles["issue-popup__header"]}>
                    <div className={styles["issue-popup__header-left"]}>
                        <FaAngleLeft className={styles["issue-popup__back-icon"] as string} />
                        <h1 className={styles["issue-popup__project-name"]}>Project Name</h1>
                    </div>
                    {
                        !edit ?
                            <FiEdit3 onClick={() => { setEdit(true); }} className={styles["issue-popup__edit-icon"] as string} />
                            :
                            <button className={styles["issue-popup__save"]} onClick={() => { setEdit(false); }}>Save</button>
                    }
                </div>

                {/* Labels Component (Placeholder) */}
                <div className={styles["issue-popup__labels"]}>
                    {/* Add labels component here */}
                </div>


                <form action="">
                <div className={styles["issue-popup__content"]}>
                    <h2 className={styles["issue-popup__subtitle"]}>Title:</h2>
                        {edit ? <input type='text' name='title' id='title' onChange={(e)=>{setTitle(e.target.value)}} className={`${styles["issue-popup__title"]} ${styles['issue-popup--activeInput']}`} defaultValue={title}/> : <p className={`${styles["issue-popup__title"]}`} >{title}</p>}
                    <div className={styles["issue-popup__description"]}>
                        <h2 className={styles["issue-popup__subtitle"]}>Description:</h2>
                            {
                                edit ? <input type='text' onChange={(e) => { setDescription(e.target.value) }} className={`${styles["issue-popup__description-text"]} ${styles['issue-popup--activeInput']}`} defaultValue={description} Issue Description />:
                                    <p className={`${styles["issue-popup__description-text"]} `}>{description}</p>
                            }
                </div>
                </div>
                </form>

                {/* Issue Details Component */}
                <div className={styles["issue-popup__details"]}>
                    <IssueDetail title="Created By" avatar={true} name={username || undefined}/>
                    <IssueDetail title="Assigned to" avatar={true} add={edit} />
                    <IssueDetail title="Dependencies" add={edit} />
                    <IssueDetail title="Status" color={true} add={edit} selectBox={true} statuses={statuses}/>
                    <IssueDetail title="Label" color={true} add={edit} />
                </div>
                <button className={styles['issue-popup__createButton']} onClick={saveTask}>Create</button>
            </div>
        </div>
    );
}