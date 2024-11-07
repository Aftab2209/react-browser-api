"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useClipboard = void 0;
const react_1 = require("react");
const useClipboard = () => {
    const [clipboardContent, setClipboardContent] = (0, react_1.useState)(null);
    const [error, setError] = (0, react_1.useState)(null);
    // Function to copy text to the clipboard
    const copyToClipboard = (text) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            yield navigator.clipboard.writeText(text);
            setClipboardContent(text); // Update state with copied content
            setError(null); // Clear any previous error
        }
        catch (err) {
            setError("Failed to copy to clipboard");
        }
    });
    // Function to read text from the clipboard
    const readFromClipboard = () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const text = yield navigator.clipboard.readText();
            setClipboardContent(text); // Update state with the retrieved content
            setError(null); // Clear any previous error
        }
        catch (err) {
            setError("Failed to read from clipboard");
        }
    });
    return { clipboardContent, error, copyToClipboard, readFromClipboard };
};
exports.useClipboard = useClipboard;
