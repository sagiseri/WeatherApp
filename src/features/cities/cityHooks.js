import {
    addCity as addCityAction,
    updateCity,
    removeCity,
    toggleFavoriteCity,
    filterByCountry,
    resetCityFilter
} from './cityActions';

export const useCities = (dispatch) => {
    const addCity = (cityData) => {
        dispatch(addCityAction(cityData));
    };

    const editCity = (updatedCity) => {
        console.log(updatedCity);
        dispatch(updateCity(updatedCity));
    };

    const deleteCity = (id) => {
        dispatch(removeCity(id));
    };

    const toggleFavorite = (id) => {
        dispatch(toggleFavoriteCity(id));
    };

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
        resetFilter: resetCitiesFilter,
    };
};