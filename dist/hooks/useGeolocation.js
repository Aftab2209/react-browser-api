"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useGeolocation = void 0;
const react_1 = require("react");
const useGeolocation = (options = { watch: false }) => {
    const [position, setPosition] = (0, react_1.useState)(null);
    const [error, setError] = (0, react_1.useState)(null);
    (0, react_1.useEffect)(() => {
        if (!navigator.geolocation) {
            setError("Geolocation is not supported by your browser");
            return;
        }
        const success = (pos) => {
            setPosition({
                latitude: pos.coords.latitude,
                longitude: pos.coords.longitude,
                accuracy: pos.coords.accuracy,
            });
        };
        const errorHandler = (err) => {
            setError(err.message);
        };
        const geoOptions = {
            enableHighAccuracy: options.enableHighAccuracy || false,
            timeout: options.timeout || 10000, // default timeout of 10s
            maximumAge: options.maximumAge || 0,
        };
        if (options.watch) {
            const watchId = navigator.geolocation.watchPosition(success, errorHandler, geoOptions);
            return () => navigator.geolocation.clearWatch(watchId); // Cleanup watch on unmount
        }
        else {
            navigator.geolocation.getCurrentPosition(success, errorHandler, geoOptions);
        }
    }, [options]);
    return { position, error };
};
exports.useGeolocation = useGeolocation;
