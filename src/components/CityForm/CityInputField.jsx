// src/components/CityForm/CityInputField.jsx
import { Form } from 'react-bootstrap';

export default function CityInputField({ label, name, value, error, onChange }) {
    return (
        <Form.Group className="mb-3">
            <Form.Label>{label}</Form.Label>
            <Form.Control
                name={name}
                value={value}
                onChange={onChange}
                isInvalid={!!error}
            />
            <Form.Control.Feedback type="invalid">{error}</Form.Control.Feedback>
        </Form.Group>
    );
}