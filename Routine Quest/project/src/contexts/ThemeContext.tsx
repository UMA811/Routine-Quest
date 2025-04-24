import React, { createContext, useContext, useState, useEffect } from 'react';

type ThemeMode = 'morning' | 'night';

interface ThemeContextType {
  mode: ThemeMode;
  toggleMode: () => void;
  setMode: (mode: ThemeMode) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Default to morning mode, or determine based on time of day
  const getCurrentMode = (): ThemeMode => {
    const hours = new Date().getHours();
    return hours >= 6 && hours < 18 ? 'morning' : 'night';
  };

  const [mode, setMode] = useState<ThemeMode>(getCurrentMode());

  useEffect(() => {
    if (mode === 'night') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [mode]);

  const toggleMode = () => {
    setMode(mode === 'morning' ? 'night' : 'morning');
  };

  return (
    <ThemeContext.Provider value={{ mode, toggleMode, setMode }}>
      {children}
    </ThemeContext.Provider>
  );
};