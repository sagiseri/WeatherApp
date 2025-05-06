// src/app/AppRouter.jsx
import { Routes, Route } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import CitiesPage from '../pages/CitiesPage';
import AboutPage from '../pages/AboutPage';
import CityForm from '../components/cities/CityForm/CityForm';
import WeatherPage from '../pages/WeatherPage';
import AppLayout from './AppLayout';
import ErrorBoundary from '../components/ui/ErrorBoundary';

/**
 * AppRouter is the routing component for the Weather App.
 * It defines the routes for navigating between different pages of the app, including:
 * - HomePage
 * - CitiesPage
 * - CityForm (add/edit)
 * - WeatherPage
 * - AboutPage
 * - 404 page for unmatched routes
 * @param cities - A list of cities to be passed to pages like HomePage, CitiesPage, WeatherPage, and CityForm
 * @param dispatch - Dispatch function to manage state updates
 * @param loading - Boolean to manage the loading state, typically used for showing spinners or loading states
 * @returns {JSX.Element} The rendered routing configuration
 * @constructor
 */
export default function AppRouter({ cities, dispatch, loading }) {
    return (
        <Routes>
            <Route element={
                <ErrorBoundary>
                    <AppLayout />
                </ErrorBoundary>
            }>
                <Route
                    path="/"
                    element={
                        <ErrorBoundary>
                            <HomePage
                                cities={cities}
                                dispatch={dispatch}
                                loading={loading}
                            />
                        </ErrorBoundary>
                    }
                />

                <Route
                    path="/cities"
                    element={
                        <ErrorBoundary>
                            <CitiesPage
                                cities={cities}
                                dispatch={dispatch}
                            />
                        </ErrorBoundary>
                    }
                />

                <Route
                    path="/cities/add"
                    element={
                        <ErrorBoundary>
                            <CityForm
                                dispatch={dispatch}
                                mode="add"
                            />
                        </ErrorBoundary>
                    }
                />

                <Route
                    path="/cities/edit/:id"
                    element={
                        <ErrorBoundary>
                            <CityForm
                                dispatch={dispatch}
                                cities={cities}
                                mode="edit"
                            />
                        </ErrorBoundary>
                    }
                />

                <Route
                    path="/weather/:cityId"
                    element={
                        <ErrorBoundary>
                            <WeatherPage
                                cities={cities}
                            />
                        </ErrorBoundary>
                    }
                />

                <Route
                    path="/about"
                    element={
                        <ErrorBoundary>
                            <AboutPage />
                        </ErrorBoundary>
                    }
                />

                <Route
                    path="*"
                    element={
                        <ErrorBoundary>
                            <div className="container text-center py-5">
                                <h1>404 - Page Not Found</h1>
                                <p>The page you requested does not exist in the system.</p>
                            </div>
                        </ErrorBoundary>
                    }
                />
            </Route>
        </Routes>
    );
}