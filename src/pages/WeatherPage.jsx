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
    }, [city]);

    if (!city) {
        return (
            <Container className="py-5 text-center">
                <Alert variant="danger">
                    <h3>City not found</h3>
                    <p>Requested ID: {cityId}</p>
                </Alert>
            </Container>
        );
    }

    return (
        <Container className="py-4">
            <h1 className="mb-4">Weather in {city.name}</h1>

            <div className="row">
                <div className="col-md-5 mb-4">
                    <CityCard
                        city={city}
                        showEditDelete={false}
                        showForecast={false}
                        showClimate={true}
                    />
                </div>

                <div className="col-md-7">
                    {loading ? (
                        <div className="text-center">
                            <Spinner animation="border"/>
                            <p>Loading weather data...</p>
                        </div>
                    ) : error ? (
                        <Alert variant="danger">
                            {error}
                            <Button
                                onClick={() => fetchWeather(city.latitude, city.longitude)}
                                variant="outline-danger"
                                className="mt-2 mt-n1 ms-2"
                                size="sm"
                            >
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
            <div className="text-center py-4 mt-auto">
                <Link
                    to="/"
                    className="btn btn-outline-primary d-inline-flex align-items-center px-4"
                >
                    <span className="me-2">←</span> Back to Home
                </Link>
            </div>

        </Container>
    );
};

export default WeatherPage;