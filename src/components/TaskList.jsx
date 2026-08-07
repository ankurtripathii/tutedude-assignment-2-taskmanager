import React from 'react';
import { useTasks } from '../context/TaskContext';
import { ACTIONS } from '../context/taskReducer';
import TaskItem from './TaskItem';

const TaskList = () => {
  const { state, dispatch } = useTasks();

  return (
    <div className="task-list-container">
      {state.tasks.length === 0 ? (
        <p className="empty-message">No tasks available. Add some above!</p>
      ) : (
        <>
          <ul className="task-list">
            {state.tasks.map(task => (
              <TaskItem key={task.id} task={task} />
            ))}
          </ul>
          <button 
            onClick={() => dispatch({ type: ACTIONS.CLEAR_ALL })} 
            className="clear-all-btn"
          >
            Clear All Tasks
          </button>
        </>
      )}
    </div>
  );
};

export default TaskList;