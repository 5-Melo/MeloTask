import React, { useState } from 'react';
import IssueDetail from '../../components/issueDetail/IssueDetail.tsx';
import styles from './ProjectTemplate.module.css';

export default function ProjectTemplate() {
    const [projectName, setProjectName] = useState('');
    const [status, setStatus] = useState('notStarted');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [description, setDescription] = useState('');

    const handleSave = (event: React.FormEvent) => {
        event.preventDefault();
        const projectData = {
            projectName,
            status,
            startDate,
            endDate,
            description,
        };
        console.log('Project Data:', projectData);
        // Add your save logic here
    };

    return (
        <div className={styles['project-template']}>
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
                            <option value="inProgress">In Progress</option>
                            <option value="completed">Completed</option>
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
