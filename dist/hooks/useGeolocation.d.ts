type Position = {
    latitude: number;
    longitude: number;
    accuracy: number;
};
type Options = {
    enableHighAccuracy?: boolean;
    timeout?: number;
    maximumAge?: number;
    watch?: boolean;
};
export declare const useGeolocation: (options?: Options) => {
    position: Position | null;
    error: string | GeolocationPositionError | null;
};
export {};
