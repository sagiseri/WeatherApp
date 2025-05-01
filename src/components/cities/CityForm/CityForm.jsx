// components/cities/CityForm.jsx
import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { validateCityForm} from '../../../utils/validation.js';

export default function CityForm({ initialData, onSubmit, onCancel }) {
    const [formData, setFormData] = useState({
        name: initialData?.name || '',
        country: initialData?.country || '',
        latitude: initialData?.latitude?.toString() || '',
        longitude: initialData?.longitude?.toString() || ''
    });

    const [errors, setErrors] = useState({});

    const handleChange = (field) => (e) => {
        setFormData({ ...formData, [field]: e.target.value });
        if (errors[field]) setErrors({ ...errors, [field]: '' });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // ולידציה
        const validationErrors = validateCityForm(formData);
        if (validationErrors) {
            setErrors(validationErrors);
            return;
        }

        // המרה למספרים ושלח את הנתונים
        onSubmit({
            ...formData,
            latitude: parseFloat(formData.latitude),
            longitude: parseFloat(formData.longitude)
        });
    };

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
                <Form.Label>שם העיר</Form.Label>
                <Form.Control
                    value={formData.name}
                    onChange={handleChange('name')}
                    isInvalid={!!errors.name}
                />
                <Form.Control.Feedback type="invalid">
                    {errors.name}
                </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>ארץ</Form.Label>
                <Form.Control
                    value={formData.country}
                    onChange={handleChange('country')}
                    isInvalid={!!errors.country}
                />
                <Form.Control.Feedback type="invalid">
                    {errors.country}
                </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>קו רוחב</Form.Label>
                <Form.Control
                    type="number"
                    step="any"
                    value={formData.latitude}
                    onChange={handleChange('latitude')}
                    isInvalid={!!errors.latitude}
                />
                <Form.Control.Feedback type="invalid">
                    {errors.latitude}
                </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>קו אורך</Form.Label>
                <Form.Control
                    type="number"
                    step="any"
                    value={formData.longitude}
                    onChange={handleChange('longitude')}
                    isInvalid={!!errors.longitude}
                />
                <Form.Control.Feedback type="invalid">
                    {errors.longitude}
                </Form.Control.Feedback>
            </Form.Group>

            <div className="d-flex gap-2">
                <Button variant="primary" type="submit">שמור</Button>
                <Button variant="secondary" onClick={onCancel}>ביטול</Button>
            </div>
        </Form>
    );
}