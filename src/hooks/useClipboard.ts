import { useState } from "react";

export const useClipboard = () => {
  const [clipboardContent, setClipboardContent] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Function to copy text to the clipboard
  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setClipboardContent(text); // Update state with copied content
      setError(null); // Clear any previous error
    } catch (err) {
      setError("Failed to copy to clipboard");
    }
  };

  // Function to read text from the clipboard
  const readFromClipboard = async () => {
    try {
      const text = await navigator.clipboard.readText();
      setClipboardContent(text); // Update state with the retrieved content
      setError(null); // Clear any previous error
    } catch (err) {
      setError("Failed to read from clipboard");
    }
  };

  return { clipboardContent, error, copyToClipboard, readFromClipboard };
};
