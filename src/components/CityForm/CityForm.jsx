// src/components/CityForm/CityForm.jsx
import { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import CityInputField from './CityInputField';

export default function CityForm({ initialData, onSubmit, onCancel }) {
    const [formData, setFormData] = useState(initialData || {
        name: '', country: '', latitude: '', longitude: ''
    });
    const [errors, setErrors] = useState({});

    const handleSubmit = (e) => {
        e.preventDefault();
        // כאן תוסיפי ולידציה לפני השליחה
        onSubmit(formData);
    };

    return (
        <Form onSubmit={handleSubmit}>
            <CityInputField
                label="City Name"
                name="name"
                value={formData.name}
                error={errors.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
            />
            {/* הוסיפי כאן את שאר השדות */}
            <div className="d-flex gap-2">
                <Button variant="primary" type="submit">Save</Button>
                <Button variant="secondary" onClick={onCancel}>Cancel</Button>
            </div>
        </Form>
    );
}