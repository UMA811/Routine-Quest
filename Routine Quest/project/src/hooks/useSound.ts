import { useCallback } from 'react';

type SoundType = 'click' | 'victory' | 'move';

export default function useSound() {
  const soundFiles = {
    click: '/sounds/click.mp3',
    victory: '/sounds/victory.mp3',
    move: '/sounds/move.mp3'
  };

  const playSound = useCallback((type: SoundType) => {
    try {
      // Only play sounds if they exist and if the browser supports audio
      if (typeof Audio !== 'undefined') {
        const audio = new Audio(soundFiles[type]);
        audio.volume = 0.5; // Set volume to 50%
        const playPromise = audio.play();
        
        if (playPromise !== undefined) {
          playPromise.catch(e => {
            console.log('Audio play failed:', e);
          });
        }
      }
    } catch (error) {
      console.log('Failed to play sound:', error);
    }
  }, []);

  return { playSound };
}