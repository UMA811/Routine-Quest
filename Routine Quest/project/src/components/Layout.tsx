import React, { useEffect } from 'react';
import TaskTabs from './TaskTabs';
import TaskList from './TaskList';
import QuestMap from './QuestMap';
import VictoryModal from './VictoryModal';
import { useTheme } from '../contexts/ThemeContext';
import { useTask } from '../contexts/TaskContext';

const Layout: React.FC = () => {
  const { mode } = useTheme();
  const { taskMode, setTaskMode, allCompleted } = useTask();

  // Sync taskMode with theme mode when theme changes
  useEffect(() => {
    setTaskMode(mode);
  }, [mode, setTaskMode]);

  return (
    <div className="min-h-screen transition-colors duration-500 bg-amber-50 dark:bg-slate-900">
      <div className="container mx-auto px-4 py-6 max-w-4xl">
        <header className="mb-6">
          <h1 className="text-3xl md:text-4xl font-bold text-center text-amber-800 dark:text-amber-300 mb-2">
            Routine Quest
          </h1>
          <p className="text-amber-700 dark:text-amber-400 text-center text-sm md:text-base">
            Turn your daily routines into an adventure!
          </p>
        </header>
        
        <TaskTabs />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <div className="order-2 md:order-1">
            <TaskList />
          </div>
          <div className="order-1 md:order-2">
            <QuestMap />
          </div>
        </div>
      </div>
      
      {allCompleted && <VictoryModal />}
    </div>
  );
};

export default Layout;