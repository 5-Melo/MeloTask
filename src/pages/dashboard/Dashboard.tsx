import React, { useContext, useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import TodoBar from './TodoBar'
import styles from './dashboard.module.css'
import styles2 from './todoBar.module.css'
import styles3 from './taskCard.module.css'
import { Status } from '../../types/task'
import GlobalContext, { GlobalContextState } from '../../Context/GlobalContext'
import { AiOutlineLoading } from "react-icons/ai";


function Dashboard() {
  const { id: projectId } = useParams();
  const userId = localStorage.getItem('userId') || sessionStorage.getItem('userId');
  const token = localStorage.getItem('token') || sessionStorage.getItem('token');
  // const [statuses, setStatuses] = useState<Status[]>([]);
  const {statuses, setStatuses} = useContext(GlobalContext) as GlobalContextState

  useEffect(() => {
    const loadStatuses = async () => {
      const labelUrl = `http://localhost:8080/api/users/${userId}/projects/${projectId}/statuses`
        const response = await fetch(labelUrl, { method: 'GET', headers: { 'authorization': `Bearer ${token}` } });
        if (response.ok) {
          const statusesData = await response.json();
          
          // Load tasks for all statuses in parallel and wait for all of them
          const statusesWithTasks = await Promise.all(
            statusesData.map(async (status) => {
              const tasks = await loadTasks(status);
              return { ...status, tasks: tasks || [] };
            })
          );
          console.log('Loaded statuses with tasks:', statusesWithTasks);
          setStatuses(statusesWithTasks);
        } 
        else {
          console.error('Error fetching statuses:', response.statusText);
        }
      }
    loadStatuses()
  }, [token, userId, projectId])



   async function loadTasks(status) {
    const labelUrl = `http://localhost:8080/api/users/${userId}/projects/${projectId}/tasks?statusId=${status.id}`
    const response = await fetch(labelUrl, { method: 'GET', headers: { 'authorization': `Bearer ${token}` } });
    if (response.ok) {
      const data = await response.json();

      return data;
    }
    else
    { alert('Error while fetching tasks' + response)
      return status
    }

  }
  const dashboard = useRef(null);
  let draggedTask;
  let ulOver;
  let barOver;

  function resetLis(inside) {
    const allLi = dashboard.current.querySelectorAll(`.${styles3.container}`);
    Array.from(allLi).forEach((li) => {
      if (!ulOver.contains(li) || inside)
        li.style.marginTop = '0px'
    })
  }

  async function changeStatus(taskId, statusId)
  {
    const patchTaskUrl = `http://localhost:8080/api/users/${userId}/projects/${projectId}/tasks/${taskId}/update-status?statusId=${statusId}`
    const response = await fetch(patchTaskUrl, {
      method: 'PATCH',
      headers: {
        'authorization': `Bearer ${token}`,
      },
    })
    if(response.ok) {
      console.log('Status updated successfully')
      const data = await response.json();
      console.log(data);
    }
    else {
      console.error('Error updating status')
    }
  }

  function dragStart(e) {
    draggedTask = e.target
    draggedTask.style.opacity = "50%"
    console.log(statuses);
    

  }

  function dragEnd(e) {
    draggedTask.style.opacity = "100%"

    const allLi = dashboard.current.querySelectorAll(`.${styles3.container}`);
    let inserted = false;



    if (!ulOver.contains(draggedTask)) {

      const tmpArray = [...statuses]
      let taskData;
      tmpArray.forEach(status => {
        status.tasks.forEach(task => {
          if(task.id === draggedTask.id) {
            taskData = task;
          }
        })
      })
      
      
      setStatuses(tmpArray);
      
           
      Array.from(ulOver.children).forEach((li, idx) => {
        if (parseInt(li.style.marginTop)) {
          tmpArray.forEach(status => {
            status.tasks = status.tasks.filter((task) => {
              return task.id !== draggedTask.id
            })
            if (status.id === ulOver.id) {
              status.tasks.splice(idx, 0, taskData);
              changeStatus(taskData.id, status.id);
            }

          })
          inserted = true;
        }
      })
      if (!inserted) {
        tmpArray.forEach(status => {
          status.tasks = status.tasks.filter((task) => {
            return task.id !== draggedTask.id
          })
          if (status.id === ulOver.id) {
            status.tasks.push(taskData);
            changeStatus(taskData.id, status.id);
          }

        })
      }
    }

    Array.from(allLi).forEach((li) => {
      li.style.transition = "0.3s opacity"
      li.style.marginTop = '0px'
    })



  }
  function dragOver(e) {

    const bar = e.currentTarget
    const ul = bar.querySelector(`.${styles2.taskList}`)
    ulOver = ul;
    barOver = bar;

    if (!ulOver.contains(draggedTask)) {

      Array.from(ulOver.children).forEach((li, idx) => {
        if (e.clientY >= li.getBoundingClientRect().y - parseInt(li.style.marginTop) - 50 && e.clientY <= li.getBoundingClientRect().y + 50) {
          resetLis(true)
          li.style.transition = "0.3s all"
          li.style.marginTop = '210px'
          return;
        }
      });
    }
    resetLis(false)


  }
  return (
    <div className={styles.container} ref={dashboard} onDragStart={dragStart} onDragEnd={dragEnd}>
      {
        (statuses.map((status, idx) => {
          return (<TodoBar
            key={status.id}
            statusIdx={idx}
            dragOver={dragOver}
          />)
        }))
          
      }
    </div>
  )
}

export default Dashboard