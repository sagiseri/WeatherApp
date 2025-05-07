
import { formatWeatherDate, getWeatherDescription } from '../../utils/weatherUtils';
import ErrorBoundary from '../../components/ui/ErrorBoundary';

/**
 * Displays a 7-day weather forecast for a given city.
 *
 * @param weatherData - Array of weather data for each day.
 * @param loading - Indicates whether the weather data is currently being loaded.
 * @param error - Error message, if any.
 * @param cityName - Name of the city for which the forecast is shown.
 * @returns {JSX.Element} The rendered component showing the weather forecast or status messages.
 * @constructor
 */
const WeatherDisplay = ({
                            weatherData,
                            loading,
                            error,
                            cityName,

                        }) => {
    return (
        <div className="weather-container mt-3">
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
                            <ErrorBoundary key={day.date}>
                                <div className="col-md-4 mb-3">
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
                            </ErrorBoundary>
                        ))}
                    </div>
                </div>

            )}
        </div>
    );
};

export default WeatherDisplay;