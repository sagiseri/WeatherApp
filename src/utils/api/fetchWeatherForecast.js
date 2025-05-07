
import { WEATHER_API_URL,WEATHER_ERRORS } from '../constants';

/**
 * Fetches the weather forecast for a given latitude and longitude using the 7timer API.
 * @param lat - The latitude of the location for the weather forecast.
 * @param lon - The longitude of the location for the weather forecast.
 * @returns {Promise<*>} - A promise that resolves to an array of weather data for the location.
 * @throws {Error} - Throws an error if the API request fails, or the response data is in an invalid format.
 */
export const fetchWeatherForecast = async (lat, lon) => {
    try {
        const params = new URLSearchParams({
            lon: lon.toFixed(6),
            lat: lat.toFixed(6),
            product: 'civillight',
            output: 'json'
        });

        const response = await fetch(`${WEATHER_API_URL}?${params}`);

        if (!response.ok) {
            throw new Error(`${WEATHER_ERRORS.API_ERROR}: ${response.status}`);
        }

        const data = await response.json();

        if (!data.dataseries || !Array.isArray(data.dataseries)) {
            throw new Error(WEATHER_ERRORS.INVALID_FORMAT);
        }

        return data.dataseries;
    } catch (error) {
        throw new Error(WEATHER_ERRORS.FETCH_FAILED);
    }
};
