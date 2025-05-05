import { Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function CityCard({
                                     city,
                                     onToggleFavorite,
                                     onEdit,
                                     onDelete,
                                     showEditDelete = false,
                                     showForecast = true,
                                     showClimate = false
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

                    {/* כפתורי עריכה/מחיקה - רק כשצריך */}
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

                    {/* כפתור תחזית - מופיע בשני הדפים */}
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