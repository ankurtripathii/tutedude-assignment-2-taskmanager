import React from 'react';
import { TaskProvider } from './context/TaskContext';
import TaskInput from './components/TaskInput';
import TaskList from './components/TaskList';
import TaskSummary from './components/TaskSummary';
import './styles/TaskManager.css';

function App() {
  return (
    <TaskProvider>
      <div className="app-container">
        <header className="app-header">
          <h1>⚡ Task Manager Pro</h1>
          <p>Context API & useReducer Management</p>
        </header>
        
        <TaskSummary />
        <TaskInput />
        <TaskList />
      </div>
    </TaskProvider>
  );
}

export default App;