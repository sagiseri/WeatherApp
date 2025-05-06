// src/features/cities/cityActions.js

/**
 * פעולות (actions) לניהול ערים
 */

// טעינת רשימת ערים
export const loadCities = (cities) => ({
    type: 'SET_CITIES',
    payload: cities
});

// הוספת עיר חדשה
export const addCity = (cityData) => ({
    type: 'ADD_CITY',
    payload: {
        ...cityData,
        id: Date.now(), // יצירת ID ייחודי
        isFavorite: false // עיר חדשה לא מסומנת כמועדפת
    }
});

// עריכת עיר קיימת
export const updateCity = (updatedCity) => ({
    type: 'UPDATE_CITY',
    payload: updatedCity
});

// מחיקת עיר
export const removeCity = (cityId) => ({
    type: 'REMOVE_CITY',
    payload: cityId
});

// סימון/ביטול מועדפים
export const toggleFavoriteCity = (cityId) => ({
    type: 'TOGGLE_FAVORITE_CITY',
    payload: cityId
});

// סינון ערים לפי מדינה
export const filterByCountry = (country) => ({
    type: 'FILTER_BY_COUNTRY',
    payload: country
});

// איפוס סינון
export const resetCityFilter = () => ({
    type: 'RESET_CITY_FILTER'
});


