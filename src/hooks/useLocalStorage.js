import { useEffect, useState } from 'react';
import { initialCities } from '../utils/constants';
import { loadCities} from '../features/cities/cityActions';

export const useLocalStorage = (key, value, dispatch, onError) => {
    const [initialized, setInitialized] = useState(false);

    // טעינת נתונים ראשונית - רץ פעם אחת בלבד
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
                // אתחול עם נתוני ברירת מחדל אם אין נתונים
                dispatch(loadCities(initialCities));
                localStorage.setItem(key, JSON.stringify(initialCities));
            }
        } catch (error) {
            console.error('Failed to load cities:', error);
            dispatch(loadCities(initialCities));

            if (onError) onError(error, 'load');
        } finally {
            setInitialized(true); // מסומן שאותחל
        }
    }, [key, dispatch, onError]); // ללא תלות ב-`value`!

    // שמירת שינויים - רץ רק כאשר `value` משתנה (אחרי אתחול)
    useEffect(() => {
        if (!initialized) return;
        try {
            localStorage.setItem(key, JSON.stringify(value));
        } catch (error) {
            console.error('Failed to save cities:', error);
            if (onError) onError(error, 'save');
        }
    }, [key, value, onError]);
};