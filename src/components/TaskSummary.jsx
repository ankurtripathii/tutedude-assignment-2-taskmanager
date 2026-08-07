import React from 'react';
import { useTasks } from '../context/TaskContext';

const TaskSummary = () => {
  const { state } = useTasks();
  
  const totalTasks = state.tasks.length;
  const completedTasks = state.tasks.filter(task => task.completed).length;

  return (
    <div className="task-summary">
      <div className="summary-card">
        <h3>Total Tasks</h3>
        <p>{totalTasks}</p>
      </div>
      <div className="summary-card">
        <h3>Completed</h3>
        <p>{completedTasks} / {totalTasks}</p>
      </div>
    </div>
  );
};

export default TaskSummary;