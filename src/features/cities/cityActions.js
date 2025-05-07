// src/features/cities/cityActions.js
import {
    SET_CITIES,
    ADD_CITY,
    UPDATE_CITY,
    REMOVE_CITY,
    TOGGLE_FAVORITE_CITY,
    FILTER_BY_COUNTRY,
    RESET_CITY_FILTER,
} from '../../utils/constants';

/**
 * Loads a list of cities into the state.
 * @param cities - Array of city objects.
 * @returns {{payload, type: string}} Action object.
 */

export const loadCities = (cities) => ({
    type: SET_CITIES,
    payload: cities
});

/**
 * Adds a new city to the state
 * @param cityData - New city data without an ID.
 * @returns {{payload: (*&{id: number, isFavorite: boolean}), type: string}} Action object with generated ID and default favorite status.
 */
export const addCity = (cityData) => ({
    type: ADD_CITY,
    payload: {
        ...cityData,
        id: Date.now(),
        isFavorite: false
    }
});

/**
 * Updates an existing city.
 * @param updatedCity - Updated city object.
 * @returns {{payload, type: string}} Action object.
 */
export const updateCity = (updatedCity) => ({
    type: UPDATE_CITY,
    payload: updatedCity
});

/**
 * Removes a city by its ID.
 * @param cityId - ID of the city to remove.
 * @returns {{payload, type: string}} Action object.
 */
export const removeCity = (cityId) => ({
    type:  REMOVE_CITY,
    payload: cityId
});

/**
 * Toggles the favorite status of a city.
 * @param cityId - ID of the city to toggle.
 * @returns {{payload, type: string}} Action object.
 */
export const toggleFavoriteCity = (cityId) => ({
    type: TOGGLE_FAVORITE_CITY,
    payload: cityId
});

/**
 * Filters the city list by country.
 * @param country - Country to filter by.
 * @returns {{payload, type: string}} Action object.
 */
export const filterByCountry = (country) => ({
    type: FILTER_BY_COUNTRY,
    payload: country
});

/**
 * Resets the city filter.
 * @returns {{type: string}} Action object.
 */
export const resetCityFilter = () => ({
    type: RESET_CITY_FILTER
});


