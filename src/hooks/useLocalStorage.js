import { useEffect, useState } from 'react';
import { initialCities, ERROR_LOAD_CITIES, ERROR_STAGE_LOAD, ERROR_STAGE_SAVE  } from '../utils/constants';
import { loadCities} from '../features/cities/cityActions';

/**
 * Custom hook for syncing city data with localStorage.
 *
 * - On first run, it tries to load cities from localStorage.
 * - If no data exists, it loads the `initialCities` array and saves it to localStorage.
 * - Every time `value` changes, the hook updates localStorage.
 * @param key - The localStorage key to use.
 * @param value - The value to persist in localStorage (typically the current list of cities).
 * @param dispatch - Redux (or useReducer) dispatch function to update state.
 * @param onError - Optional error handler callback for load/save errors.
 */
export const useLocalStorage = (key, value, dispatch, onError) => {
    const [initialized, setInitialized] = useState(false);

    //Load cities from localStorage or fall back to initialCities
    useEffect(() => {
        if (initialized) return;

        try {
            const savedData = localStorage.getItem(key);

            if (savedData) {
                const parsedData = JSON.parse(savedData);
                if (Array.isArray(parsedData)) {
                    dispatch(loadCities(parsedData));
                }
            } else {
                dispatch(loadCities(initialCities));
                localStorage.setItem(key, JSON.stringify(initialCities));
            }
        } catch (error) {
            console.error(ERROR_LOAD_CITIES, error);
            dispatch(loadCities(initialCities));

            if (onError) onError(error, ERROR_STAGE_LOAD);
        } finally {
            setInitialized(true);
        }
    }, [key, dispatch, onError]);
    // Save updated cities to localStorage when value changes
    useEffect(() => {
        if (!initialized) return;
        try {
            localStorage.setItem(key, JSON.stringify(value));
        } catch (error) {
            if (onError) onError(error, ERROR_STAGE_SAVE);
        }
    }, [key, value, onError]);
};