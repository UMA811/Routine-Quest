import React from 'react';
import { ThemeProvider } from './contexts/ThemeContext';
import { TaskProvider } from './contexts/TaskContext';
import Layout from './components/Layout';
import './index.css';

function App() {
  return (
    <ThemeProvider>
      <TaskProvider>
        <Layout />
      </TaskProvider>
    </ThemeProvider>
  );
}

export default App;