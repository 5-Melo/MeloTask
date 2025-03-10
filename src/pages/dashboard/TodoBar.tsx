import React , {useState, useRef, useEffect } from 'react'
import styles from './todoBar.module.css'
import TaskCard from './TaskCard.tsx';
import { TbLayoutNavbarCollapse } from "react-icons/tb";


const TodoBar = ({ status,dragOver }) => {
  const bar = useRef(null);
  const [tasks,setTasks] = useState([]);
  const userId = localStorage.getItem('userId') || sessionStorage.getItem('userId');
  const token = localStorage.getItem('token') || sessionStorage.getItem('token');

  function collapse(e)
  {
    if (bar.current.style.maxHeight === '9vh')
    {
      bar.current.style.maxHeight = '80vh';
      e.target.style.transform = 'rotateX(0deg)'

    }
    else
    {
      e.target.style.transform = 'rotateX(180deg)'
      bar.current.style.maxHeight = '9vh';

    }
  }

  useEffect(()=>{
    (async()=>{
      console.log(status);
      
      const tasksUrl = `http://localhost:8080/api/users/${userId}/projects/${status.projectId}/tasks?statusId=${status.id}`
      const response = await fetch(tasksUrl,{headers:{'authorization':`Bearer ${token}`}});
      const data = await response.json()
      setTasks(data);
      console.log(data);
    })()

  },[])

  return (
    <div ref={bar} className={styles.container} onDragOver={dragOver}>
        <div className={styles.upperSection} style={{'borderBottom':`.25rem ${status.color} solid`,'--dot-color': `${status.color}`}}>
            <p className={styles.upperSection__heading}>{status.name}</p>
            <span>{tasks.length}</span>
        <button onClick={collapse} className={styles.container__collapse__button}><TbLayoutNavbarCollapse /></button>

        </div>
          <ul className={styles.taskList}>
            {
                  tasks.map(task  => {return (<TaskCard task={task}/>)})
            }
        </ul>
    </div>
  )
}

export default TodoBar  