import { useState } from 'react';
import { fetchWeatherForecast } from '../utils/api/fetchWeatherForecast';

/**
 * Hook for fetching weather data
 */
const useWeatherApi = () => {
    const [weatherData, setWeatherData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchWeather = async (lat, lon) => {
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
        }
    };

    return { weatherData, loading, error, fetchWeather };
};

export default useWeatherApi;