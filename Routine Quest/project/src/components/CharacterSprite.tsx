import React from 'react';
import { useTask } from '../contexts/TaskContext';

interface CharacterSpriteProps {
  mode: 'morning' | 'night';
}

const CharacterSprite: React.FC<CharacterSpriteProps> = ({ mode }) => {
  const { completedCount, tasks } = useTask();
  const progress = tasks.length > 0 ? completedCount / tasks.length : 0;
  
  // Character states based on progress
  const getCharacterMood = () => {
    if (progress === 1) return 'happy';
    if (progress >= 0.6) return 'motivated';
    if (progress >= 0.3) return 'neutral';
    return 'sleepy';
  };
  
  const mood = getCharacterMood();
  
  return (
    <div 
      className={`w-12 h-12 rounded-full flex items-center justify-center ${
        mode === 'morning' 
          ? 'bg-amber-400 dark:bg-amber-500' 
          : 'bg-indigo-400 dark:bg-indigo-500'
      } shadow-md transition-all duration-300 animate-bounce-slow`}
    >
      {/* Character face expressions change based on progress */}
      <div className="text-lg">
        {mood === 'happy' && '😁'}
        {mood === 'motivated' && '😊'}
        {mood === 'neutral' && '😐'}
        {mood === 'sleepy' && '😴'}
      </div>
    </div>
  );
};

export default CharacterSprite;