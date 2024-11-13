import { useState, useEffect } from 'react';

type StoredValue = {
  value: string | null;
  timestamp: number;
  expiry: number | null; // Expiry time in milliseconds
};

export const useLocalStorage = () => {
  const [storedValues, setStoredValues] = useState<Record<string, StoredValue>>({});
  const [deletedKeys, setDeletedKeys] = useState<Set<string>>(new Set());
  const [error, setError] = useState<string | null>(null);

  // Helper function to remove expired keys
  const removeExpiredKeys = (values: Record<string, StoredValue>): Record<string, StoredValue> => {
    const newValues = { ...values };

    Object.keys(values).forEach((key) => {
      const item = values[key];
      // If the item has an expiry time and it's expired, delete it
      if (item.expiry && Date.now() > item.expiry) {
        window.localStorage.removeItem(key); // Remove expired item
        delete newValues[key]; // Remove from state
      }
    });

    return newValues;
  };

  // Initialize the storedValues state from localStorage
  useEffect(() => {
    const values: Record<string, StoredValue> = {};

    // Load stored values from localStorage
    Object.keys(localStorage).forEach((key) => {
      try {
        const item = window.localStorage.getItem(key);

        // If item exists in localStorage and has not been deleted
        if (item !== null && !deletedKeys.has(key)) {
          const storedItem: StoredValue = JSON.parse(item);

          // If expired, remove it from localStorage
          if (storedItem.expiry && Date.now() > storedItem.expiry) {
            window.localStorage.removeItem(key); // Remove expired item
          } else {
            values[key] = storedItem; // Store it if it's not expired
          }
        }
      } catch (err) {
        setError('Failed to read from localStorage');
      }
    });

    // Remove expired keys from state
    const validValues = removeExpiredKeys(values);

    // Only update state if there are new values to set
    if (JSON.stringify(validValues) !== JSON.stringify(storedValues)) {
      setStoredValues(validValues);
    }
  }, [deletedKeys]);

  const setValue = (key: string, value: string | null, expireIn: number = 0) => {
    try {
      const timestamp = Date.now();
      const expiry = expireIn > 0 ? timestamp + expireIn : null; // Calculate expiry timestamp if expiry time is set

      const item: StoredValue = { value, timestamp, expiry };
      window.localStorage.setItem(key, JSON.stringify(item));

      setStoredValues((prevState) => ({
        ...prevState,
        [key]: item,
      }));

      // Automatically delete the key after the expiry time
      if (expireIn > 0) {
        setTimeout(() => {
          deleteKey(key);
        }, expireIn);
      }

      setError(null); // Clear any previous error
    } catch (err) {
      setError('Failed to write to localStorage');
    }
  };

  const clear = (key: string) => {
    try {
      window.localStorage.removeItem(key);
      setStoredValues((prevState) => {
        const newState = { ...prevState };
        delete newState[key];
        return newState;
      });
      setError(null);
    } catch (err) {
      setError('Failed to clear localStorage');
    }
  };

  const addKey = (key: string, value: string | null, expireIn: number = 0) => {
    setValue(key, value, expireIn);
  };

  const deleteKey = (key: string) => {
    try {
      window.localStorage.removeItem(key);
      setStoredValues((prevState) => {
        const newState = { ...prevState };
        delete newState[key];
        return newState;
      });

      // Mark the key as deleted to avoid adding it back during initialization
      setDeletedKeys((prev) => new Set(prev.add(key)));

      setError(null); // Clear any previous error
    } catch (err) {
      setError('Failed to delete key from localStorage');
    }
  };

  const getKey = (key: string) => {
    return storedValues[key]?.value ?? null;
  };

  const getDuration = (key: string): number | null => {
    const item = storedValues[key];
    if (item && item.timestamp) {
      return (Date.now() - item.timestamp) / 60000; // Duration in minutes
    }
    return null; // Return null if the key is not found or not set
  };

  return {
    storedValues,  // Object containing all key-value pairs
    error,
    setValue,      // To set value for a specific key
    clear,         // To clear value for a specific key
    addKey,        // To add a new key-value pair
    deleteKey,     // To delete a specific key
    getKey,        // To get the value of a specific key
    getDuration,   // To get the time duration since the key was last set (in minutes)
  };
};
