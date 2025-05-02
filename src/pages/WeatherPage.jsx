// src/pages/WeatherPage.jsx
import useWeatherApi from '../hooks/useWeatherApi';
import WeatherDisplay from '../components/weather/WeatherDisplay';
import { useParams } from 'react-router-dom';
import { useCities } from '../features/cities/cityHooks';

const WeatherPage = () => {
    const { cityId } = useParams();
    const { getCityById } = useCities();
    const city = getCityById(cityId);

    const {
        weatherData,
        loading,
        error,
        fetchWeather
    } = useWeatherApi();

    const handleFetchWeather = () => {
        if (city) {
            fetchWeather(city.latitude, city.longitude);
        }
    };

    if (!city) {
        return <div className="container py-5 text-center">City not found</div>;
    }

    return (
        <div className="container py-4">
            <h2>Weather in {city.name}</h2>
            <WeatherDisplay
                weatherData={weatherData}
                loading={loading}
                error={error}
                cityName={city.name}
                onFetchWeather={handleFetchWeather}
            />
        </div>
    );
};

export default WeatherPage;  // חשוב להוסיף את זה