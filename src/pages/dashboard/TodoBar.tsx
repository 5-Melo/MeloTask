import React , {useEffect, useRef} from 'react'
import styles from './todoBar.module.css'
import TaskCard from './TaskCard.tsx';

const TodoBar = ({ barName, tasks, color,dragOver }) => {

  return (
    <div className={styles.container} onDragOver={dragOver}>
        <div className={styles.upperSection} style={{'borderBottom':`.25rem ${color} solid`}}>
            <p className={styles.upperSection__heading}>{barName}</p>
            <span>{tasks.length}</span>
        </div>
          <ul className={styles.taskList}>
            {
                  tasks.map(task => <TaskCard task={task}/>)
            }
        </ul>
    </div>
  )
}

export default TodoBar