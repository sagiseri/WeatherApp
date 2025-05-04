/**
 * Service for weather forecast API communication
 * API docs: https://www.7timer.info/doc.php?lang=en
 */
const BASE_URL = 'https://www.7timer.info/bin/api.pl';

/**
 * Fetches 7-day weather forecast by coordinates
 */
export const fetchWeatherForecast = async (lat, lon) => {
    try {
        const params = new URLSearchParams({
            lon: lon.toFixed(6),
            lat: lat.toFixed(6),
            product: 'civillight',
            output: 'json'
        });

        const response = await fetch(`${BASE_URL}?${params}`);

        if (!response.ok) {
            throw new Error(`Weather API error: ${response.status}`);
        }

        const data = await response.json();

        if (!data.dataseries || !Array.isArray(data.dataseries)) {
            throw new Error('Invalid weather data format');
        }

        return data.dataseries;
    } catch (error) {
        throw new Error('Failed to load weather data. Please try again later.');
    }
};
