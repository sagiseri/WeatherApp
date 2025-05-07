// utils/validation.js


// src/utils/validation.js

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
        errors.name = 'City name is required';
    } else if (!isValidName(data.name)) {
        errors.name = 'City name can only contain letters and spaces';
    }

    if (!data.country?.trim()) {
        errors.country = 'Country is required';
    }

    if (!isValidCoordinate(data.latitude, -90, 90)) {
        errors.latitude = 'Latitude must be a number between -90 and 90';
    }

    if (!isValidCoordinate(data.longitude, -180, 180)) {
        errors.longitude = 'Longitude must be a number between -180 and 180';
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

    if (!isNameUnique) errors.name = 'A city with this name already exists';
    if (!isLocationUnique) {
        errors.coordinates = 'These coordinates are already in use';
    }

    return errors;
};

