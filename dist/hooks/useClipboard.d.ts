export declare const useClipboard: () => {
    clipboardContent: string | null;
    error: string | null;
    copyToClipboard: (text: string) => Promise<void>;
    readFromClipboard: () => Promise<void>;
};
