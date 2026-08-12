import React, { useState } from 'react';
import { useTasks } from '../context/TaskContext';
import { ACTIONS } from '../context/taskReducer';
import { TASK_TEXT_MAX_LENGTH } from '../constants';

const TaskItem = ({ task }) => {
  const { dispatch } = useTasks();
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(task.text);
  const [touched, setTouched] = useState(false);

  const trimmedLength = editText.trim().length;
  const isEmpty = trimmedLength === 0;
  const isTooLong = editText.length > TASK_TEXT_MAX_LENGTH;
  const isInvalid = isEmpty || isTooLong;
  const remaining = TASK_TEXT_MAX_LENGTH - editText.length;
  const isNearLimit = remaining <= 15 && remaining >= 0;
  const showError = touched && isInvalid;

  const handleEditStart = () => {
    setEditText(task.text);
    setTouched(false);
    setIsEditing(true);
  };

  const handleSave = () => {
    setTouched(true);
    if (isInvalid) return;

    dispatch({ type: ACTIONS.EDIT_TASK, payload: { id: task.id, text: editText.trim() } });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditText(task.text);
    setTouched(false);
    setIsEditing(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSave();
    } else if (e.key === 'Escape') {
      e.preventDefault();
      handleCancel();
    }
  };

  return (
    <li className={`task-item ${task.completed ? 'completed' : ''} ${isEditing ? 'editing' : ''}`}>
      <div className="task-text-container">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => dispatch({ type: ACTIONS.TOGGLE_TASK, payload: task.id })}
          disabled={isEditing}
        />
        {isEditing ? (
          <div className="edit-field">
            <input
              type="text"
              className={`edit-input ${showError ? 'input-error' : ''}`}
              value={editText}
              maxLength={TASK_TEXT_MAX_LENGTH + 20}
              onChange={(e) => setEditText(e.target.value)}
              onBlur={() => setTouched(true)}
              onKeyDown={handleKeyDown}
              autoFocus
              aria-invalid={showError}
            />
            <div className="input-meta">
              {showError && isEmpty && (
                <span className="field-error">Task can't be empty</span>
              )}
              {showError && isTooLong && (
                <span className="field-error">
                  {editText.length - TASK_TEXT_MAX_LENGTH} characters too long
                </span>
              )}
              <span
                className={`char-counter ${isTooLong ? 'char-counter-error' : isNearLimit ? 'char-counter-warning' : ''}`}
              >
                {editText.length}/{TASK_TEXT_MAX_LENGTH}
              </span>
            </div>
          </div>
        ) : (
          <span className="task-text">{task.text}</span>
        )}
      </div>

      <div className="button-group">
        {isEditing ? (
          <>
            <button onClick={handleSave} className="save-btn" disabled={isInvalid}>
              Save
            </button>
            <button onClick={handleCancel} className="cancel-btn">
              Cancel
            </button>
          </>
        ) : (
          <button
            onClick={handleEditStart}
            className="edit-btn"
            disabled={task.completed}
          >
            Edit
          </button>
        )}
        <button
          onClick={() => dispatch({ type: ACTIONS.DELETE_TASK, payload: task.id })}
          className="delete-btn"
          disabled={isEditing}
        >
          Delete
        </button>
      </div>
    </li>
  );
};

export default TaskItem;
