// src/components/cities/CityCard.jsx
import { Button, Card } from 'react-bootstrap';

export default function CityCard({ city, onEdit, onDelete, onToggleFavorite }) {
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
                        onClick={onToggleFavorite}
                    >
                        {city.isFavorite ? '★' : '☆'}
                    </Button>
                    <Button variant="info" onClick={onEdit}>Edit</Button>
                    <Button variant="danger" onClick={onDelete}>Delete</Button>
                </div>
            </Card.Body>
        </Card>
    );
}