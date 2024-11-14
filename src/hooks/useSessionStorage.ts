import { useState, useEffect } from 'react';

// Type definition for the stored values
type StoredValues = Record<string, string | null>;

export const useSessionStorage = () => {
  const [storedValues, setStoredValues] = useState<StoredValues>({});
  const [error, setError] = useState<string | null>(null);

  // Function to serialize data
  const serialize = (value: any) => JSON.stringify(value);

  // Function to deserialize stored data
  const deserialize = (value: string) => JSON.parse(value);

  // Function to set the expiration time for a key (TTL)
  const setExpiry = (key: string, ttl: number) => {
    const expiryTime = Date.now() + ttl;
    sessionStorage.setItem(`${key}_expiry`, expiryTime.toString());
  };

  // Function to get the expiration time of a key (TTL)
  const getExpiry = (key: string): number | null => {
    const expiry = sessionStorage.getItem(`${key}_expiry`);
    return expiry ? parseInt(expiry, 10) : null;
  };

  // Function to check if a key has expired
  const isExpired = (key: string): boolean => {
    const expiryTime = getExpiry(key);
    return expiryTime ? Date.now() > expiryTime : false;
  };

  // Function to remove expired keys from sessionStorage and state
  const removeExpiredKeys = () => {
    Object.keys(sessionStorage).forEach((key) => {
      if (key.endsWith('_expiry')) {
        const originalKey = key.replace('_expiry', '');
        if (isExpired(originalKey)) {
          sessionStorage.removeItem(originalKey);
          sessionStorage.removeItem(key);
          setStoredValues((prevState) => {
            const newState = { ...prevState };
            delete newState[originalKey];
            return newState;
          });
        }
      }
    });
  };

  // Sync expired keys removal on component mount and at regular intervals
  useEffect(() => {
    removeExpiredKeys(); // Initial check on mount
    const interval = setInterval(removeExpiredKeys, 10000); // Check every 10 seconds
    return () => clearInterval(interval);
  }, []);

  // Function to sync sessionStorage changes across tabs
  const syncStorageAcrossTabs = (e: StorageEvent) => {
    if (e.storageArea === sessionStorage) {
      setStoredValues((prevState) => ({
        ...prevState,
        [e.key!]: e.newValue ? deserialize(e.newValue) : null,
      }));
    }
  };

  useEffect(() => {
    // Listen for storage changes in other tabs
    window.addEventListener('storage', syncStorageAcrossTabs);

    // Cleanup listener on component unmount
    return () => {
      window.removeEventListener('storage', syncStorageAcrossTabs);
    };
  }, []);

  // Function to set the value for a specific key
  const setValue = (key: string, value: string | null, ttl: number = 0) => {
    try {
      if (value === null) {
        sessionStorage.removeItem(key);
        sessionStorage.removeItem(`${key}_expiry`);
      } else {
        sessionStorage.setItem(key, serialize(value));
        if (ttl > 0) setExpiry(key, ttl);
      }
      setStoredValues((prevState) => ({
        ...prevState,
        [key]: value,
      }));
      setError(null);
    } catch {
      setError("Failed to write to sessionStorage");
    }
  };

  // Function to clear a key from sessionStorage
  const clear = (key: string) => {
    try {
      sessionStorage.removeItem(key);
      sessionStorage.removeItem(`${key}_expiry`);
      setStoredValues((prevState) => {
        const newState = { ...prevState };
        delete newState[key];
        return newState;
      });
      setError(null);
    } catch {
      setError("Failed to clear sessionStorage");
    }
  };

  // Function to add a new key-value pair
  const addKey = (key: string, value: string | null, ttl: number = 0) => {
    setValue(key, value, ttl);
  };

  // Function to delete a key from sessionStorage and state
  const deleteKey = (key: string) => {
    clear(key);
  };

  // Function to retrieve a key's value from sessionStorage
  const getKey = (key: string) => {
    if (isExpired(key)) {
      clear(key); // Clear the expired key
      return null;
    }
    return storedValues[key] ?? null;
  };

  // Function to batch set multiple keys at once
  const batchSet = (items: Record<string, string | null>, ttl: number = 0) => {
    Object.keys(items).forEach((key) => {
      const value = items[key];
      setValue(key, value, ttl);
    });
  };

  // Function to batch get multiple keys at once
  const batchGet = (keys: string[]) => {
    const result: Record<string, string | null> = {};
    keys.forEach((key) => {
      result[key] = getKey(key);
    });
    return result;
  };

  return {
    storedValues,
    error,
    setValue,
    clear,
    addKey,
    deleteKey,
    getKey,
    batchSet,
    batchGet,
  };
};
