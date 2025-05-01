
export const initialState = {
    cities:[],
    filteredCities: [],
    loading: true,
    error: null
};

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
                cities: state.cities.map(city =>
                    city.id === action.payload.id ? action.payload : city
                ),
                filteredCities: state.filteredCities.map(city =>
                    city.id === action.payload.id ? action.payload : city
                )
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
            return {
                ...state,
                filteredCities: state.cities.filter(city =>
                    action.payload ? city.country === action.payload : state.cities
                )
            };

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