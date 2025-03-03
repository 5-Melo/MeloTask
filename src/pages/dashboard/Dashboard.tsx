import React, { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import TodoBar from './TodoBar.tsx'
import styles from './dashboard.module.css'
import styles2 from './todoBar.module.css'
import styles3 from './taskCard.module.css'
function Dashboard() {

  const {id} = useParams();
  const userId = localStorage.getItem('userId') || sessionStorage.getItem('userId');
  const token = localStorage.getItem('token') || sessionStorage.getItem('token');
  const [statuses,setStatuses] = useState([]);
  useEffect(() => {
    console.log(id);
    console.log(userId);
    console.log(token);
    (async()=>{
      const labelUrl = `http://localhost:8080/api/users/${userId}/projects/${id}/statuses`
      const response = await fetch(labelUrl, {method:'GET',headers:{'authorization':`Bearer ${token}`}});
      console.log(response);
      
      const data = await response.json();
      setStatuses(data)
      console.log(data);
      
    })()

  },[])
  
  const task1 = {
    title: 'issue #11',
    priority: "low",
    avatar: "getAvatar",
    labels: ['feature', 'enhancement'],
    dependency: 2,
  };
  const task2 = {
    title: 'issue #21',
    priority: "high",
    avatar: "getAvatar",
    labels: ['feature', 'enhancement'],
    dependency: 2,
  };
  const tasks = [task1, task2, task2, task1, task1];
  const dashboard = useRef(null);
  let draggedTask;
  let ulOver;
  let barOver;
  let ys = [];

  function getys() {
    const allULS = dashboard.current.querySelectorAll(`.${styles2.taskList}`)
    Array.from(allULS).forEach((ul)=>{
      const tmp = [];
      Array.from(ul.children).forEach((task) => {
        tmp.push(task.getBoundingClientRect().y)
      })
      ys.push(tmp);
    })
      
  }
  function dragStart(e) {
    draggedTask = e.target
    draggedTask.style.opacity = "50%"
    ys = []
    getys()
    // console.log(ys);
  }

  function dragEnd(e) {
    const allLi = dashboard.current.querySelectorAll(`.${styles3.container}`);
    let ulIdx;
    draggedTask.style.opacity = "100%"
    Array.from(dashboard.current.querySelectorAll(`.${styles2.taskList}`)).forEach((list, idx) => {
      if (list === ulOver)
        ulIdx = idx
    })
    Array.from(allLi).forEach((task) => {
      task.style.transition = "0.3s opacity"
      task.style.marginTop = '0px'
    })
    let bl = true;

    if (!ulOver.contains(draggedTask)) {
        Array.from(ys[ulIdx]).forEach((task, idx) => {
          if (e.clientY >= task - 100 && e.clientY <= task + 100) {
            ulOver.insertBefore(draggedTask, ulOver.children[idx])
            ys[ulIdx].splice(idx,0,)
            bl = false;
          }
        })
        if(bl) 
        {
          ulOver.appendChild(draggedTask);
        }
    }
  }
  function dragOver(e) {

    const bar = e.currentTarget
    const ul = bar.querySelector(`.${styles2.taskList}`)
    let ulIdx;
    ulOver = ul;
    barOver = bar;

    Array.from(dashboard.current.querySelectorAll(`.${styles2.taskList}`)).forEach((list, idx)=>{
      if(list === ulOver)
        ulIdx = idx
    })
  
    if (!ul.contains(draggedTask)) {
      console.log(ys[ulIdx]);
      
      Array.from(ys[ulIdx]).forEach((task, idx) => {
        // console.log(e.clientY);
        // console.log(idx);
        // console.log(ul.children[idx]);
        if (e.clientY >= task - 90 && e.clientY <= task + 90) {
          ul.children[idx].style.transition = "0.3s all"
          ul.children[idx].style.marginTop = '210px'
        }
        else {
          ul.children[idx].style.marginTop = '0px'
        }
      });
    }
    const allLi = dashboard.current.querySelectorAll(`.${styles3.container}`);
    Array.from(allLi).forEach((task) => {
      if (!ul.contains(task))
        task.style.marginTop = '0px'
    })

  }
  return (
    <div className={styles.container} ref={dashboard} onDragStart={dragStart} onDragEnd={dragEnd}>
      {statuses.map((status)=>{
        return(<TodoBar
        status={status}
        dragOver={dragOver}
        />)
      })}
    </div>
  )
}

export default Dashboard