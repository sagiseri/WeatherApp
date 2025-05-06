// utils/validation.js

/**
 * ולידציה עבור טופס עיר
 * @param {Object} data - נתוני הטופס
 * @returns {Object} - אובייקט עם שגיאות או null אם אין שגיאות
 */
// src/utils/validation.js

/**
 * בודק אם ערך מכיל רק אותיות ורווחים
 */
const isValidName = (name) => /^[a-zA-Z\s]+$/.test(name);

/**
 * בודק אם קואורדינטה במתחם התקין
 */
const isValidCoordinate = (value, min, max) => {
    const num = parseFloat(value);
    return !isNaN(num) && num >= min && num <= max;
};

/**
 * ולידציה ראשונית של שדות הטופס
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
 * בודק ייחודיות מול רשימת ערים קיימת
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

