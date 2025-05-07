import { WEATHER_CODE_DESCRIPTIONS } from './constants';
/**
 * Formats a date string from the weather API into a human-readable date format (DD/MM/YYYY).
 * @param apiDate - The date string from the API, in the format YYYYMMDD.
 * @returns {`${string}/${string}/${string}`} - The formatted date as a string in the format DD/MM/YYYY.
 */
export const formatWeatherDate = (apiDate) => {
    const dateStr = apiDate.toString();
    return `${dateStr.slice(6,8)}/${dateStr.slice(4,6)}/${dateStr.slice(0,4)}`;
};

/**
 * Returns a human-readable description of the weather based on the given weather code.
 * @param weatherCode - The weather code from the API
 * @returns {*} - A human-readable description of the weather
 */
export const getWeatherDescription = (weatherCode) => {
    return WEATHER_CODE_DESCRIPTIONS[weatherCode] || weatherCode;
};