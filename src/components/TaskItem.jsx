import React, { useState } from 'react';
import { useTasks } from '../context/TaskContext';
import { ACTIONS } from '../context/taskReducer';

const TaskItem = ({ task }) => {
  const { dispatch } = useTasks();
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(task.text);

  const handleSave = () => {
    if (editText.trim()) {
      dispatch({ type: ACTIONS.EDIT_TASK, payload: { id: task.id, text: editText } });
      setIsEditing(false);
    }
  };

  return (
    <li className={`task-item ${task.completed ? 'completed' : ''}`}>
      <div className="task-text-container">
        <input 
          type="checkbox" 
          checked={task.completed} 
          onChange={() => dispatch({ type: ACTIONS.TOGGLE_TASK, payload: task.id })}
        />
        {isEditing ? (
          <input 
            type="text" 
            className="edit-input"
            value={editText} 
            onChange={(e) => setEditText(e.target.value)} 
          />
        ) : (
          <span className="task-text">{task.text}</span>
        )}
      </div>

      <div className="button-group">
        {isEditing ? (
          <button onClick={handleSave} className="save-btn">Save</button>
        ) : (
          <button 
            onClick={() => setIsEditing(true)} 
            className="edit-btn" 
            disabled={task.completed}
          >
            Edit
          </button>
        )}
        <button 
          onClick={() => dispatch({ type: ACTIONS.DELETE_TASK, payload: task.id })} 
          className="delete-btn"
        >
          Delete
        </button>
      </div>
    </li>
  );
};

export default TaskItem;