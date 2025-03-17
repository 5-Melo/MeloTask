import React, { useState, useContext, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaAngleLeft } from "react-icons/fa";
import { FiEdit3 } from "react-icons/fi";
import IssueDetail from '../issueDetail/IssueDetail';
import styles from './IssuePopup.module.css'; 
import GlobalContext, { GlobalContextState } from '../../Context/GlobalContext';
import { useParams } from 'react-router-dom';
import { Task } from '../../types/task';
import { AiOutlineLoading } from "react-icons/ai";

interface IssuePopupProps {
  create?: boolean;
  taskid?: string;
}

// Extended Task interface with the properties needed by this component
interface ExtendedTask extends Task {
  assigneeIds?: string[];
  labels?: Array<{ id: string; name: string; color: string }>;
  assignees?: Array<{ id: string; username: string }>;
  dependencies?: Array<{ id: string; title: string }>;
}

// Label interface
interface Label {
  id: string;
  name: string;
  color: string;
}

// TeamMember interface
interface TeamMember {
  id: string;
  username: string;
  name?: string;
}

export default function IssuePopup({ create = false, taskid: propTaskId }: IssuePopupProps) {
    const [edit, setEdit] = useState<boolean>(true);
    const [title, setTitle] = useState<string>('');
    const [description, setDescription] = useState<string>('');

    const { setPopUp } = useContext(GlobalContext) as GlobalContextState;
    const { projects } = useContext(GlobalContext) as GlobalContextState;
    const username = localStorage.getItem('username') || sessionStorage.getItem('username');
    const userId = localStorage.getItem('userId') || sessionStorage.getItem('userId');
    const token = localStorage.getItem('token') || sessionStorage.getItem('token');
    const openedTaskId = sessionStorage.getItem('openedTaskId');
    const taskid = openedTaskId || propTaskId;
    const { id: projectId } = useParams<{ id: string }>();

    const [statuses, setStatuses] = useState<Array<{ id: string; name: string }>>([]);
    const [statue, setStatue] = useState<string>('');
    const [labels, setLabels] = useState<(string | null)[]>([]);
    const [assignees, setAssignees] = useState<(string | null)[]>([]);
    const [dependencies, setDependencies] = useState<(string | null)[]>([]);

    const [allLabels, setAllLabels] = useState<Label[]>([]);
    const [allAssignees, setAllAssignees] = useState<TeamMember[]>([]);
    const [allTasks, setAllTasks] = useState<Task[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const {statuses: AllStatuses, setStatuses: setAllStatuses} = useContext(GlobalContext) as GlobalContextState;

    useEffect(() => {
        const initializeData = async () => {
            try {
                const fetchedStatuses = await getStatuses();
                if (fetchedStatuses) {
                    setStatuses(fetchedStatuses);
                }
                await getLabels();
                await getmembers();
                await getTasks();
                
                if (create && fetchedStatuses && fetchedStatuses.length > 0) {
                    const s = fetchedStatuses[0].id;
                    setStatue(s);
                }
                
                if (taskid) {
                    setEdit(false);
                    const taskData = await getTaskById(taskid);
                    if (taskData) {
                        setTitle(taskData.title);
                        setDescription(taskData.description);
                        setStatue(taskData.statusId);
                        
                        if (taskData.labels) {
                            setLabels(taskData.labels.map(label => label.name));
                        }
                        
                        if (taskData.assignees) {
                            setAssignees(taskData.assignees.map(assignee => assignee.username));
                        }
                        
                        if (taskData.dependencies) {
                            setDependencies(taskData.dependencies.map(dependency => dependency.title));
                        }
                    }
                }
            } catch (error) {
                console.error("Error initializing data:", error);
                toast.error("Failed to load data");
            } finally {
                setLoading(false);
            }
        };

        initializeData();
    }, [taskid, create, projectId, userId, token]);

    async function getTaskById(taskId: string): Promise<ExtendedTask | null> {
        if (!userId || !projectId || !token) return null;
        
        try {
            const taskUrl = `http://localhost:8080/api/users/${userId}/projects/${projectId}/tasks/${taskId}`;
            const response = await fetch(taskUrl, { 
                method: 'GET', 
                headers: { 'authorization': `Bearer ${token}` } 
            });
            
            if (!response.ok) {
                throw new Error(`Failed to fetch task: ${response.statusText}`);
            }
            
            const taskData = await response.json() as ExtendedTask;

            // Fetch assignees if assigneeIds exist
            if (taskData.assigneeIds && taskData.assigneeIds.length > 0) {
                const assignees = await Promise.all(
                    taskData.assigneeIds.map(async (assigneeId) => {
                        const response = await fetch(`http://localhost:8080/api/users/${assigneeId}`, {
                            method: 'GET',
                            headers: { 'authorization': `Bearer ${token}` }
                        });
                        if (response.ok) {
                            return await response.json();
                        }
                        return null;
                    })
                );

                taskData.assignees = assignees.filter(assignee => assignee !== null);
            }

            // Fetch labels if labelIds exist
            if (taskData.labelIds && taskData.labelIds.length > 0) {
                const labels = await Promise.all(
                    taskData.labelIds.map(async (labelId) => {
                        const response = await fetch(`http://localhost:8080/api/users/${userId}/projects/${projectId}/labels/${labelId}`, {
                            method: 'GET',
                            headers: { 'authorization': `Bearer ${token}` }
                        });
                        if (response.ok) {
                            return await response.json();
                        }
                        return null;
                    })
                );

                taskData.labels = labels.filter(label => label !== null);
            }

            // Fetch dependencies if dependencyIds exist
            if (taskData.dependencyIds && taskData.dependencyIds.length > 0) {
                const dependencies = await Promise.all(
                    taskData.dependencyIds.map(async (dependencyId) => {
                        const response = await fetch(`http://localhost:8080/api/users/${userId}/projects/${projectId}/tasks/${dependencyId}`, {
                            method: 'GET',
                            headers: { 'authorization': `Bearer ${token}` }
                        });
                        if (response.ok) {
                            return await response.json();
                        }
                        return null;
                    })
                );

                taskData.dependencies = dependencies.filter(dependency => dependency !== null);
            }

            return taskData;
        } catch (error) {
            console.error("Error fetching task:", error);
            return null;
        }
    }

    function backgroundClick(e: React.MouseEvent<HTMLDivElement>) {
        if ((e.target as HTMLDivElement).className === styles['wrapper']) {
            setPopUp(false);
        }
    }

    function issueClick() {
        setPopUp(true);
    }

    async function getStatuses() {
        if (!userId || !projectId || !token) return null;
        
        try {
            const url = `http://localhost:8080/api/users/${userId}/projects/${projectId}/statuses`;
            const response = await fetch(url, { 
                method: 'GET', 
                headers: { 
                    'Content-Type': 'application/json', 
                    'authorization': `Bearer ${token}` 
                } 
            });
            
            if (!response.ok) {
                throw new Error(`Failed to fetch statuses: ${response.statusText}`);
            }
            
            return await response.json();
        } catch (error) {
            console.error("Error fetching statuses:", error);
            return null;
        }
    }

    async function getTasks() {
        if (!userId || !projectId || !token) return;
        
        try {
            const tasksUrl = `http://localhost:8080/api/users/${userId}/projects/${projectId}/tasks`;
            const response = await fetch(tasksUrl, { 
                method: 'GET', 
                headers: { 'authorization': `Bearer ${token}` } 
            });
            
            if (!response.ok) {
                throw new Error(`Failed to fetch tasks: ${response.statusText}`);
            }
            
            const data = await response.json();
            setAllTasks(data);
        } catch (error) {
            console.error("Error fetching tasks:", error);
        }
    }

    async function getLabels() {
        if (!userId || !projectId || !token) return;
        
        try {
            const labelsUrl = `http://localhost:8080/api/users/${userId}/projects/${projectId}/labels`;
            const response = await fetch(labelsUrl, { 
                method: 'GET', 
                headers: { 'authorization': `Bearer ${token}` } 
            });
            
            if (!response.ok) {
                throw new Error(`Failed to fetch labels: ${response.statusText}`);
            }
            
            const data = await response.json();
            setAllLabels(data);
        } catch (error) {
            console.error("Error fetching labels:", error);
        }
    }

    async function getmembers() {
        if (!userId || !projectId || !token || !projects) return;
        
        try {
            const project = projects.find((p) => p.id === projectId);
            if (project && project.teamMemberIds) {
                const teamMembers = await Promise.all(
                    project.teamMemberIds.map(async (memberId) => {
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
                setAllAssignees(teamMembers.filter((member): member is TeamMember => member !== null));
            }
        } catch (error) {
            console.error("Error fetching team members:", error);
        }
    }

    async function saveTask() {
        if (!userId || !projectId || !token) {
            toast.error("Missing user or project information");
            return;
        }
        
        const task = {
            title,
            description,
            assigneeIds: [],
            statusId: statue,
            labelIds: labels.map(labelName => {
                const foundLabel = allLabels.find(l => l.name === labelName);
                return foundLabel ? foundLabel.id : null;
            }).filter((id): id is string => id !== null),
            dependencyIds: dependencies.map(dependencyTitle => {
                const foundTask = allTasks.find(t => t.title === dependencyTitle);
                return foundTask ? foundTask.id : null;
            }).filter((id): id is string => id !== null),
            dueDate: "",
            startDate: "",
            endDate: "",
            estimatedHours: 10,
            actualHours: 5,
            projectId
        };
        
        if (taskid) {
            await putTask(taskid, task);
        } else {
            await postTask(task);
        }
    }

    async function postTask(task: any) {
        if (!userId || !projectId || !token) return;
        
        try {
            const saveTaskUrl = `http://localhost:8080/api/users/${userId}/projects/${projectId}/tasks`;
            const response = await fetch(saveTaskUrl, { 
                method: 'POST', 
                headers: { 
                    'authorization': `Bearer ${token}`, 
                    'Content-Type': 'application/json' 
                }, 
                body: JSON.stringify(task) 
            });
            
            if (response.ok) {
                toast.success('Task Created Successfully');
            } else {
                throw new Error(`Failed to create task: ${response.statusText}`);
            }
        } catch (error) {
            console.error("Error creating task:", error);
            toast.error('Task Creation Failed');
        }
    }

    async function putTask(taskId: string, taskData: any) {
        if (!userId || !projectId || !token || !AllStatuses) return;
        
        try {
            const updateTaskUrl = `http://localhost:8080/api/users/${userId}/projects/${projectId}/tasks/${taskId}`;
            const response = await fetch(updateTaskUrl, { 
                method: 'PUT', 
                headers: { 
                    'authorization': `Bearer ${token}`, 
                    'Content-Type': 'application/json' 
                }, 
                body: JSON.stringify(taskData) 
            });
            
            if (response.ok) {
                // Create a deep copy of statuses to avoid direct mutation
                const tmpStatuses = AllStatuses.map(status => ({
                    ...status,
                    tasks: [...status.tasks]
                }));
                
                // Update the task in the appropriate status
                tmpStatuses.forEach(status => {
                    const taskIndex = status.tasks.findIndex(task => task.id === taskId);
                    if (taskIndex !== -1) {
                        status.tasks[taskIndex] = {...status.tasks[taskIndex], ...taskData};
                    }
                });
                
                setAllStatuses(tmpStatuses);
                toast.success('Task Updated Successfully');
            } else {
                throw new Error(`Failed to update task: ${response.statusText}`);
            }
        } catch (error) {
            console.error("Error updating task:", error);
            toast.error('Task Update Failed');
        }
    }

    async function handleSave() {
        await getLabels();
        setEdit(false);
        await saveTask();
    }

    return (
        <div className={styles["wrapper"]} onClick={backgroundClick}>
            <ToastContainer />

            {loading ? (
                <div className={styles['loading-spinner-div']}>
                    <AiOutlineLoading className='loading-spinner'/>
                </div>
            ) : (
                <>
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
                                        <button className={styles["issue-popup__save"]} onClick={() => { handleSave() }}>Save</button>
                                }
                            </div>

                            <form action="">
                                <div className={styles["issue-popup__content"]}>
                                    <h2 className={styles["issue-popup__subtitle"]}>Title:</h2>
                                    {
                                        edit ?
                                            <input type='text' name='title' id='title' placeholder={'Title'} onChange={(e) => { setTitle(e.target.value) }} className={`${styles["issue-popup__title"]} ${styles['issue-popup--activeInput']}`} value={title} />
                                            :
                                            <p className={`${styles["issue-popup__title"]}`} >{title}</p>
                                    }
                                    <div className={styles["issue-popup__description"]}>
                                        <h2 className={styles["issue-popup__subtitle"]}>Description:</h2>
                                        {
                                            edit ?
                                                <input type='text' placeholder={'Description'} onChange={(e) => { setDescription(e.target.value) }} className={`${styles["issue-popup__description-text"]} ${styles['issue-popup--activeInput']}`} value={description} />
                                                :
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
                                <IssueDetail title="Labels" add={edit} labelcreate={true} attributes={labels} setAttributes={setLabels} options={allLabels.map(label => label.name)} colors={allLabels.map(label => label.color)} />
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
                </>
                
            )}
            
        </div>
    );
}