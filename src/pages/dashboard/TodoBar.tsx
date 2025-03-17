import React , {useState, useRef, useEffect, use, useContext } from 'react'
import styles from './todoBar.module.css'
import TaskCard from './TaskCard.tsx';
import { TbLayoutNavbarCollapse } from "react-icons/tb";
import GlobalContext, { GlobalContextState } from '../../Context/GlobalContext.tsx';


const TodoBar = ({ statusIdx,dragOver}) => {
  const bar = useRef(null);
  const {statuses, setStatuses} = useContext(GlobalContext) as GlobalContextState
  // const userId = localStorage.getItem('userId') || sessionStorage.getItem('userId');
  // const token = localStorage.getItem('token') || sessionStorage.getItem('token');

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


  return (
    <div ref={bar} className={styles.container} onDragOver={dragOver}>
      <div className={styles.upperSection} style={{ 'borderBottom': `.25rem ${statuses[statusIdx].color} solid`, '--dot-color': `${statuses[statusIdx].color}`}}>
        <p className={styles.upperSection__heading}>{statuses[statusIdx].name}</p>
            <span>{statuses[statusIdx].tasks.length}</span>
        <button onClick={collapse} className={styles.container__collapse__button}><TbLayoutNavbarCollapse /></button>

        </div>
         <ul id={statuses[statusIdx].id} className={styles.taskList}>
            {
              statuses[statusIdx].tasks.map(task  => {return (<TaskCard key={task.id} task={task}/>)})
            }
        </ul>
    </div>
  )
}

export default TodoBar; 
