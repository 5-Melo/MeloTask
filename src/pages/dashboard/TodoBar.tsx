import React , {useState, useRef} from 'react'
import styles from './todoBar.module.css'
import TaskCard from './TaskCard.tsx';
import { TbLayoutNavbarCollapse } from "react-icons/tb";


const TodoBar = ({ barName, tasks, color,dragOver }) => {
  const bar = useRef(null);
  const [taskLen, setTaskLen] = useState(tasks.length)

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
        <div className={styles.upperSection} style={{'borderBottom':`.25rem ${color} solid`,'--dot-color': `${color}`}}>
            <p className={styles.upperSection__heading}>{barName}</p>
            <span>{taskLen}</span>
        <button onClick={collapse} className={styles.container__collapse__button}><TbLayoutNavbarCollapse /></button>

        </div>
          <ul className={styles.taskList}>
            {
                  tasks.map(task  => <TaskCard task={task}/>)
            }
        </ul>
    </div>
  )
}

export default TodoBar  