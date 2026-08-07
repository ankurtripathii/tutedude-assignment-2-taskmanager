import React, { createContext, useReducer, useContext } from 'react';
import { taskReducer } from './taskReducer';

const TaskContext = createContext();

const initialState = {
  tasks: [
    { id: 1, text: 'Learn React Context API', completed: false },
    { id: 2, text: 'Master useReducer hook', completed: true }
  ]
};

export const TaskProvider = ({ children }) => {
  const [state, dispatch] = useReducer(taskReducer, initialState);

  return (
    <TaskContext.Provider value={{ state, dispatch }}>
      {children}
    </TaskContext.Provider>
  );
};

export const useTasks = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTasks must be used within a TaskProvider');
  }
  return context;
};