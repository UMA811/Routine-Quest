import React, { useState, useEffect } from 'react';
import { useTask } from '../contexts/TaskContext';
import { morningTips, nightTips } from '../data/tips';
import { Apple } from 'lucide-react';

interface MilestoneModalProps {
  onClose: () => void;
}

const MilestoneModal: React.FC<MilestoneModalProps> = ({ onClose }) => {
  const { taskMode, completedCount } = useTask();
  const [isVisible, setIsVisible] = useState(false);
  
  const tips = taskMode === 'morning' ? morningTips : nightTips;
  const currentTip = tips[Math.min(completedCount - 1, tips.length - 1)];
  
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="fixed inset-0 flex items-center justify-center z-40 px-4">
      <div 
        className="fixed inset-0 bg-black/30 animate-fade-in" 
        onClick={onClose}
      />
      
      <div className={`bg-white dark:bg-slate-800 rounded-xl shadow-xl p-6 max-w-md w-full relative z-50 transform transition-all duration-300 ${
        isVisible ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
      }`}>
        <div className="text-center">
          <div className="w-16 h-16 rounded-full bg-amber-100 dark:bg-amber-900/50 flex items-center justify-center mx-auto mb-4">
            <Apple className="w-8 h-8 text-amber-600 dark:text-amber-400" />
          </div>
          
          <h3 className="text-xl font-bold text-amber-800 dark:text-amber-300 mb-2">
            {currentTip.encouragement}
          </h3>
          
          <div className="bg-amber-50 dark:bg-amber-900/30 rounded-lg p-4 mb-4">
            <p className="text-amber-800 dark:text-amber-200">
              <span className="font-medium">Health Tip:</span> {currentTip.text}
            </p>
          </div>
          
          <button
            onClick={onClose}
            className="px-6 py-2 rounded-lg bg-amber-500 hover:bg-amber-600 dark:bg-amber-600 dark:hover:bg-amber-700 text-white font-medium transition-colors duration-200"
          >
            Continue Quest
          </button>
        </div>
      </div>
    </div>
  );
};

export default MilestoneModal;