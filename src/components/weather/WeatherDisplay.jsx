import Spinner from '../ui/Spinner';
import { formatWeatherDate, getWeatherDescription } from '../../utils/api/weatherApi';

const WeatherDisplay = ({
                            weatherData,
                            loading,
                            error,
                            cityName,
                            onFetchWeather
                        }) => {
    return (
        <div className="weather-container mt-3">
            <button
                onClick={onFetchWeather}
                disabled={loading}
                className="btn btn-primary"
            >
                {loading ? <Spinner size="sm" /> : 'Show Forecast'}
            </button>

            {error && <div className="alert alert-danger mt-2">{error}</div>}

            {!weatherData && !loading && !error && (
                <div className="alert alert-info mt-2">
                    No weather data available yet. Click the button to load forecast.
                </div>
            )}

            {weatherData && (
                <div className="mt-3">
                    <h4>7-Day Forecast for {cityName}</h4>
                    <div className="weather-days row">
                        {weatherData.map((day) => (
                            <div key={day.date} className="col-md-4 mb-3">
                                <div className="card h-100">
                                    <div className="card-body">
                                        <h5 className="card-title">
                                            {formatWeatherDate(day.date)}
                                        </h5>
                                        <p className="card-text">
                                            <strong>Conditions:</strong> {getWeatherDescription(day.weather)}<br />
                                            <strong>Max Temp:</strong> {day.temp2m.max}°C<br />
                                            <strong>Min Temp:</strong> {day.temp2m.min}°C
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default WeatherDisplay;