import React from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { useTask } from '../contexts/TaskContext';
import { Sun, Moon } from 'lucide-react';

const TaskTabs: React.FC = () => {
  const { mode, setMode } = useTheme();
  const { taskMode, setTaskMode, completedCount, tasks } = useTask();

  const handleTabChange = (newMode: 'morning' | 'night') => {
    setMode(newMode);
    setTaskMode(newMode);
  };

  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl shadow-md overflow-hidden transition-all duration-500">
      <div className="flex text-center">
        <button
          onClick={() => handleTabChange('morning')}
          className={`flex-1 py-4 px-2 transition-colors duration-300 flex items-center justify-center gap-2 ${
            mode === 'morning'
              ? 'bg-amber-100 text-amber-800 font-medium'
              : 'bg-transparent text-slate-600 dark:text-slate-300 hover:bg-amber-50 dark:hover:bg-slate-700'
          }`}
        >
          <Sun 
            size={20} 
            className={`${mode === 'morning' ? 'text-amber-600' : 'text-slate-400 dark:text-slate-500'}`} 
          />
          <span>Morning Routine</span>
          <span className="ml-1 text-sm bg-amber-200 dark:bg-amber-700 text-amber-800 dark:text-amber-200 rounded-full px-2 py-0.5">
            {taskMode === 'morning' ? `${completedCount}/${tasks.length}` : ''}
          </span>
        </button>
        
        <button
          onClick={() => handleTabChange('night')}
          className={`flex-1 py-4 px-2 transition-colors duration-300 flex items-center justify-center gap-2 ${
            mode === 'night'
              ? 'bg-indigo-100 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-200 font-medium'
              : 'bg-transparent text-slate-600 dark:text-slate-300 hover:bg-indigo-50 dark:hover:bg-slate-700'
          }`}
        >
          <Moon 
            size={20} 
            className={`${mode === 'night' ? 'text-indigo-600 dark:text-indigo-400' : 'text-slate-400 dark:text-slate-500'}`}
          />
          <span>Night Routine</span>
          <span className="ml-1 text-sm bg-indigo-200 dark:bg-indigo-700 text-indigo-800 dark:text-indigo-200 rounded-full px-2 py-0.5">
            {taskMode === 'night' ? `${completedCount}/${tasks.length}` : ''}
          </span>
        </button>
      </div>
    </div>
  );
};

export default TaskTabs;