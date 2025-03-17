import React, { useContext, useEffect, useState } from 'react'
import styles from './taskCard.module.css'
import { RxAvatar } from "react-icons/rx";
import { Project } from '../../types/project'
import { Task } from '../../types/task'
import GlobalContext, { GlobalContextState } from '../../Context/GlobalContext';
import { CiTrash } from "react-icons/ci";
import { AiOutlineLoading } from "react-icons/ai";


interface Label {
  id: string;
  name: string;
  color: string;
}

interface TaskCardProps {
  task: Task;
}

const TaskCard: React.FC<TaskCardProps> = ({ task }) => {
  const [labels, setLabels] = useState<Label[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { setPopUp, statuses, setStatuses } = useContext(GlobalContext) as GlobalContextState;
  const userId = localStorage.getItem('userId') || sessionStorage.getItem('userId');
  const token = localStorage.getItem('token') || sessionStorage.getItem('token');
  const currentProject = sessionStorage.getItem('currentProject') 
    ? JSON.parse(sessionStorage.getItem('currentProject')!) as Project 
    : null;

  useEffect(() => {
    const fetchLabels = async () => {
      if (!currentProject || !userId || !task.labelIds.length) return;

      try {
        setLoading(true);
        setError(null);
        setLabels([]); // Clear existing labels

        const labelPromises = task.labelIds.map(labelId => 
          fetch(
            `http://localhost:8080/api/users/${userId}/projects/${currentProject.id}/labels/${labelId}`,
            {
              method: 'GET',
              headers: {
                'Authorization': `Bearer ${token}`
              }
            }
          ).then(response => {
            if (!response.ok) {
              throw new Error(`Failed to fetch label: ${response.statusText}`);
            }
            return response.json();
          })
        );

        const results = await Promise.all(labelPromises);
        setLabels(results);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch labels');
      } finally {
        setLoading(false);
      }
    };

    fetchLabels();
  }, [currentProject, userId, token, task.labelIds]);

  const handleDelete = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!currentProject || !userId) {
      setError('Missing project or user information');
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const response = await fetch(
        `http://localhost:8080/api/users/${userId}/projects/${currentProject.id}/tasks/${task.id}`,
        {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to delete task: ${response.statusText}`);
      }

      // Update local state
      const newStatuses = statuses.map(status => {
        if (status.id === task.statusId) {
          return {
            ...status,
            tasks: status.tasks.filter(t => t.id !== task.id)
          };
        }
        return status;
      });
      setStatuses(newStatuses);

    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete task');
    } finally {
      setLoading(false);
    }
  };

  if (error) {
    return (
      <div className={styles.error}>
        Error: {error}
      </div>
    );
  }

  return (
    <li 
      className={`${styles.container}`} 
      id={task.id} 
      onClick={() => {
        sessionStorage.setItem('openedTaskId', task.id);
        setPopUp(true);
      }} 
      draggable
    >
      {loading ?
      (<div className={styles['loading-spinner-div']}>
       <AiOutlineLoading className='loading-spinner'/>
        </div>)
      :(
        <>
            <div className={styles.upperSection}>
              <div className={styles['labels-group']}>
                {(
                  labels.map((label) => (
                    <p
                      key={label.id}
                      className={styles.label}
                      style={{
                        backgroundColor: label.color,
                        color: 'white'
                      }}
                    >
                      {label.name}
                    </p>
                  ))
                )}
              </div>
              <div className={styles.trashButton}>
                <button
                  className={`${styles.button} ${loading ? styles.disabled : ''}`}
                  onClick={handleDelete}
                  disabled={loading}
                  aria-label="Delete task"
                >
                  <CiTrash />
                </button>
              </div>
            </div>
            <div className={styles.middleSection}>
              <span className={styles.middleSection__icon}><RxAvatar /></span>
              <p className={styles.title}>{task.title}</p>
            </div>
            <p className={styles.dependency}>
              {task.dependencyIds.length} {task.dependencyIds.length === 1 ? 'dependency' : 'dependencies'}
            </p>
        </>
      )}
      
      
    </li>
  )
}

export default TaskCard;