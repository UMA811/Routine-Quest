import React, { useState } from 'react';
import { useTask } from '../contexts/TaskContext';
import { Check, RotateCcw, Plus, X, Edit2, Save } from 'lucide-react';

const TaskList: React.FC = () => {
  const { tasks, toggleTask, taskMode, completedCount, resetTasks, addTask, removeTask, editTask } = useTask();
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingTitle, setEditingTitle] = useState('');

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTaskTitle.trim()) {
      addTask(newTaskTitle.trim());
      setNewTaskTitle('');
    }
  };

  const startEditing = (id: string, title: string) => {
    setEditingId(id);
    setEditingTitle(title);
  };

  const handleEditSave = (id: string) => {
    if (editingTitle.trim()) {
      editTask(id, editingTitle.trim());
    }
    setEditingId(null);
  };

  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl shadow-md overflow-hidden transition-all duration-300">
      <div className="p-4 border-b border-amber-100 dark:border-slate-700 flex justify-between items-center">
        <h2 className="text-lg font-semibold text-amber-800 dark:text-amber-300">
          {taskMode === 'morning' ? 'Morning Tasks' : 'Evening Tasks'}
        </h2>
        <div className="flex items-center gap-2">
          <span className="text-sm text-amber-600 dark:text-amber-400">
            {completedCount}/{tasks.length} completed
          </span>
          <button 
            onClick={resetTasks}
            className="p-1.5 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-500 dark:text-slate-400"
            title="Reset tasks"
          >
            <RotateCcw size={16} />
          </button>
        </div>
      </div>

      <form onSubmit={handleAddTask} className="p-4 border-b border-amber-100 dark:border-slate-700">
        <div className="flex gap-2">
          <input
            type="text"
            value={newTaskTitle}
            onChange={(e) => setNewTaskTitle(e.target.value)}
            placeholder="Add a new task..."
            className="flex-1 px-3 py-2 rounded-lg border border-amber-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-800 dark:text-slate-200 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500 dark:focus:ring-amber-400"
          />
          <button
            type="submit"
            className="px-3 py-2 rounded-lg bg-amber-500 hover:bg-amber-600 dark:bg-amber-600 dark:hover:bg-amber-700 text-white flex items-center gap-1"
          >
            <Plus size={16} />
            Add
          </button>
        </div>
      </form>
      
      <ul className="divide-y divide-amber-50 dark:divide-slate-700">
        {tasks.map((task) => (
          <li key={task.id} className="relative">
            {editingId === task.id ? (
              <div className="flex items-center gap-2 p-4">
                <input
                  type="text"
                  value={editingTitle}
                  onChange={(e) => setEditingTitle(e.target.value)}
                  className="flex-1 px-3 py-1.5 rounded-lg border border-amber-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-800 dark:text-slate-200"
                  autoFocus
                />
                <button
                  onClick={() => handleEditSave(task.id)}
                  className="p-1.5 rounded-full hover:bg-green-100 dark:hover:bg-green-900/30 text-green-600 dark:text-green-400"
                >
                  <Save size={16} />
                </button>
                <button
                  onClick={() => setEditingId(null)}
                  className="p-1.5 rounded-full hover:bg-red-100 dark:hover:bg-red-900/30 text-red-600 dark:text-red-400"
                >
                  <X size={16} />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => toggleTask(task.id)}
                  className={`flex-1 p-4 text-left flex items-center gap-3 transition-colors duration-200 ${
                    task.completed 
                      ? 'bg-amber-50 dark:bg-slate-700/50' 
                      : 'hover:bg-amber-50/50 dark:hover:bg-slate-700/30'
                  }`}
                >
                  <span 
                    className={`flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                      task.completed 
                        ? 'bg-green-500 border-green-500 dark:bg-green-600 dark:border-green-600' 
                        : 'border-slate-300 dark:border-slate-600'
                    }`}
                  >
                    {task.completed && <Check size={14} className="text-white" />}
                  </span>
                  <span 
                    className={`transition-all duration-200 ${
                      task.completed 
                        ? 'text-slate-500 dark:text-slate-400 line-through' 
                        : 'text-slate-800 dark:text-slate-200'
                    }`}
                  >
                    {task.title}
                  </span>
                </button>
                <div className="flex pr-4">
                  <button
                    onClick={() => startEditing(task.id, task.title)}
                    className="p-1.5 rounded-full hover:bg-amber-100 dark:hover:bg-amber-900/30 text-amber-600 dark:text-amber-400"
                  >
                    <Edit2 size={16} />
                  </button>
                  <button
                    onClick={() => removeTask(task.id)}
                    className="p-1.5 rounded-full hover:bg-red-100 dark:hover:bg-red-900/30 text-red-600 dark:text-red-400"
                  >
                    <X size={16} />
                  </button>
                </div>
              </div>
            )}
          </li>
        ))}
      </ul>
      
      {tasks.length === 0 && (
        <div className="p-8 text-center text-slate-500 dark:text-slate-400">
          No tasks available. Add some tasks to get started!
        </div>
      )}
    </div>
  );
};

export default TaskList;