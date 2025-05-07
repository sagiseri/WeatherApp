/**
 * Initial state for the "cities" reducer.
 * @type {{cities: *[], filteredCities: *[], loading: boolean, error: null}}
 */
export const initialState = {
    cities:[],
    filteredCities: [],
    loading: true,
    error: null
};
/**
 * Updates a city in the array by ID with new data.
 * @param arr - Array of cities.
 * @param cityId - ID of the city to update.
 * @param newData - New data to merge into the city.
 * @returns {*} Updated array.
 */
const updateCityInArray = (arr, cityId, newData) =>
    arr.map(city => city.id === cityId ? { ...city, ...newData } : city);
/**
 * Filters cities by country.
 * @param cities - Full list of cities.
 * @param country - Country name to filter by.
 * @returns {*} Filtered list of cities.
 */
const filterCitiesByCountry = (cities, country) =>
    country ? cities.filter(city => city.country === country) : cities;

/**
 * Reducer function for managing city-related state.
 * @param state - Current state.
 * @param action - Action dispatched.
 * @returns {(*&{error, loading: boolean})|
 * (*&{cities, filteredCities, loading: boolean})|
 * (*&{cities: T[], filteredCities: T[]})|
 * (*&{filteredCities: ([]|*[]|*)})|*|
 * (*&{cities: *[], filteredCities: *[]})|
 * (*&{cities: *, filteredCities: *})|
 * (*&{cities: (*|{isFavorite: boolean}|T)[], filteredCities: (*|{isFavorite: boolean}|T)[]})|
 * (*&{filteredCities: *})} New state.
 */
export function cityReducer(state, action) {
    switch (action.type) {
        case 'SET_CITIES':
            return {
                ...state,
                cities: action.payload,
                filteredCities: action.payload,
                loading: false
            };

        case 'ADD_CITY': {
            const newCity = { ...action.payload, id: Date.now() };
            return {
                ...state,
                cities: [...state.cities, newCity],
                filteredCities: [...state.cities, newCity]
            };
        }

        case 'UPDATE_CITY':
            return {
                ...state,
                cities: updateCityInArray(state.cities, action.payload.id, action.payload),
                filteredCities: updateCityInArray(state.filteredCities, action.payload.id, action.payload)
            };

        case 'REMOVE_CITY':
            return {
                ...state,
                cities: state.cities.filter(city => city.id !== action.payload),
                filteredCities: state.filteredCities.filter(city => city.id !== action.payload)
            };

        case 'TOGGLE_FAVORITE_CITY':
            return {
                ...state,
                cities: state.cities.map(city =>
                    city.id === action.payload ? { ...city, isFavorite: !city.isFavorite } : city
                ),
                filteredCities: state.filteredCities.map(city =>
                    city.id === action.payload ? { ...city, isFavorite: !city.isFavorite } : city
                )
            };

        case 'FILTER_BY_COUNTRY':
            return { ...state, filteredCities: filterCitiesByCountry(state.cities, action.payload) };

        case 'RESET_CITY_FILTER':
            return {
                ...state,
                filteredCities: state.cities
            };

        case 'SET_CITIES_ERROR':
            return { ...state, error: action.payload, loading: false };

        default:
            return state;
    }
}