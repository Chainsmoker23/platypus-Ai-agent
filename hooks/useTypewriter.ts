
import { useRef, useCallback, useEffect } from 'react';

export const useTypewriter = () => {
  const timeoutIds = useRef<number[]>([]);

  /**
   * Clears all active timeouts tracked by this hook.
   */
  const cleanup = useCallback(() => {
    timeoutIds.current.forEach(window.clearTimeout);
    timeoutIds.current = [];
  }, []);

  /**
   * Types text character by character calling the onUpdate callback.
   * Returns a promise that resolves when typing is complete.
   */
  const typeText = useCallback((text: string, onUpdate: (char: string) => void, delay: number = 30) => {
    return new Promise<void>((resolve) => {
      let i = 0;
      const tick = () => {
        if (i < text.length) {
          onUpdate(text.charAt(i));
          i++;
          const id = window.setTimeout(tick, delay);
          timeoutIds.current.push(id);
        } else {
          resolve();
        }
      };
      tick();
    });
  }, []);

  /**
   * Waits for a specified duration.
   * Tracks the timeout ID so it can be cleared via cleanup().
   */
  const wait = useCallback((ms: number) => {
    return new Promise<void>((resolve) => {
      const id = window.setTimeout(resolve, ms);
      timeoutIds.current.push(id);
    });
  }, []);

  // Automatically cleanup on unmount
  useEffect(() => {
    return () => cleanup();
  }, [cleanup]);

  return { typeText, wait, cleanup };
};
