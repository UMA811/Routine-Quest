import React, { useEffect, useState } from 'react';
import { useTask } from '../contexts/TaskContext';
import CharacterSprite from './CharacterSprite';
import MilestoneModal from './MilestoneModal';
import useSound from '../hooks/useSound';
import { Apple } from 'lucide-react';

const QuestMap: React.FC = () => {
  const { taskMode, completedCount, tasks } = useTask();
  const [lastPosition, setLastPosition] = useState(0);
  const [showMilestone, setShowMilestone] = useState(false);
  const { playSound } = useSound();

  // Calculate current position (0-10) based on completed tasks
  const currentPosition = tasks.length > 0 ? Math.min(completedCount, tasks.length) : 0;
  const midPoint = Math.floor(tasks.length / 2);
  const hasReachedMidpoint = currentPosition >= midPoint && currentPosition < tasks.length;
  
  // Play move sound when character advances
  useEffect(() => {
    if (currentPosition > lastPosition) {
      playSound('move');
      if (currentPosition === midPoint) {
        setShowMilestone(true);
      }
      setLastPosition(currentPosition);
    } else if (currentPosition < lastPosition) {
      setLastPosition(currentPosition);
    }
  }, [currentPosition, lastPosition, midPoint, playSound]);

  return (
    <>
      <div className="bg-white dark:bg-slate-800 rounded-xl shadow-md overflow-hidden p-4 h-full transition-all duration-300">
        <h2 className="text-lg font-semibold text-amber-800 dark:text-amber-300 mb-4">
          Your Quest Map
        </h2>
        
        <div className={`relative aspect-[4/3] rounded-lg overflow-hidden ${
          taskMode === 'morning' 
            ? 'bg-amber-100 dark:bg-amber-900/30' 
            : 'bg-indigo-100 dark:bg-indigo-900/30'
        }`}>
          {/* Map Path */}
          <div className="absolute top-1/2 left-4 right-4 h-4 bg-amber-200 dark:bg-amber-800/50 rounded-full transform -translate-y-1/2">
            {/* Progress marks */}
            {Array.from({ length: tasks.length + 1 }).map((_, index) => (
              <div 
                key={index}
                className={`absolute top-1/2 w-3 h-3 rounded-full transform -translate-y-1/2 ${
                  index <= currentPosition
                    ? 'bg-amber-500 dark:bg-amber-400'
                    : 'bg-amber-300 dark:bg-amber-700'
                }`}
                style={{ 
                  left: `${index * (100 / tasks.length)}%`,
                  transition: 'background-color 0.3s ease'
                }}
              />
            ))}
            
            {/* Milestone marker */}
            {tasks.length > 0 && (
              <div 
                className={`absolute top-1/2 transform -translate-y-[200%] transition-all duration-300 ${
                  currentPosition >= midPoint ? 'opacity-25' : 'opacity-100'
                }`}
                style={{ left: `${(midPoint / tasks.length) * 100}%` }}
              >
                <div className={`w-8 h-8 rounded-full ${
                  taskMode === 'morning'
                    ? 'bg-amber-200 text-amber-600'
                    : 'bg-indigo-200 text-indigo-600'
                } flex items-center justify-center animate-bounce-slow`}>
                  <Apple size={20} />
                </div>
              </div>
            )}
          </div>
          
          {/* Character position */}
          <div 
            className="absolute top-1/2 transform -translate-y-[140%] transition-all duration-500 ease-in-out"
            style={{ 
              left: `calc(${currentPosition * (100 / tasks.length)}% + ${8 - currentPosition/2}px)`,
            }}
          >
            <CharacterSprite mode={taskMode} />
          </div>
          
          {/* Start and Finish markers */}
          <div className="absolute bottom-4 left-4 text-xs font-medium text-amber-700 dark:text-amber-300">
            Start
          </div>
          <div className="absolute bottom-4 right-4 text-xs font-medium text-amber-700 dark:text-amber-300">
            Finish
          </div>
          
          {/* Background elements */}
          <div className={`absolute inset-0 pointer-events-none ${
            taskMode === 'morning' 
              ? 'bg-[url(/images/day-landscape.svg)]' 
              : 'bg-[url(/images/night-landscape.svg)]'
          } bg-cover bg-center opacity-30`}>
          </div>
        </div>
        
        <div className="mt-4 text-center text-sm text-slate-600 dark:text-slate-400">
          <p>Complete tasks to advance on your quest!</p>
          <p className="mt-1 font-medium">
            Progress: {completedCount}/{tasks.length} tasks completed
          </p>
        </div>
      </div>
      
      {showMilestone && (
        <MilestoneModal onClose={() => setShowMilestone(false)} />
      )}
    </>
  );
};

export default QuestMap;