import {
    addCity as addCityAction,
    updateCity,
    removeCity,
    toggleFavoriteCity,
    filterByCountry,
    resetCityFilter
} from './cityActions';

/**
 * Custom hook that provides action dispatchers for managing cities.
 * @param dispatch - Redux dispatch function.
 *
 */
export const useCities = (dispatch) => {
    /**
     * Dispatches an action to add a new city.
     * @param cityData - The city data to add.
     */
    const addCity = (cityData) => {
        dispatch(addCityAction(cityData));
    };
    /**
     * Dispatches an action to update an existing city.
     * @param updatedCity - The updated city object.
     */
    const editCity = (updatedCity) => {
        console.log(updatedCity);
        dispatch(updateCity(updatedCity));
    };
    /**
     * Dispatches an action to delete a city by ID.
     * @param id - The ID of the city to delete.
     */
    const deleteCity = (id) => {
        dispatch(removeCity(id));
    };
    /**
     * Dispatches an action to toggle a city's favorite status.
     * @param id - The ID of the city.
     */
    const toggleFavorite = (id) => {
        dispatch(toggleFavoriteCity(id));
    };
    /**
     * Dispatches an action to filter cities by country.
     * @param country - The country to filter by.
     */
    const filterCitiesByCountry = (country) => {
        dispatch(filterByCountry(country));
    };
    /**
     * Dispatches an action to reset the country filter.
     */
    const resetCitiesFilter = () => {
        dispatch(resetCityFilter());
    };

    return {
        addCity,
        editCity,
        deleteCity,
        toggleFavorite,
        filterByCountry: filterCitiesByCountry,
        resetFilter: resetCitiesFilter,
    };
};