// utils/validation.js

import { ERROR_VALIDATE_MESSAGES } from './constants';
/**
 * Validates if a city name contains only letters and spaces.
 * @param name - The name of the city to validate.
 * @returns {boolean} - Returns `true` if the name is valid, otherwise `false`.
 */
const isValidName = (name) => /^[a-zA-Z\s]+$/.test(name);

/**
 * Validates if a coordinate (latitude or longitude) is within a specified range.
 * @param value - The coordinate value to validate.
 * @param min - The minimum valid value for the coordinate.
 * @param max - The maximum valid value for the coordinate.
 * @returns {boolean} - Returns `true` if the value is a valid coordinate within the range, otherwise `false`.
 */
const isValidCoordinate = (value, min, max) => {
    const num = parseFloat(value);
    return !isNaN(num) && num >= min && num <= max;
};

/**
 * Validates the fields of a city (name, country, latitude, longitude).
 * @param data - The city data to validate.
 * @returns {{}} - An object containing validation errors, or an empty object if there are no errors.
 */
export const validateCityFields = (data) => {
    const errors = {};

    if (!data.name?.trim()) {
        errors.name = ERROR_VALIDATE_MESSAGES.REQUIRED_CITY_NAME;
    } else if (!isValidName(data.name)) {
        errors.name = ERROR_VALIDATE_MESSAGES.INVALID_CITY_NAME;
    }

    if (!data.country?.trim()) {
        errors.country = ERROR_VALIDATE_MESSAGES.REQUIRED_COUNTRY;
    }

    if (!isValidCoordinate(data.latitude, -90, 90)) {
        errors.latitude = ERROR_VALIDATE_MESSAGES.INVALID_LATITUDE;
    }

    if (!isValidCoordinate(data.longitude, -180, 180)) {
        errors.longitude = ERROR_VALIDATE_MESSAGES.INVALID_LONGITUDE;
    }

    return errors;
};

/**
 * Validates if the city name and coordinates are unique among a list of cities.
 * @param data - The city data to validate for uniqueness.
 * @param cities - The array of existing cities to check against.
 * @param excludeId - The ID of the city to exclude from the uniqueness check
 * @returns {{}} - An object containing validation errors for name and coordinates, or an empty object if there are no errors.
 */
export const validateCityUniqueness = (data, cities, excludeId = null) => {
    const errors = {};
    const name = data.name.trim().toLowerCase();
    const lat = parseFloat(data.latitude);
    const lng = parseFloat(data.longitude);

    const isNameUnique = !cities.some(city => {
        if (excludeId && city.id === excludeId) return false;
        return city.name.toLowerCase() === name;
    });

    const isLocationUnique = !cities.some(city => {
        if (excludeId && city.id === excludeId) return false;
        return (
            Math.abs(city.latitude - lat) < 0.0001 &&
            Math.abs(city.longitude - lng) < 0.0001
        );
    });

    if (!isNameUnique) errors.name = ERROR_VALIDATE_MESSAGES.DUPLICATE_CITY_NAME;
    if (!isLocationUnique) {
        errors.coordinates = ERROR_VALIDATE_MESSAGES.DUPLICATE_COORDINATES;
    }

    return errors;
};

