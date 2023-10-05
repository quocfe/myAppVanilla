import { useEffect, useState } from "@/utils";

function useLocalStorage(key, initialValue) {
  const initialFn = () => {
    const item = JSON.parse(localStorage.getItem(key)) || initialValue;
    return item ;
  }
  const [storedValue, setStoredValue] = useState(initialFn());


  const setValue = (value) => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
      setStoredValue(value);
    } catch (error) {
      console.error('Error setting localStorage:', error);
    }
  };

  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === key) {
        setStoredValue(JSON.parse(e.newValue));
      }
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [key]);

  return [storedValue, setValue];
}

export default useLocalStorage;
