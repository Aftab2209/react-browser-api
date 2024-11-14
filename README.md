# 📦 react-browser-api

[![npm version](https://badge.fury.io/js/react-browser-api.svg)](https://www.npmjs.com/package/your-package-name)
[![downloads](https://img.shields.io/npm/dm/react-browser-api.svg)](https://www.npmjs.com/package/your-package-name)

A simple yet powerful React hooks library for browser APIs like enhanced LocalStorage with auto-expiry and easy set/get methods to track item age, same for Session Storage, Geolocation, and Clipboard. Effortlessly add real-time location tracking, clipboard access, and smart storage to your React apps.

---

## 📜 Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [API Reference](#api-reference)
- [Examples](#examples)
- [Configuration](#configuration)
- [Contributing](#contributing)
- [License](#license)

---

## 🌟 Key Features


- 💾 **Enhanced LocalStorage Support**:
  - **Auto-Expiry**: Set expirations(optional) for stored items, automatically removing them when expired.
  - **Age Tracking**: Check how long an item has been stored and track its last-set duration.
- ⚡ **Lightweight and Efficient**: Optimized for performance with minimal dependencies and easy setup.
- 🚀 **Effortless API Access**: Easily integrate Geolocation, Clipboard, LocalStorage, and SessionStorage APIs with just a few hooks.
- 📍 **Real-Time Location Tracking**: Access user location seamlessly with the Geolocation hook.
- 📋 **Clipboard Control**: Simple methods to read from and write to the user’s clipboard.


---

## 🚀 Installation

You can install `react-browser-api` using npm or yarn:

```bash
# Using npm
npm install react-browser-api

# Using yarn
yarn ad
d react-browser-api
```
---

# 💡 Usage

## 🗃️ useLocalStorage

The `useLocalStorage` hook allows you to interact with `localStorage` efficiently, offering features like key expiration and last-set duration tracking.


### Import the Hook

To start using the hook, import it as follows:

```javascript

import { useLocalStorage } from 'react-browser-api';

```


### Initialize the Hook

```javascript

const {
  storedValues,  // All stored key-value pairs
  error,         // Error message, if any
  setValue,      // Function to set a value
  clear,         // Function to clear a key-value pair
  addKey,        // Function to add a new key
  deleteKey,     // Function to delete a key
  getKey,        // Function to retrieve the value of a key
  getDuration,   // Function to get time since key was set
} = useLocalStorage();


```
### LocalStorage Functions
<br>

| Function    | Description                                                                   | Parameters                                                                                                                                                                                  | Return Type              |
|-------------|-------------------------------------------------------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|--------------------------|
| **setValue**    | Sets a value for a specified key with an optional expiry time.                | **key (string)**: The key to set <br> **value (string or null)**: The value to store <br> **expireIn (number, optional)**: Expiry time in milliseconds. If omitted, the key will persist indefinitely.  | void                     |
| **clear**       | Removes a specific key from localStorage.                                     | **key (string)**: The key to clear                                                                                                                                                              | void                     |
| **addKey**      | Adds a new key-value pair to localStorage with an optional expiry time.       | **key (string)**: The key to add <br> **value (string or null)**: The value to store <br>  **expireIn (number, optional)**: Expiry time in milliseconds                                                 | void                     |
| **deleteKey**   | Deletes a specific key from localStorage, removing it from state and storage. | **key (string)**: The key to delete                                                                                                                                                             | void                     |
| **getKey**      | Retrieves the value of a specified key from localStorage.                     | **key (string)**: The key to retrieve                                                                                                                                                           | string or null           |
| **getDuration** | Returns the time duration (in minutes) since the specified key was last set.  | **key (string)**: The key to check                                                                                                                                                              | number (minutes) or null |

### LocalStorage State Properties

<br>

| **Property** | **Description**                                                   |
|--------------|-------------------------------------------------------------------|
| **storedValues** | Contains all key-value pairs currently in localStorage.           |
| **error**        | Contains any error message that occurs during storage operations. |


### Usage Examples

<br>

**1. Setting a Value with Expiry**
```
 setValue('userToken', 'abc123', 60000); // Expires in 60 seconds
```

**2. Retrieving a Value**
```
const token = getKey('userToken'); // Returns 'abc123' if not expired
```

**3. Deleting a Key**
```
deleteKey('userToken'); // Removes 'userToken' from localStorage
```

**4. Checking Duration Since Set**
```
const minutesElapsed = getDuration('userToken'); // Returns minutes since 'userToken' was set
```
**5. Clearing a Key**
```
clear('userToken'); // Clears 'userToken' from localStorage and state
```
<br>

## 🗃️ useSessionStorage

This custom hook provides a simple and flexible way to manage session storage in your React applications. It supports features like time-to-live (TTL) for key expiration, session storage syncing across tabs, and batch operations for managing multiple keys.

## Key Features

- 🔹 **Set and Get Values**: Easily set, get, and delete values from sessionStorage.
- 🔹 **Time-to-Live (TTL)**: Automatically set expiration time for keys.
- 🔹 **Sync Across Tabs**: Sync session storage values across different browser tabs.
- 🔹 **Batch Operations**: Set and get multiple keys at once.
- 🔹 **Error Handling**: Tracks and reports any issues with reading or writing to sessionStorage.

<br>

## Usage

### Import the Hook

To start using the hook, import it as follows:

```javascript

import { useSessionStorage } from 'react-browser-api';

```

### Initialize the Hook

<br>

```javascript

const {
  storedValues,
  setValue,
  getKey,
  clear,
  addKey,
  deleteKey,
  batchSet,
  batchGet,
  error
} = useSessionStorage();

```

### API Reference

<br>

| **Function** | **Description**                                                   |
|--------------|-------------------------------------------------------------------|
| **ssetValue(key, value, ttl)** |Sets a value for a given key in sessionStorage with an optional TTL.         |
| **clear(key)**        | Clears the value for a given key from sessionStorage. |
| **addKey(key, value, ttl)** | Adds a new key-value pair to sessionStorage with an optional TTL.      |
| **deleteKey(key)**        | Deletes a key-value pair from sessionStorage and state. |
| **getKey(key)** | Retrieves the value of a specific key from sessionStorage.           |
| **batchSet(items, ttl)**        | Sets multiple key-value pairs at once in sessionStorage with an optional TTL for each.
| **batchGet(keys)** | Retrieves multiple keys at once from sessionStorage.|


<br>

## 📋 useClipboard

This custom hook provides a simple interface for copying text to and reading text from the clipboard. It handles common clipboard operations and error management.

## Key Features

- **Copy to Clipboard**: Easily copy text to the clipboard.
- **Read from Clipboard**: Retrieve text from the clipboard.
- **Error Handling**: Tracks and reports errors during clipboard operations.
- **State Management**: Updates state with the current clipboard content.

## Usage

### Import the Hook

To start using the hook, import it as follows:

```javascript

import { useClipboard } from 'react-browser-api';

```

### Initialize the Hook

<br>

```javascript

const { clipboardContent, error, copyToClipboard, readFromClipboard } = useClipboard();

```

### API Reference

<br>

| Variable / Function       | Description                                                             |
|---------------------------|-------------------------------------------------------------------------|
| `clipboardContent`         | Stores the current content of the clipboard (either the copied or read value). |
| `error`                    | Stores any error message if an operation fails (copy or read).           |
| `copyToClipboard(text)`    | Copies the provided `text` to the clipboard and updates `clipboardContent`. |
| `readFromClipboard()`      | Reads the current text from the clipboard and updates `clipboardContent`. |


<br>

## 📍 useGeolocation

The `useGeolocation` hook provides an easy way to retrieve the user's geolocation data, with support for both one-time fetches and continuous location updates. It also handles browser compatibility issues and provides error handling.


## Key Features

- **Get Current Position**: Fetches the user's current geolocation (`latitude`, `longitude`, `accuracy`).
- **Watch for Position Updates**: Optionally, continuously track the user's location.
- **Error Handling**: Provides an error message if geolocation is not supported or if there are issues retrieving the position.
- **High Accuracy Option**: Option to request high-accuracy geolocation data.

## Usage

### Import the Hook

To start using the hook, import it as follows:

```javascript

import { useGeolocation } from 'react-browser-api';

```

### Initialize the Hook

<br>

```javascript

 const { position, error } = useGeolocation({
    enableHighAccuracy: true,
    timeout: 5000,
    watch: true,  // Keep watching the geolocation
  });

```
### Options  object

<br>

| Property             | Type      | Default   | Description                                                                                 |
|----------------------|-----------|-----------|---------------------------------------------------------------------------------------------|
| `enableHighAccuracy` | `boolean` | `false`   | If set to `true`, the browser will attempt to fetch a more accurate position (e.g., GPS).    |
| `timeout`            | `number`  | `10000`   | The maximum time (in milliseconds) to wait for a geolocation response before timing out.     |
| `maximumAge`         | `number`  | `0`       | The maximum age (in milliseconds) of a cached position that will be used.                   |
| `watch`              | `boolean` | `false`   | If `true`, the geolocation will be tracked continuously using `watchPosition`.              |


### API Reference

| Variable / Function       | Description                                                             |
|---------------------------|-------------------------------------------------------------------------|
| `position`                | Contains the current geolocation (latitude, longitude, accuracy) or `null` if not available. |
| `error`                   | Stores any error message if geolocation retrieval fails (e.g., unsupported browser or other errors). |
| `options`                 | Options object for the geolocation request. Includes:                    |
|                           | - `enableHighAccuracy`: Whether to request high-accuracy geolocation (default: `false`) |
|                           | - `timeout`: The maximum time (in milliseconds) to wait for a geolocation response (default: `10000ms`) |
|                           | - `maximumAge`: The maximum age (in milliseconds) of a cached position to return (default: `0ms`) |
|                           | - `watch`: Whether to use `watchPosition` instead of `getCurrentPosition` for continuous updates (default: `false`) |


## About Me

### Developed by Aftab.  
Visit my personal website at [www.aftabalam.in](http://www.aftabalam.in).



