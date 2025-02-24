import React, {useEffect , useRef} from 'react'
import styles from './taskCard.module.css'
import { RxAvatar } from "react-icons/rx";

interface label {
  labelName: string;
}
interface props {
  task: { title: string; avatar: string; dependency: number; priority: string; label: label[]; delete: boolean}

}


const TaskCard: React.FC<props> = ({ task}) => {
  

  return (
    <li className={styles.container} draggable >
      <div className={styles.upperSection}>
        <p className={`${styles.priority} ${task.priority === 'low'? styles.lowP: task.priority === 'high'? styles.highP: styles.mediumP}`}>{task.priority}</p>
          <ul className={styles.dotList}>
            <div className={styles.dotListDiv}>
            <li><button>edit</button></li>
            <li><button>delete</button></li>
            </div>
            <div className={styles.buttonDiv}>
             <button className={styles.button}>...</button>
          </div>
          </ul>
      </div>
      <div className={styles.middleSection}>
        <span className={styles.middleSection__icon}><RxAvatar /></span>
        <img className={styles.avatar} src={task.avatar} alt="" />
        <p className={styles.title}>{task.title}</p>
      </div>
      <p className={styles.dependency}>{task.dependency} dependency</p>
    </li>
  )
}

export default TaskCard;