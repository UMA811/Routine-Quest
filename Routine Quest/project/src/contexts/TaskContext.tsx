import React, { createContext, useContext, useState, useEffect } from 'react';
import { morningTasks as defaultMorningTasks, nightTasks as defaultNightTasks } from '../data/tasks';
import useSound from '../hooks/useSound';

export type Task = {
  id: string;
  title: string;
  completed: boolean;
};

export type TaskMode = 'morning' | 'night';

interface TaskContextType {
  tasks: Task[];
  taskMode: TaskMode;
  setTaskMode: (mode: TaskMode) => void;
  toggleTask: (id: string) => void;
  completedCount: number;
  resetTasks: () => void;
  progress: number;
  allCompleted: boolean;
  addTask: (title: string) => void;
  removeTask: (id: string) => void;
  editTask: (id: string, title: string) => void;
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

// Load tasks from localStorage or use defaults
const loadTasks = (key: string, defaultTasks: Task[]): Task[] => {
  const saved = localStorage.getItem(key);
  return saved ? JSON.parse(saved) : defaultTasks;
};

export const useTask = () => {
  const context = useContext(TaskContext);
  if (context === undefined) {
    throw new Error('useTask must be used within a TaskProvider');
  }
  return context;
};

export const TaskProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [taskMode, setTaskMode] = useState<TaskMode>('morning');
  const [morningTasksList, setMorningTasksList] = useState<Task[]>(() => 
    loadTasks('morningTasks', defaultMorningTasks)
  );
  const [nightTasksList, setNightTasksList] = useState<Task[]>(() => 
    loadTasks('nightTasks', defaultNightTasks)
  );
  const [allCompleted, setAllCompleted] = useState(false);
  
  const { playSound } = useSound();

  const tasks = taskMode === 'morning' ? morningTasksList : nightTasksList;
  const setTasks = taskMode === 'morning' ? setMorningTasksList : setNightTasksList;

  const completedCount = tasks.filter(task => task.completed).length;
  const progress = tasks.length > 0 ? completedCount / tasks.length : 0;

  // Save tasks to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('morningTasks', JSON.stringify(morningTasksList));
    localStorage.setItem('nightTasks', JSON.stringify(nightTasksList));
  }, [morningTasksList, nightTasksList]);

  // Check if all tasks are completed
  useEffect(() => {
    if (completedCount === tasks.length && tasks.length > 0) {
      setAllCompleted(true);
      playSound('victory');
    } else {
      setAllCompleted(false);
    }
  }, [completedCount, tasks.length, playSound]);

  const toggleTask = (id: string) => {
    setTasks(prevTasks => 
      prevTasks.map(task => 
        task.id === id 
          ? { ...task, completed: !task.completed } 
          : task
      )
    );
    playSound('click');
  };

  const resetTasks = () => {
    if (taskMode === 'morning') {
      setMorningTasksList(tasks.map(task => ({ ...task, completed: false })));
    } else {
      setNightTasksList(tasks.map(task => ({ ...task, completed: false })));
    }
  };

  const addTask = (title: string) => {
    const newTask: Task = {
      id: `${taskMode[0]}${Date.now()}`,
      title,
      completed: false,
    };
    setTasks(prevTasks => [...prevTasks, newTask]);
  };

  const removeTask = (id: string) => {
    setTasks(prevTasks => prevTasks.filter(task => task.id !== id));
  };

  const editTask = (id: string, title: string) => {
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === id
          ? { ...task, title }
          : task
      )
    );
  };

  return (
    <TaskContext.Provider value={{
      tasks,
      taskMode,
      setTaskMode,
      toggleTask,
      completedCount,
      resetTasks,
      progress,
      allCompleted,
      addTask,
      removeTask,
      editTask
    }}>
      {children}
    </TaskContext.Provider>
  );
};