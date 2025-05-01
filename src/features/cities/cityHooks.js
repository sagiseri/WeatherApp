// src/features/cities/cityHooks.js
import {
    addCity as addCityAction,
    updateCity,
    removeCity,
    toggleFavoriteCity,
    filterByCountry,
    resetCityFilter
} from './cityActions';

export const useCities = (dispatch) => {
    // פעולות ניהול ערים
    const addCity = (cityData) => {
        dispatch(addCityAction(cityData));
    };

    const editCity = (updatedCity) => {
        dispatch(updateCity(updatedCity));
    };

    const deleteCity = (id) => {
        dispatch(removeCity(id));
    };

    const toggleFavorite = (id) => {
        dispatch(toggleFavoriteCity(id));
    };

    // פעולות סינון
    const filterCitiesByCountry = (country) => {
        dispatch(filterByCountry(country));
    };

    const resetCitiesFilter = () => {
        dispatch(resetCityFilter());
    };

    return {
        addCity,
        editCity,
        deleteCity,
        toggleFavorite,
        filterByCountry: filterCitiesByCountry,
        resetFilter: resetCitiesFilter
    };
};