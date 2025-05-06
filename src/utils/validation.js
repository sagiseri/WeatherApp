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
        errors.name = 'שם העיר חובה';
    } else if (!isValidName(data.name)) {
        errors.name = 'שם העיר יכול להכיל רק אותיות ורווחים';
    }

    if (!data.country?.trim()) {
        errors.country = 'ארץ חובה';
    }

    if (!isValidCoordinate(data.latitude, -90, 90)) {
        errors.latitude = 'קו רוחב חייב להיות מספר בין 90- ל-90';
    }

    if (!isValidCoordinate(data.longitude, -180, 180)) {
        errors.longitude = 'קו אורך חייב להיות מספר בין 180- ל-180';
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

    const isNameUnique = !cities.some(city =>
        city.name.toLowerCase() === name && city.id !== excludeId
    );

    const isLocationUnique = !cities.some(city =>
        Math.abs(city.latitude - lat) < 0.0001 &&
        Math.abs(city.longitude - lng) < 0.0001 &&
        city.id !== excludeId
    );

    if (!isNameUnique) errors.name = 'עיר עם שם זה כבר קיימת';
    if (!isLocationUnique) {
        errors.coordinates = 'קואורדינטות אלו כבר תפוסות';
    }

    return errors;
};

