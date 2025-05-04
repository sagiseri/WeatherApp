import { Form, Button } from 'react-bootstrap';

export default function CityFilter({
                                       countries,
                                       selectedCountry,
                                       onSelect,
                                       onReset
                                   }) {
    return (
        <div className="d-flex align-items-center gap-2">
            <Form.Select
                value={selectedCountry}
                onChange={(e) => onSelect(e.target.value)}
                className="me-2"
                aria-label="Filter by country"
            >
                <option value="">All Countries</option>
                {countries.map(country => (
                    <option key={country} value={country}>{country}</option>
                ))}
            </Form.Select>

            <Button
                variant="outline-secondary"
                onClick={onReset}
                disabled={!selectedCountry}
            >
                Reset
            </Button>
        </div>
    );
}