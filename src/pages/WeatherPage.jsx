// src/pages/WeatherPage.jsx
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Alert, Spinner, Button } from 'react-bootstrap';
import useWeatherApi from '../hooks/useWeatherApi';
import WeatherDisplay from '../components/weather/WeatherDisplay';
import CityCard from '../components/cities/CityCard';
import { Link } from 'react-router-dom';

const WeatherPage = ({ cities }) => {
    const { cityId } = useParams();
    const city = cities?.find(c => String(c.id) === cityId);

    const {
        weatherData,
        loading,
        error,
        fetchWeather
    } = useWeatherApi();

    useEffect(() => {
        if (city) {
            fetchWeather(city.latitude, city.longitude);
        }
    }, [city?.id]);

    if (!city) {
        return (
            <Container className="py-5">
                <div className="row justify-content-center">
                    <div className="col-md-8 col-lg-6">
                        <Alert variant="danger" className="text-center shadow-sm border-0">
                            <h3 className="mb-3">City not found</h3>
                            <p className="mb-0 text-muted">Requested ID: {cityId}</p>
                        </Alert>
                        <div className="text-center mt-4">
                            <Link to="/" className="btn btn-outline-secondary">
                                <span className="me-2">←</span> Back to Home
                            </Link>
                        </div>
                    </div>
                </div>
            </Container>
        );
    }

    return (
        <Container className="py-5">
            {/* Page Header */}
            <div className="row mb-4">
                <div className="col-12">
                    <div className="d-flex align-items-center justify-content-between">
                        <h1 className="h3 fw-bold text-primary mb-0">
                            <i className="bi bi-geo-alt me-2"></i>
                            Weather in {city.name}
                        </h1>
                        <Link
                            to="/"
                            className="btn btn-sm btn-outline-primary rounded-pill d-inline-flex align-items-center px-3"
                        >
                            <span className="me-1">←</span> Back to Home
                        </Link>
                    </div>
                    <hr className="mt-3 mb-0" />
                </div>
            </div>

            {/* Main Content */}
            <div className="row g-4">
                {/* City Card Column */}
                <div className="col-md-5 mb-4">
                    <div className="card shadow-sm border-0">
                        <div className="card-header bg-light py-2">
                            <h5 className="mb-0 fs-6">City Information</h5>
                        </div>
                        <div className="card-body p-3">
                            <CityCard
                                city={city}
                                showEditDelete={false}
                                showForecast={false}
                                showClimate={true}
                            />
                        </div>
                    </div>
                </div>

                {/* Weather Data Column */}
                <div className="col-md-7">
                    <div className="card shadow-sm border-0">
                        <div className="card-header bg-primary bg-opacity-10 py-2">
                            <h5 className="mb-0 fs-6 text-primary">Current Weather</h5>
                        </div>
                        <div className="card-body p-4">
                            {loading ? (
                                <div className="text-center py-5">
                                    <Spinner animation="border" variant="primary" />
                                    <p className="text-muted mt-3 mb-0">Loading weather data...</p>
                                </div>
                            ) : error ? (
                                <Alert variant="danger" className="mb-0 d-flex align-items-center justify-content-between">
                                    <div>{error}</div>
                                    <Button
                                        onClick={() => fetchWeather(city.latitude, city.longitude)}
                                        variant="outline-danger"
                                        className="ms-3"
                                        size="sm"
                                    >
                                        <i className="bi bi-arrow-clockwise me-1"></i>
                                        Retry
                                    </Button>
                                </Alert>
                            ) : (
                                <WeatherDisplay
                                    weatherData={weatherData}
                                    cityName={city.name}
                                />
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </Container>
    );
};

export default WeatherPage;