import React from 'react'
import TodoBar from './TodoBar.tsx'
import styles from './dashboard.module.css'

function Dashboard() {
    const task1 = {
        title: 'issue #21',
        priority: "low",
        avatar: "getAvatar",
        labels: ['feature', 'enhancement'],
        dependency: 2,
        delete: false
    };
    const task2 = {
        title: 'issue #21',
        priority: "low",
        avatar: "getAvatar",
        labels: ['feature', 'enhancement'],
        dependency: 2,
        delete: true
    };
    const tasks = [task1,task2,task2,task1, task1];
  return (
    <div className={styles.container}>
      <TodoBar
      barName='Free'
      tasks={tasks}
      color='red'
      />
      <TodoBar
      barName='In Progress'
      tasks={tasks}
      color='orange'

      />
      <TodoBar
      barName='Done'
      tasks={tasks}
      color='green'
      />
    <TodoBar
        barName='Done'
        tasks={tasks}
        color='yellow'
    />
    </div>
  )
}

export default Dashboard