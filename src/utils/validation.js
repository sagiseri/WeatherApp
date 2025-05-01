// utils/validation.js

/**
 * ולידציה עבור טופס עיר
 * @param {Object} data - נתוני הטופס
 * @returns {Object} - אובייקט עם שגיאות או null אם אין שגיאות
 */
export const validateCityForm = (data) => {
    const errors = {};

    if (!data.name?.trim()) {
        errors.name = 'שם העיר חובה';
    } else if (!/^[a-zA-Z\s]+$/.test(data.name)) {
        errors.name = 'שם העיר יכול להכיל רק אותיות באנגלית ורווחים';
    }

    if (!data.country?.trim()) {
        errors.country = 'ארץ חובה';
    }

    const lat = parseFloat(data.latitude);
    if (isNaN(lat)) {
        errors.latitude = 'קו רוחב חייב להיות מספר';
    } else if (lat < -90 || lat > 90) {
        errors.latitude = 'קו רוחב חייב להיות בין 90- ל-90';
    }

    const lng = parseFloat(data.longitude);
    if (isNaN(lng)) {
        errors.longitude = 'קו אורך חייב להיות מספר';
    } else if (lng < -180 || lng > 180) {
        errors.longitude = 'קו אורך חייב להיות בין 180- ל-180';
    }

    return Object.keys(errors).length > 0 ? errors : null;
};