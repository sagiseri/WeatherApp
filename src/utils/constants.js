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
export const WEATHER_API_URL = "https://www.7timer.info/bin/api.pl";