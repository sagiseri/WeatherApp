// src/components/CityCard.jsx
import { Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function CityCard({ city, dispatch, showDelete = false }) {
    return (
        <Card className="h-100">
            <Card.Body>
                <Card.Title>{city.name}</Card.Title>
                <Card.Text>
                    <strong>Country:</strong> {city.country}<br />
                    <strong>Coordinates:</strong> {city.latitude}, {city.longitude}
                </Card.Text>
                <div className="d-flex gap-2">
                    <Button
                        variant={city.isFavorite ? "warning" : "outline-secondary"}
                        onClick={() => dispatch({ type: 'TOGGLE_FAVORITE', payload: city.id })}
                    >
                        {city.isFavorite ? '★ Unfavorite' : '☆ Favorite'}
                    </Button>
                    {showDelete && (
                        <Button
                            variant="danger"
                            onClick={() => dispatch({ type: 'DELETE_CITY', payload: city.id })}
                        >
                            Delete
                        </Button>
                    )}
                    <Button
                        variant="info"
                        as={Link}
                        to={`/weather/${city.id}`}
                    >
                        Weather
                    </Button>
                </div>
            </Card.Body>
        </Card>
    );
}