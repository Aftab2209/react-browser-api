import { useState, useEffect } from 'react';

// Type definition for the stored values
type StoredValues = Record<string, string | null>;  

export const useSessionStorage = (
  keys: string[] = [], 
  initialValues: Record<string, string | null> = {},
  ttl: number = 0 // Time-to-live in milliseconds
) => {
  const [storedValues, setStoredValues] = useState<StoredValues>({});
  const [error, setError] = useState<string | null>(null);

  // Function to serialize non-primitive data (like objects)
  const serialize = (value: any) => {
    return JSON.stringify(value);
  };

  // Function to deserialize the stored data
  const deserialize = (value: string) => {
    return JSON.parse(value);
  };

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

  // Function to sync sessionStorage across tabs
  const syncStorageAcrossTabs = (e: StorageEvent) => {
    if (e.storageArea === sessionStorage) {
      setStoredValues((prevState) => {
        const updatedValues = { ...prevState };
        updatedValues[e.key!] = e.newValue;
        return updatedValues;
      });
    }
  };

  // Initialize sessionStorage values on the first render
  useEffect(() => {
    if (keys.length === 0) return;

    const values: StoredValues = {};
    keys.forEach((key) => {
      try {
        const item = sessionStorage.getItem(key);
        const expiry = getExpiry(key);

        // Check if data has expired
        if (item !== null && (expiry === null || Date.now() < expiry)) {
          values[key] = deserialize(item);
        } else {
          values[key] = initialValues[key] ?? null;
          if (initialValues[key] !== undefined) {
            sessionStorage.setItem(key, serialize(initialValues[key] ?? ''));
            if (ttl > 0) setExpiry(key, ttl);  // Set TTL if provided
          }
        }
      } catch (err) {
        setError("Failed to read from sessionStorage");
      }
    });

    setStoredValues(values);

    // Listen for storage changes in other tabs
    window.addEventListener('storage', syncStorageAcrossTabs);

    // Cleanup listener on component unmount
    return () => {
      window.removeEventListener('storage', syncStorageAcrossTabs);
    };
  }, [keys, initialValues, ttl]);

  // Function to set the value for a specific key
  const setValue = (key: string, value: string | null) => {
    try {
      if (value === null) {
        sessionStorage.removeItem(key);
        sessionStorage.removeItem(`${key}_expiry`); // Remove expiration
      } else {
        sessionStorage.setItem(key, serialize(value));
        if (ttl > 0) setExpiry(key, ttl); // Set TTL if needed
      }
      setStoredValues((prevState) => ({
        ...prevState,
        [key]: value,
      }));
      setError(null);
    } catch (err) {
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
    } catch (err) {
      setError("Failed to clear sessionStorage");
    }
  };

  // Function to add a new key-value pair
  const addKey = (key: string, value: string | null) => {
    setValue(key, value); // Add is just a specialized set operation
  };

  // Function to delete a key from sessionStorage and state
  const deleteKey = (key: string) => {
    clear(key); // Delete is just a specialized clear operation
  };

  // Function to retrieve a key's value from sessionStorage
  const getKey = (key: string) => {
    return storedValues[key] ?? null;
  };

  // Function to batch set multiple keys at once
  const batchSet = (items: Record<string, string | null>) => {
    Object.entries(items).forEach(([key, value]) => {
      setValue(key, value);
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
