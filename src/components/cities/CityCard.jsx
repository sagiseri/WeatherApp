import { Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const COUNTRY_CLIMATES = {
    'Australia': 'Tropical north, hot inland summers, milder coastal areas',
    'Brazil': 'Tropical - hot/humid north, temperate south',
    'Canada': 'Cold winters, warm summers. Coastal BC has mild winters',
    'France': 'Oceanic north, Mediterranean south, snowy Alps',
    'Germany': 'Temperate - cold winters, mild summers. Sunnier in south',
    'Israel': 'Mediterranean - hot dry summers, mild rainy winters',
    'Italy': 'Mediterranean coasts, colder northern winters',
    'Japan': 'Varies from snowy north to subtropical south',
    'South Africa': 'Mediterranean coasts, temperate interior',
    'Spain': 'Mediterranean coasts, semi-arid interior',
    'USA': 'Extremes from Arctic to tropical. Mediterranean west coast',
    'United Kingdom': 'Mild maritime - cool winters, mild summers'
};

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
                    {showClimate && COUNTRY_CLIMATES[city.country] && (
                        <>
                            <strong>Climate:</strong> {COUNTRY_CLIMATES[city.country]}<br />
                        </>
                    )}
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