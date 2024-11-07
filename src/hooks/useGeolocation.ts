import { useState, useEffect } from "react";

type Position = {
  latitude: number;
  longitude: number;
  accuracy: number;
};

type Options = {
  enableHighAccuracy?: boolean;
  timeout?: number;
  maximumAge?: number;
  watch?: boolean; // New option to enable watchPosition
};

export const useGeolocation = (options: Options = { watch: false }) => {
  const [position, setPosition] = useState<Position | null>(null);
  const [error, setError] = useState<GeolocationPositionError | string | null>(null);

  useEffect(() => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser");
      return;
    }

    const success = (pos: GeolocationPosition) => {
      setPosition({
        latitude: pos.coords.latitude,
        longitude: pos.coords.longitude,
        accuracy: pos.coords.accuracy,
      });
    };

    const errorHandler = (err: GeolocationPositionError) => {
      setError(err.message);
    };

    const geoOptions: PositionOptions = {
      enableHighAccuracy: options.enableHighAccuracy || false,
      timeout: options.timeout || 10000, // default timeout of 10s
      maximumAge: options.maximumAge || 0,
    };

    if (options.watch) {
      const watchId = navigator.geolocation.watchPosition(success, errorHandler, geoOptions);
      return () => navigator.geolocation.clearWatch(watchId); // Cleanup watch on unmount
    } else {
      navigator.geolocation.getCurrentPosition(success, errorHandler, geoOptions);
    }
  }, [options]);

  return { position, error };
};
