// src/utils/constants.js
/**
 * An array of initial cities with their details including id, name, country, latitude, longitude, and whether the city is marked as a favorite.
 * @type {[{country: string, latitude: number, name: string, id: number, longitude: number, isFavorite: boolean},{country: string, latitude: number, name: string, id: number, longitude: number, isFavorite: boolean},{country: string, latitude: number, name: string, id: number, longitude: number, isFavorite: boolean},{country: string, latitude: number, name: string, id: number, longitude: number, isFavorite: boolean},{country: string, latitude: number, name: string, id: number, longitude: number, isFavorite: boolean},null,null,null]}
 */
export const initialCities = [
    {
        id: 1,
        name: "Paris",
        country: "France",
        latitude: 48.8566,
        longitude: 2.3522,
        isFavorite: true
    },
    {
        id: 2,
        name: "New York",
        country: "USA",
        latitude: 40.7128,
        longitude: -74.0060,
        isFavorite: true
    },
    {
        id: 3,
        name: "Tokyo",
        country: "Japan",
        latitude: 35.6762,
        longitude: 139.6503,
        isFavorite: true
    },
    {
        id: 4,
        name: "Tel Aviv",
        country: "Israel",
        latitude: 32.0853,
        longitude: 34.7818,
        isFavorite: true
    },
    {
        id: 5,
        name: "Sydney",
        country: "Australia",
        latitude: -33.8688,
        longitude: 151.2093,
        isFavorite: true
    },
    {
        id: 6,
        name: "London",
        country: "United Kingdom",
        latitude: 51.5072,
        longitude: -0.1276,
        isFavorite: true
    },
    {
        id: 7,
        name: "Barcelona",
        country: "Spain",
        latitude: 41.3851,
        longitude: 2.1734,
        isFavorite: true
    },
    {
        id: 8,
        name: "Berlin",
        country: "Germany",
        latitude: 52.52,
        longitude: 13.4050,
        isFavorite: true
    }
];
/**
 * A list of default countries used for filtering cities or for display purposes.
 * @type {string[]}
 */
export const DEFAULT_COUNTRIES = [
    'Israel', 'USA', 'France', 'Japan',
    'Spain', 'Italy', 'Germany', 'United Kingdom',
    'Canada', 'Australia', 'Brazil', 'South Africa'
];


/**
 * The base URL for the weather API.
 * @type {string}
 */
export const WEATHER_API_URL = 'https://www.7timer.info/bin/api.pl';
/**
 * Error messages related to city form validation.
 * @type {{INVALID_LATITUDE: string, DUPLICATE_CITY_NAME: string, INVALID_CITY_NAME: string, REQUIRED_CITY_NAME: string, REQUIRED_COUNTRY: string, INVALID_LONGITUDE: string, DUPLICATE_COORDINATES: string}}
 */
export const ERROR_VALIDATE_MESSAGES = {
    REQUIRED_CITY_NAME: 'City name is required',
    INVALID_CITY_NAME: 'City name can only contain letters and spaces',
    REQUIRED_COUNTRY: 'Country is required',
    INVALID_LATITUDE: 'Latitude must be a number between -90 and 90',
    INVALID_LONGITUDE: 'Longitude must be a number between -180 and 180',
    DUPLICATE_CITY_NAME: 'A city with this name already exists',
    DUPLICATE_COORDINATES: 'These coordinates are already in use',
};
/**
 * Error messages related to weather fetching and parsing.
 * @type {{INVALID_FORMAT: string, FETCH_FAILED: string, API_ERROR: string}}
 */
export const WEATHER_ERRORS = {
    API_ERROR: 'Weather API error',
    INVALID_FORMAT: 'Invalid weather data format',
    FETCH_FAILED: 'Failed to load weather data. Please try again later.'
};
/**
 * Descriptions for weather codes returned by the API.
 * Maps weather condition codes to human-readable descriptions
 *
 * @type {{rain: string, rainsnow: string, lightrain: string, oshower: string, clear: string, ishower: string, humid: string, mcloudy: string, tsrain: string, cloudy: string, lightsnow: string, snow: string, pcloudy: string, ts: string}}
 */
export const WEATHER_CODE_DESCRIPTIONS = {
    'clear': 'Clear',
    'pcloudy': 'Partly cloudy',
    'mcloudy': 'Mostly cloudy',
    'cloudy': 'Cloudy',
    'humid': 'Humid',
    'lightrain': 'Light rain',
    'oshower': 'Occasional showers',
    'ishower': 'Isolated showers',
    'lightsnow': 'Light snow',
    'rain': 'Rain',
    'snow': 'Snow',
    'rainsnow': 'Rain and snow',
    'ts': 'Thunderstorm',
    'tsrain': 'Thunderstorm with rain'
};
/**
 * List of submitters for the project.
 * @type {[{name: string, email: string},{name: string, email: string}]}
 */
export const SUBMITTERS = [
    {
        name: "Sagi Seri",
        email: "sagise@edu.jmc.ac.il"
    },
    {
        name: "Malka Grafstein",
        email: "malkagra@edu.jmc.ac.il"
    }
];
/**
 * General weather fetching error message.
 * @type {string}
 */
export const WEATHER_FETCH_ERROR = 'Failed to fetch weather data';
/**
 * Error message when failing to load cities.
 * @type {string}
 */
export const ERROR_LOAD_CITIES = 'Failed to load cities:';
/**
 * Constants representing loading stages for error handling.
 * @type {string}
 */
export const ERROR_STAGE_LOAD = 'load';
/**
 * Constants representing saving stages for error handling.
 * @type {string}
 */
export const ERROR_STAGE_SAVE = 'save';

/**
 * Redux action type for setting all cities.
 * @type {string}
 */
export const SET_CITIES = 'SET_CITIES';
/**
 * Redux action type for adding a new city.
 * @type {string}
 */
export const ADD_CITY = 'ADD_CITY';
/**
 * Redux action type for updating an existing city.
 * @type {string}
 */
export const UPDATE_CITY = 'UPDATE_CITY';
/**
 * Redux action type for removing a city.
 * @type {string}
 */
export const REMOVE_CITY = 'REMOVE_CITY';
/**
 * Redux action type for toggling a city's favorite status.
 * @type {string}
 */
export const TOGGLE_FAVORITE_CITY = 'TOGGLE_FAVORITE_CITY';
/**
 * Redux action type for filtering cities by country.
 * @type {string}
 */
export const FILTER_BY_COUNTRY = 'FILTER_BY_COUNTRY';
/**
 * Redux action type for resetting the country filter.
 * @type {string}
 */
export const RESET_CITY_FILTER = 'RESET_CITY_FILTER';
/**
 * Redux action type for setting an error during cities fetch.
 * @type {string}
 */
export const SET_CITIES_ERROR = 'SET_CITIES_ERROR';