import React , {useRef} from 'react'
import styles from './todoBar.module.css'
import TaskCard from './TaskCard.tsx';


interface label {
    labelName: string;
}
interface task{

    task: { title: string, avatar: string, dependency: number, priority: string, label: label[] }
}
interface props {
    barName: string;
    tasks: task[];
}
const TodoBar:React.FC<props> = ({barName, tasks, color}) => {
    const list = useRef(null)
    console.log(tasks);
    let filtered = tasks;
    function deleteTask(e)
    {
        console.log(e.target);
        console.log(list.current);
        list.current.removeChild(e.target)
    }
  return (
      <div className={styles.container} style={{'boxShadow': `0px 0px 10px .5px ${color}`}}>
        <div className={styles.upperSection} style={{'borderBottom':`.25rem ${color} solid`}}>
            <p className={styles.upperSection__heading}>{barName}</p>
            <span>{tasks.length}</span>
        </div>
        <ul className={styles.taskList} ref={list}>
            {
                filtered.map(task => <TaskCard deleteTask={deleteTask} task={task}/>)
            }
        </ul>
    </div>
  )
}

export default TodoBar