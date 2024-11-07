# 📦 `react-browser-api`

A powerful and simple-to-use React hooks library for accessing browser APIs like **Geolocation** and **Clipboard**. With this library, you can effortlessly integrate real-time location tracking and clipboard functionality into your React applications.

---

## 🚀 Installation

```bash
npm install react-browser-api
```

## 🧭 useGeolocation

The useGeolocation hook allows you to fetch the user's current location and track it in real-time (if desired). It provides latitude, longitude, and accuracy values, along with error handling.

### 📌 Usage
```bash
import React from "react";
import { useGeolocation } from "react-browser-api";

function LocationComponent() {
  const { position, error } = useGeolocation({ watch: true, enableHighAccuracy: true });

  return (
    <div>
      <h2>Current Location</h2>
      {position ? (
        <p>Latitude: {position.latitude}, Longitude: {position.longitude}</p>
      ) : (
        <p>{error ? `Error: ${error}` : "Fetching location..."}</p>
      )}
    </div>
  );
}
```

### ⚙️ Options

The useGeolocation hook accepts an optional configuration object:

enableHighAccuracy: boolean (default: false) – Request high accuracy location.
timeout: number (default: 10000) – Maximum time (in ms) allowed for obtaining location.
maximumAge: number (default: 0) – Maximum age (in ms) of a possible cached position.
watch: boolean (default: false) – Continuously track location updates.

### 🧾 Return Values

position: { latitude: number, longitude: number, accuracy: number } | null – The latest geolocation data.
error: string | null – Error message if the location could not be retrieved.

## 📋 useClipboard

The useClipboard hook enables seamless clipboard interactions by providing methods to copy to and read from the clipboard, along with error handling.

### 📌 Usage

```bash
import React from "react";
import { useClipboard } from "react-browser-api";

function ClipboardComponent() {
  const { clipboardContent, error, copyToClipboard, readFromClipboard } = useClipboard();

  return (
    <div>
      <h2>Clipboard Example</h2>
      <button onClick={() => copyToClipboard("Hello World!")}>Copy Text</button>
      <button onClick={readFromClipboard}>Read Clipboard</button>
      {clipboardContent && <p>Clipboard Content: {clipboardContent}</p>}
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}
    </div>
  );
}
```

### 🧾 Return Values

clipboardContent: string | null – The current content of the clipboard.
error: string | null – Error message if there was an issue with clipboard access.
copyToClipboard: (text: string) => Promise<void> – Copies the specified text to the clipboard.
readFromClipboard: () => Promise<void> – Reads text from the clipboard.


## ❤️ Developed by

**Aftab**  
[🌐 Website](https://www.aftabalam.in/)