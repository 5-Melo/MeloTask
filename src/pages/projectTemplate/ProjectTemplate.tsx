import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import React, { useContext, useState, useEffect } from 'react';
import CreatableSelect from 'react-select/creatable';
import { RiAccountCircleLine } from "react-icons/ri";
import styles from './ProjectTemplate.module.css';
import GlobalContext, { GlobalContextState } from '../../Context/GlobalContext.tsx';
import { TeamMemberId } from '../../types/project.ts';

interface ProjectTemplateProps {
    isEditMode?: boolean;
    onClose?: () => void;
}

export default function ProjectTemplate({ isEditMode = false, onClose }: ProjectTemplateProps) {
    const [projectName, setProjectName] = useState('');
    const [status, setStatus] = useState('IN_PROGRESS');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [description, setDescription] = useState('');
    const [username, setUsername] = useState('');
    const [usernames, setUsernames] = useState([]);
    const [selectedUsername, setSelectedUsername] = useState(null);
    const [teamMembers, setTeamMembers] = useState<TeamMemberId[]>([]);
    const {currentProject, projects, setProjects} = useContext(GlobalContext) as GlobalContextState
    const projectid = currentProject?.id;
    const userId = localStorage.getItem('userId') || sessionStorage.getItem('userId');
    const token = localStorage.getItem('token') || sessionStorage.getItem('token');

    useEffect(() => {
        if(!projectid) return;
        
        const project = projects.find(proj => proj.id === projectid);
        if (project) {
            setProjectName(project.title);
            setStatus(project.status);
            setStartDate(project.startDate);
            setEndDate(project.endDate);
            setDescription(project.description);
            setTeamMembers(project.teamMemberIds);
        }
    }, [projectid, projects]);

    async function saveProject(projectData) {
        const url = isEditMode 
            ? `http://localhost:8080/api/users/${userId}/projects/${projectid}`
            : `http://localhost:8080/api/users/${userId}/projects`;
            
        const method = isEditMode ? 'PUT' : 'POST';
        
        const response = await fetch(url, { 
            method, 
            headers: { 
                'authorization': `Bearer ${token}`, 
                'Content-Type': 'application/json' 
            }, 
            body: JSON.stringify(projectData) 
        });

        if (response.ok) {
            const data = await response.json();
            toast.success(isEditMode ? 'Project Updated Successfully' : 'Project Created Successfully');
            
            // Update projects array in context
            if (isEditMode) {
                setProjects(projects.map(project => 
                    project.id === projectid ? data : project
                ));
            } else {
                setProjects([...projects, data]);
            }
            
            // Close the modal after successful operation
            onClose?.();
            return data.id;
        } else {
            toast.error(isEditMode ? 'Project Update Failed' : 'Project Creation Failed');
            return null;
        }
    }

    async function makeStatuses(id) {
        if (isEditMode) return; // Don't create statuses for existing projects
        
        const projectStatusesUrl = `http://localhost:8080/api/users/${userId}/projects/${id}/statuses`;
        const statuses = { name: 'Free', color: 'green' };
        const statuses2 = { name: 'In Progress', color: 'orange' };
        const statuses3 = { name: 'Done', color: 'red' };
        await fetch(projectStatusesUrl, { method: 'POST', headers: { 'authorization': `Bearer ${token}`, 'Content-Type': 'application/json' }, body: JSON.stringify(statuses) });
        await fetch(projectStatusesUrl, { method: 'POST', headers: { 'authorization': `Bearer ${token}`, 'Content-Type': 'application/json' }, body: JSON.stringify(statuses2) });
        await fetch(projectStatusesUrl, { method: 'POST', headers: { 'authorization': `Bearer ${token}`, 'Content-Type': 'application/json' }, body: JSON.stringify(statuses3) });
    }

    const handleSave = async (event: React.FormEvent) => {
        event.preventDefault();
        const projectData = {
            title: projectName,
            status,
            startDate,
            endDate,
            description,
            teamMembers: teamMembers.map(member => member.id)
        };
        
        const id = await saveProject(projectData);
        if (!isEditMode) {
            await makeStatuses(id);
        }
    };

    async function handleDelete() {
        if (!projectid) return;
        
        try {
            const response = await fetch(`http://localhost:8080/api/users/${userId}/projects/${projectid}`, {
                method: 'DELETE',
                headers: { 'authorization': `Bearer ${token}` }
            });
            
            if (response.ok) {
                toast.success('Project Deleted Successfully');
                // Update projects array by removing the deleted project
                setProjects(projects.filter(project => project.id !== projectid));
            } else {
                toast.error('Project Deletion Failed');
            }
        } catch (error) {
            toast.error('Failed to delete project');
        }
    }

    function handleAddMember() {
        if (selectedUsername) {
            setTeamMembers([...teamMembers, selectedUsername]);
            setSelectedUsername(null);
        }
        console.log('Add member:', selectedUsername);
    }

    const handleUsernameChange = (inputValue) => {
        console.log(inputValue);
        setUsername(inputValue);

        const getSet = async() => {
        if (inputValue.length >= 3) {
            const response = await fetch(`http://localhost:8080/api/users/search?prefix=${inputValue}`, {
                headers: { 'authorization': `Bearer ${token}` }
            });
            const data = await response.json();
            setUsernames(data.map(user => ({ value: user.username, label: user.username, id: user.id })));
            console.log('User data:', data);
        }
        }
        getSet();
    };

    return (
        <div className={styles['project-template']}>
            <ToastContainer />
            <h1 className={styles['project-template__header']}>
                {isEditMode ? 'Edit Project' : 'Shape your projects to success!'}
            </h1>
            <form className={styles['project-template__form']} onSubmit={handleSave}>
                <div className={styles['project-template__grid']}>
                    <div className={styles['project-template__form-group']}>
                        <label htmlFor="projectName" className={styles['project-template__label']}>Project Name</label>
                        <input
                            type="text"
                            id="projectName"
                            placeholder="Enter project name"
                            className={styles['project-template__input']}
                            value={projectName}
                            onChange={(e) => setProjectName(e.target.value)}
                        />
                    </div>
                    <div className={styles['project-template__form-group']}>
                        <label htmlFor="status" className={styles['project-template__label']}>Status</label>
                        <select
                            id="status"
                            className={styles['project-template__select']}
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                        >
                            <option value="IN_PROGRESS">In Progress</option>
                            <option value="DONE">Completed</option>
                        </select>
                    </div>
                    <div className={styles['project-template__form-group']}>
                        <label htmlFor="startDate" className={styles['project-template__label']}>Start Date</label>
                        <input
                            type="date"
                            id="startDate"
                            className={styles['project-template__input']}
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                        />
                    </div>
                    <div className={styles['project-template__form-group']}>
                        <label htmlFor="endDate" className={styles['project-template__label']}>End Date</label>
                        <input
                            type="date"
                            id="endDate"
                            className={styles['project-template__input']}
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                        />
                    </div>
                </div>
                <div className={styles['project-template__members']}>
                    <h4 className={styles['project-template__members-header']}>Members</h4>
                    {teamMembers.map((member, index) => (
                        <div key={index} className={styles['project-template__member']}>
                            <RiAccountCircleLine/>
                            <span>{member.label}</span>
                        </div>
                    ))}
                    <div className={styles['project-template__members-input']}>
                        <CreatableSelect
                            className={styles['project-template__members-select']}
                            isClearable
                            onInputChange={handleUsernameChange}
                            onChange={setSelectedUsername}
                            options={usernames}
                            placeholder="Enter or select a username"
                            isValidNewOption={() => false}
                        />
                        <button type='button' className={styles['project-template__add-button']} onClick={handleAddMember} disabled={!selectedUsername}>Add</button>
                    </div>
                </div>
                <div className={styles['project-template__form-description']}>
                    <label htmlFor="description" className={styles['project-template__label']}>Project Description</label>
                    <textarea
                        id="description"
                        placeholder="Enter project description"
                        className={styles['project-template__textarea']}
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    ></textarea>
                </div>
                <div className={styles['project-template__button-group']}>
                    <button 
                        type='button' 
                        onClick={handleDelete} 
                        disabled={!isEditMode} 
                        className={`${styles['project-template__button']}`}
                    >
                        Delete
                    </button>
                    <button type="submit" className={styles['project-template__button']}>
                        {isEditMode ? 'Update' : 'Create'}
                    </button>
                </div>
            </form>
        </div>
    );
}