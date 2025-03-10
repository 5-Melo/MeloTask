import React, { useState, useContext, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaAngleLeft } from "react-icons/fa";
import { FiEdit3 } from "react-icons/fi";
import IssueDetail from '../issueDetail/IssueDetail.tsx';
import styles from './IssuePopup.module.css'; 
import GlobalContext from '../../Context/GlobalContext.tsx';
import { useParams } from 'react-router-dom';

export default function IssuePopup({ create = false, taskid }) {

    const [edit, setEdit] = useState(create);
    const [title, setTitle] = useState('Issue Title');
    const [description, setDescription] = useState('Issue Description');

    const { setPopUp } = useContext(GlobalContext)
    const { projects } = useContext(GlobalContext)
    const username = localStorage.getItem('username') || sessionStorage.getItem('username')
    const userId = localStorage.getItem('userId') || sessionStorage.getItem('userId')
    const token = localStorage.getItem('token') || sessionStorage.getItem('token')

    const { id: projectId } = useParams();

    const [statuses, setStatuses] = useState([]);
    const [statue, setStatue] = useState('');
    const [labels, setLabels] = useState([]);
    const [assignees, setAssignees] = useState([]);
    const [dependencies, setDependencies] = useState([]);

    const [allLabels, setAllLabels] = useState([]);
    const [allAssignees, setAllAssignees] = useState([]);
    const [allTasks, setAllTasks] = useState([]);

    useEffect(() => {
        (async () => {
            const fetchedStatuses = await getStatuses();
            await setStatuses(fetchedStatuses);
            await getLabels();
            await getmembers();
            await getTasks();
            if (create && fetchedStatuses.length > 0) {
                const s = fetchedStatuses[0].id;
                setStatue(s);
            }
            if (taskid) {
                const taskData = await getTaskById(taskid);
                if (taskData) {
                    setTitle(taskData.title);
                    setDescription(taskData.description);
                    setStatue(taskData.statusId);
                    setLabels(taskData.labels.map(label => label.name));
                    setAssignees(taskData.assignees.map(assignee => assignee.name));
                    setDependencies(taskData.dependencies.map(dependency => dependency.title));
                }
            }
        })()
    }, [taskid, create]);

    async function getTaskById(taskId) {
        const taskUrl = `http://localhost:8080/api/users/${userId}/projects/${projectId}/tasks/${taskId}`;
        const response = await fetch(taskUrl, { method: 'GET', headers: { 'authorization': `Bearer ${token}` } });
        if (response.ok) {
            const data = await response.json();
            return data;
        }
        return null;
    }

    function backgroundClick(e: React.MouseEvent<HTMLDivElement>) {
        if (e.target.className === styles['wrapper'])
            setPopUp(false);
    }

    function issueClick() {
        setPopUp(true);
    }

    async function getStatuses() {
        const url = `http://localhost:8080/api/users/${userId}/projects/${projectId}/statuses`;
        const response = await fetch(url, { method: 'GET', headers: { 'Content-Type': 'application/json', 'authorization': `Bearer ${token}` } });
        if (response.ok) {
            const data = await response.json();
            return data;
        }
    }

    async function getTasks() {
        const tasksUrl = `http://localhost:8080/api/users/${userId}/projects/${projectId}/tasks`;
        const response = await fetch(tasksUrl, { method: 'GET', headers: { 'authorization': `Bearer ${token}` } });
        const data = await response.json();
        setAllTasks(data);
    }

    async function getLabels() {
        const labelsUrl = `http://localhost:8080/api/users/${userId}/projects/${projectId}/labels`;
        const response = await fetch(labelsUrl, { method: 'GET', headers: { 'authorization': `Bearer ${token}` } });
        const data = await response.json();
        await setAllLabels(data);
    }

    async function getmembers() {
        const project = projects.find((project) => project.id === projectId);
        if (project) {
            const teamMembers = await Promise.all(
                project.teamMembers.map(async (memberId) => {
                    const response = await fetch(`http://localhost:8080/api/users/${memberId}`, {
                        method: 'GET',
                        headers: { 'authorization': `Bearer ${token}` }
                    });
                    if (response.ok) {
                        return await response.json();
                    }
                    return null;
                })
            );
            setAllAssignees(teamMembers.filter(member => member !== null));
        }
    }

    async function saveTask() {
        const task = {
            title,
            description,
            assigneeIds: [],
            statusId: statue,
            labelIds: labels.map(label => {
                const foundLabel = allLabels.find(l => l.name === label);
                return foundLabel ? foundLabel.id : null;
            }).filter(id => id !== null),
            dependencyIds: dependencies.map(dependency => {
                const foundTask = allTasks.find(task => task.title === dependency);
                return foundTask ? foundTask.id : null;
            }).filter(id => id !== null),
            dueDate: "",
            startDate: "",
            endDate: "",
            estimatedHours: 10,
            actualHours: 5,
            projectId
        };
        await postTask(task);
    }

    async function postTask(task) {
        const saveTaskUrl = `http://localhost:8080/api/users/${userId}/projects/${projectId}/tasks`;
        const response = await fetch(saveTaskUrl, { method: 'POST', headers: { 'authorization': `Bearer ${token}`, 'Content-Type': 'application/json' }, body: JSON.stringify(task) });
        if (response.ok) {
            toast.success('Task Created Successfully');
        } else {
            toast.error('Task Creation Failed');
        }
    }

    async function handleSave() {
        await getLabels();
        await setEdit(false);
        await saveTask();
    }

    return (
        <div className={styles["wrapper"]} onClick={backgroundClick}>
            <ToastContainer />
            <div className={styles["issue-popup"]} onClick={issueClick}>
                <div className={styles["issue-popup__header"]}>
                    <div className={styles["issue-popup__header-left"]}>
                        <FaAngleLeft  className={styles["issue-popup__back-icon"] as string} />
                        <h1 className={styles["issue-popup__project-name"]}>Project Name</h1>
                    </div>
                    {
                        !edit ?
                            <FiEdit3 onClick={() => { setEdit(true); }} className={styles["issue-popup__edit-icon"] as string} />
                            :
                            <button className={styles["issue-popup__save"]} onClick={() => { handleSave() }}>Save</button>
                    }
                </div>

                <form action="">
                    <div className={styles["issue-popup__content"]}>
                        <h2 className={styles["issue-popup__subtitle"]}>Title:</h2>
                        {edit ? <input type='text' name='title' id='title' onChange={(e) => { setTitle(e.target.value) }} className={`${styles["issue-popup__title"]} ${styles['issue-popup--activeInput']}`} placeholder={title} /> : <p className={`${styles["issue-popup__title"]}`} >{title}</p>}
                        <div className={styles["issue-popup__description"]}>
                            <h2 className={styles["issue-popup__subtitle"]}>Description:</h2>
                            {
                                edit ? <input type='text' onChange={(e) => { setDescription(e.target.value) }} className={`${styles["issue-popup__description-text"]} ${styles['issue-popup--activeInput']}`} placeholder={description} Issue Description /> :
                                    <p className={`${styles["issue-popup__description-text"]} `}>{description}</p>
                            }
                        </div>
                    </div>
                </form>

                {/* Issue Details Component */}
                <div className={styles["issue-popup__details"]}>
                    {/* <IssueDetail title="Created By" avatar={true} attributes={[username]} options={[]} /> */}
                    <IssueDetail title="Assigned to" avatar={true} add={edit} attributes={assignees} setAttributes={setAssignees} options={allAssignees.map(user => user.username)} />
                    <IssueDetail title="Dependencies" add={edit} attributes={dependencies} setAttributes={setDependencies} options={allTasks.map(task => task.title)} />
                    <IssueDetail title="Labels" add={edit} labelcreate={true} attributes={labels} setAttributes={setLabels} options={allLabels.map(label => label.name)} />
                    <div className={styles["issue-popup__status"]}>
                        <h4 className={styles["issue-popup__subtitle"]}>Status:</h4>
                        {edit ? (
                            <select
                                className={`${styles["issue-popup__status-select"]} ${styles['issue-popup--activeInput']}`}
                                onChange={(e) => setStatue(e.target.value)}
                                value={statue}
                            >
                                {statuses.map((status) => (
                                    <option key={status.id} value={status.id}>
                                        {status.name}
                                    </option>
                                ))}
                            </select>
                        ) : (
                            <p className={styles["issue-popup__status-text"]}>
                                {statuses.find((status) => status.id === statue)?.name || "No Status"}
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}