import {useEffect, useState} from 'react';

export function useDebounce(func, delay, dependencies) {
  const [timerId, setTimerId] = useState(undefined);

  useEffect(() => {
    return () => {
      if (timerId) {
        clearTimeout(timerId);
      }
    };
  }, [timerId]);

  return (...args) => {
    if (timerId) {
      clearTimeout(timerId);
    }

    const newTimerId = setTimeout(() => {
      func(...args);
    }, delay);

    setTimerId(newTimerId);
  };
}
