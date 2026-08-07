import React, { useState } from 'react';
import { useTasks } from '../context/TaskContext';
import { ACTIONS } from '../context/taskReducer';

const TaskInput = () => {
  const [text, setText] = useState('');
  const { dispatch } = useTasks();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;

    dispatch({ type: ACTIONS.ADD_TASK, payload: text });
    setText('');
  };

  return (
    <form onSubmit={handleSubmit} className="task-form">
      <input
        type="text"
        placeholder="Enter a new task..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button type="submit">Add Task</button>
    </form>
  );
};

export default TaskInput;