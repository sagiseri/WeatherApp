// src/components/cities/CityFilter.jsx
import { Form, Button } from 'react-bootstrap';

export default function CityFilter({ countries, selectedCountry, onSelect }) {
    return (
        <div className="d-flex align-items-center">
            <Form.Select
                value={selectedCountry}
                onChange={(e) => onSelect(e.target.value)}
                className="me-2"
                style={{ width: '200px' }}
            >
                <option value="">All Countries</option>
                {countries.map(country => (
                    <option key={country} value={country}>{country}</option>
                ))}
            </Form.Select>
            <Button
                variant="outline-secondary"
                onClick={() => onSelect('')}
            >
                Reset
            </Button>
        </div>
    );
}