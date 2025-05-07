import { useState } from 'react';
import { fetchWeatherForecast } from '../utils/api/fetchWeatherForecast';

/**
 * Custom hook to fetch weather forecast data based on latitude and longitude.
 * Handles loading state, error handling, and prevents duplicate fetches.
 * @returns {{fetchWeather: ((function(*, *): Promise<void>)|*), weatherData: unknown, loading: boolean, error: unknown}}
 */
const useWeatherApi = () => {
    const [weatherData, setWeatherData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [isFetching, setIsFetching] = useState(false);
    /**
     * Fetch weather forecast data for the given coordinates.
     * @param lat - Latitude of the location.
     * @param lon - Longitude of the location.
     * @returns {Promise<void>}
     */
    const fetchWeather = async (lat, lon) => {
        if (isFetching) {
            return;
        }

        setIsFetching(true);
        setLoading(true);
        setError(null);
        try {
            const data = await fetchWeatherForecast(lat, lon);
            setWeatherData(data);
        } catch (err) {
            setError('Failed to fetch weather data');
            setWeatherData(null);
        } finally {
            setLoading(false);
            setIsFetching(false);
        }
    };

    return { weatherData, loading, error, fetchWeather };
};

export default useWeatherApi;