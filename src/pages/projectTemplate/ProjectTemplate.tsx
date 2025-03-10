import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import React, { useState } from 'react';
import IssueDetail from '../../components/issueDetail/IssueDetail.tsx';
import styles from './ProjectTemplate.module.css';

export default function ProjectTemplate() {
    const [projectName, setProjectName] = useState('');
    const [status, setStatus] = useState('notStarted');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [description, setDescription] = useState('');

    const userId = localStorage.getItem('userId') || sessionStorage.getItem('userId');
    const token = localStorage.getItem('token') || sessionStorage.getItem('token');



    async function saveProject(projectData)
    {
        const projectPostUrl = `http://localhost:8080/api/users/${userId}/projects`
        const response = await fetch(projectPostUrl, { method: 'POST', headers: { 'authorization': `Bearer ${token}`, 'Content-Type': 'application/json' }, body: JSON.stringify(projectData) })
        if(response.ok){
            toast.success('Project Created Successfully')
        }
        else {
            toast.error('Project Creation Failed')
        }
        console.log(response);
        
        const data = await response.json();
        return data.id;
        
        // console.log(data);

    }
    async function makeStatuses(id)
    {
        const projectStatusesUrl = `http://localhost:8080/api/users/${userId}/projects/${id}/statuses`
        const statuses = {name:'Free',color:'green'}
        const statuses2 = {name:'In Progress',color:'orange'}
        const statuses3 = {name:'Done',color:'red'}
        await fetch(projectStatusesUrl, { method: 'POST', headers: { 'authorization': `Bearer ${token}`,'Content-Type':'application/json' }, body:JSON.stringify(statuses) });
        await fetch(projectStatusesUrl, { method: 'POST', headers: { 'authorization': `Bearer ${token}` ,'Content-Type':'application/json' }, body:JSON.stringify(statuses2) });
        await fetch(projectStatusesUrl, { method: 'POST', headers: { 'authorization': `Bearer ${token}` ,'Content-Type':'application/json' }, body:JSON.stringify(statuses3) });
    }
    const handleSave = async (event: React.FormEvent) => {
        event.preventDefault();
        const projectData = {
            title:projectName,
            status,
            startDate,
            endDate,
            description,
            teamMembers:[]
        };

        const id = await saveProject(projectData)
        console.log(id);
        
        await makeStatuses(id);
        console.log('Project Data:', projectData);
        // Add your save logic here
    };

    return (
        <div className={styles['project-template']}>
            <ToastContainer/>
            <h1 className={styles['project-template__header']}>Shape your projects to success!</h1>
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
                            <option value="notStarted">Not Started</option>
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
                <IssueDetail title='members' avatar={true} add={true} />
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
                <button type="submit" className={styles['project-template__button']}>Save</button>
            </form>
        </div>
    );
}
