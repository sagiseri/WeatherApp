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
 * רכיב ניתוב הראשי של האפליקציה
 * @param {Object} props - מאפייני הקומפוננטה
 * @param {Array} props.cities - רשימת הערים
 * @param {Function} props.dispatch - פונקציית dispatch לניהול ה-state
 * @param {boolean} props.loading - מצב טעינה
 * @returns {JSX.Element} - מערכת הניתוב של האפליקציה
 */
export default function AppRouter({ cities, dispatch, loading }) {
    return (
        <Routes>
            <Route element={
                <ErrorBoundary>
                    <AppLayout />
                </ErrorBoundary>
            }>
                {/* דף הבית - ערים מועדפות */}
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

                {/* ניהול ערים - רשימה מלאה */}
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

                {/* טופס הוספת עיר חדשה */}
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

                {/* טופס עריכת עיר קיימת */}
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

                {/* תצוגת מזג אוויר עבור עיר ספציפית */}
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

                {/* דף אודות */}
                <Route
                    path="/about"
                    element={
                        <ErrorBoundary>
                            <AboutPage />
                        </ErrorBoundary>
                    }
                />

                {/* ניתוב עבור כתובות לא קיימות */}
                <Route
                    path="*"
                    element={
                        <ErrorBoundary>
                            <div className="container text-center py-5">
                                <h1>404 - עמוד לא נמצא</h1>
                                <p>הדף שביקשת אינו קיים במערכת</p>
                            </div>
                        </ErrorBoundary>
                    }
                />
            </Route>
        </Routes>
    );
}