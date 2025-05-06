import { Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

/**
 * Renders a card displaying information about a city, including options for editing, deleting,
 * toggling favorite status, and viewing the weather forecast.
 * @param city - The city object containing its data.
 * @param onToggleFavorite - Callback for toggling the favorite status.
 * @param onEdit - Callback for editing the city.
 * @param onDelete - Callback for deleting the city.
 * @param showEditDelete - Whether to show the edit/delete/favorite buttons.
 * @param showForecast - Whether to show the forecast button/link.
 * @returns {JSX.Element} The rendered city card component.
 * @constructor
 */
export default function CityCard({
                                     city,
                                     onToggleFavorite,
                                     onEdit,
                                     onDelete,
                                     showEditDelete = false,
                                     showForecast = true,
                                 }) {
    return (
        <Card className="h-100 shadow-sm">
            <Card.Body>
                <Card.Title>{city.name}</Card.Title>
                <Card.Text>
                    <strong>Country:</strong> {city.country}<br />

                    {showEditDelete && (
                        <>
                            <strong>Coordinates:</strong> {city.latitude}, {city.longitude}<br />
                            <strong>Favorite:</strong> {city.isFavorite ? 'Yes' : 'No'}
                        </>
                    )}
                </Card.Text>

                <div className="d-flex flex-wrap gap-2">
                    {showEditDelete && (
                        <Button
                            variant={city.isFavorite ? "warning" : "outline-secondary"}
                            onClick={onToggleFavorite}
                            size="sm"
                        >
                            {city.isFavorite ? '★' : '☆'}
                        </Button>
                    )}


                    {showEditDelete && (
                        <>
                            <Button variant="info" onClick={onEdit} size="sm">
                                Edit
                            </Button>
                            <Button variant="danger" onClick={onDelete} size="sm">
                                Delete
                            </Button>
                        </>
                    )}


                    {showForecast && (
                        <Link
                            to={`/weather/${city.id}`}
                            className="btn btn-primary btn-sm"
                        >
                            Forecast
                        </Link>
                    )}
                </div>
            </Card.Body>
        </Card>
    );
}