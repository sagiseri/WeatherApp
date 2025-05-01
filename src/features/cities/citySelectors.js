// src/features/cities/citySelectors.js
export const selectAllCities = (state) => state.cities;

export const selectFavoriteCities = (state) =>
    state.cities.filter(city => city.isFavorite);

export const selectCitiesByCountry = (state, country) =>
    country ? state.cities.filter(city => city.country === country) : state.cities;