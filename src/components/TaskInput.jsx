import React, { useState } from 'react';
import { useTasks } from '../context/TaskContext';
import { ACTIONS } from '../context/taskReducer';
import { TASK_TEXT_MAX_LENGTH } from '../constants';

const TaskInput = () => {
  const [text, setText] = useState('');
  const [touched, setTouched] = useState(false);
  const { dispatch } = useTasks();

  const trimmedLength = text.trim().length;
  const isEmpty = trimmedLength === 0;
  const isTooLong = text.length > TASK_TEXT_MAX_LENGTH;
  const isInvalid = isEmpty || isTooLong;
  const remaining = TASK_TEXT_MAX_LENGTH - text.length;
  const isNearLimit = remaining <= 15 && remaining >= 0;
  const hasInput = text.length > 0;

  const handleChange = (e) => {
    setText(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setTouched(true);
    if (isInvalid) return;

    dispatch({ type: ACTIONS.ADD_TASK, payload: text.trim() });
    setText('');
    setTouched(false);
  };

  const handleCancel = () => {
    setText('');
    setTouched(false);
  };

  const showError = touched && isInvalid;

  return (
    <form onSubmit={handleSubmit} className="task-form" noValidate>
      <div className="task-form-field">
        <input
          type="text"
          placeholder="Enter a new task..."
          value={text}
          maxLength={TASK_TEXT_MAX_LENGTH + 20}
          onChange={handleChange}
          onBlur={() => setTouched(true)}
          className={showError ? 'input-error' : ''}
          aria-invalid={showError}
          aria-describedby="task-input-hint"
        />
        <div className="input-meta" id="task-input-hint">
          {showError && isEmpty && (
            <span className="field-error">Task can't be empty</span>
          )}
          {showError && isTooLong && (
            <span className="field-error">
              Task is {text.length - TASK_TEXT_MAX_LENGTH} characters too long
            </span>
          )}
          <span
            className={`char-counter ${isTooLong ? 'char-counter-error' : isNearLimit ? 'char-counter-warning' : ''}`}
          >
            {text.length}/{TASK_TEXT_MAX_LENGTH}
          </span>
        </div>
      </div>
      <div className="task-form-actions">
        <button type="submit" disabled={isInvalid}>
          Add Task
        </button>
        {hasInput && (
          <button type="button" className="cancel-add-btn" onClick={handleCancel}>
            Cancel
          </button>
        )}
      </div>
    </form>
  );
};

export default TaskInput;
