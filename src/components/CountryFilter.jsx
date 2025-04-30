// src/components/CountryFilter.jsx
import { Form } from 'react-bootstrap';

export default function CountryFilter({ countries, selectedCountry, onSelect }) {
    return (
        <Form.Select
            value={selectedCountry}
            onChange={(e) => onSelect(e.target.value)}
        >
            <option value="">All Countries</option>
            {countries.map(country => (
                <option key={country} value={country}>{country}</option>
            ))}
        </Form.Select>
    );
}