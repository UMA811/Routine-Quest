import React, { useState, useEffect } from 'react';
import { useTask } from '../contexts/TaskContext';
import { morningQuotes, nightQuotes } from '../data/quotes';
import confetti from 'canvas-confetti';

const VictoryModal: React.FC = () => {
  const { taskMode, resetTasks } = useTask();
  const [isVisible, setIsVisible] = useState(false);
  const [quote, setQuote] = useState({ text: '', author: '' });
  
  useEffect(() => {
    // Select a random quote based on the current mode
    const quotes = taskMode === 'morning' ? morningQuotes : nightQuotes;
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
    setQuote(randomQuote);

    // Short delay before showing the modal
    const timer = setTimeout(() => {
      setIsVisible(true);
      
      // Trigger confetti
      const duration = 3000;
      const end = Date.now() + duration;
      
      const interval = setInterval(() => {
        if (Date.now() > end) {
          return clearInterval(interval);
        }
        
        confetti({
          particleCount: 2,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors: ['#FFB800', '#F56565', '#38B2AC', '#4299E1']
        });
        
        confetti({
          particleCount: 2,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors: ['#FFB800', '#F56565', '#38B2AC', '#4299E1']
        });
      }, 150);
      
      return () => clearInterval(interval);
    }, 300);
    
    return () => clearTimeout(timer);
  }, [taskMode]);
  
  const closeModal = () => {
    setIsVisible(false);
    setTimeout(() => {
      resetTasks();
    }, 300);
  };
  
  if (!isVisible) return null;
  
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 px-4">
      <div 
        className="fixed inset-0 bg-black/50 animate-fade-in" 
        onClick={closeModal}
      ></div>
      
      <div 
        className={`bg-white dark:bg-slate-800 rounded-xl shadow-xl p-6 max-w-md w-full relative z-10 transform transition-all duration-300 ${
          isVisible ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
        }`}
      >
        <div className="text-center">
          <div className="w-20 h-20 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center mx-auto mb-4">
            <span className="text-4xl">🎉</span>
          </div>
          
          <h3 className="text-2xl font-bold text-slate-800 dark:text-white mb-2">
            Quest Complete!
          </h3>
          
          <p className="text-slate-600 dark:text-slate-300 mb-6">
            {taskMode === 'morning' 
              ? "Congratulations! You've completed all your morning tasks. Your day is off to a great start!"
              : "Congratulations! You've completed all your evening tasks. Time for a restful night!"}
          </p>

          <blockquote className="border-l-4 border-amber-500 dark:border-amber-400 pl-4 mb-6">
            <p className="text-lg italic text-slate-700 dark:text-slate-200 mb-2">
              "{quote.text}"
            </p>
            <footer className="text-sm text-slate-500 dark:text-slate-400">
              — {quote.author}
            </footer>
          </blockquote>
          
          <button
            onClick={closeModal}
            className={`px-6 py-3 rounded-lg font-medium text-white ${
              taskMode === 'morning' 
                ? 'bg-amber-500 hover:bg-amber-600' 
                : 'bg-indigo-500 hover:bg-indigo-600'
            } transition-colors duration-200 w-full`}
          >
            Continue Your Journey
          </button>
        </div>
      </div>
    </div>
  );
};

export default VictoryModal;