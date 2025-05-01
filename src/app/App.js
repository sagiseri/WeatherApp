// src/app/App.js
import { useReducer } from 'react';
import { cityReducer, initialState } from '../features/cities/cityReducer';
import { useLocalStorage } from '../hooks/useLocalStorage';
import AppRouter from './AppRouter';
import ErrorBoundary from '../components/ui/ErrorBoundary';

export default function App() {
    const [state, dispatch] = useReducer(cityReducer, initialState);

    const handleStorageError = (error, operation) => {
        console.error(`Storage ${operation} error:`, error);

    };
    useLocalStorage('cities', state.cities, dispatch, handleStorageError);

    return (
        <ErrorBoundary>
            <AppRouter
                cities={state.cities}
                dispatch={dispatch}
                loading={state.loading}
            />
        </ErrorBoundary>
    );
}