// src/app/App.js
import { useReducer, useState } from 'react';
import { cityReducer, initialState } from '../features/cities/cityReducer';
import { useLocalStorage } from '../hooks/useLocalStorage';
import AppRouter from './AppRouter';
import ErrorBoundary from '../components/ui/ErrorBoundary';
import { STORAGE_ERRORS } from '../utils/constants';
/**
 * The main App component for the React application.
 * - Initializes and manages city-related state using useReducer.
 * - Persists city data to localStorage using a custom hook.
 * - Displays user-friendly error messages for storage issues.
 * @returns {JSX.Element} The rendered App component.
 */
export default function App() {
    const [state, dispatch] = useReducer(cityReducer, initialState);
    const [storageError, setStorageError] = useState(null);

    /**
     * Handles errors related to localStorage operations.
     * @param error - The error object caught.
     * @param operation - The storage operation that failed.
     */
    const handleStorageError = (error, operation) => {
        setStorageError(
            operation === 'load' ? STORAGE_ERRORS.LOAD :
                operation === 'save' ? STORAGE_ERRORS.SAVE :
                    STORAGE_ERRORS.DEFAULT
        );

        setTimeout(() => setStorageError(null), 8000);
    };
    /**
     * Custom hook for syncing city data with localStorage
     */
    useLocalStorage('cities', state.cities, dispatch, handleStorageError);

    return (
        <ErrorBoundary>
            {storageError && (
                <div className="position-fixed bottom-0 end-0 m-3">
                    <div className={`alert alert-${storageError.VARIANT} alert-dismissible fade show`}>
                        <i className={`bi ${storageError.ICON} me-2`}></i>
                        <strong>{storageError.TITLE}:</strong> {storageError.MESSAGE}
                        <button
                            type="button"
                            className="btn-close"
                            onClick={() => setStorageError(null)}
                        ></button>
                    </div>
                </div>
            )}

            <AppRouter
                cities={state.cities}
                dispatch={dispatch}
                loading={state.loading}
            />
        </ErrorBoundary>
    );
}