import React, { useState } from 'react';
import { Form, Button, Modal, Alert } from 'react-bootstrap';
import CityInputField from './CityInputField';
import CountrySelect from './CountrySelect';
import { validateCityForm } from '../../../utils/validation';
import { DEFAULT_COUNTRIES } from '../../../utils/constants';

export default function CityForm({
                                     initialData = {},
                                     onSubmit,
                                     onCancel,
                                     mode = 'add',
                                     cities = [],
                                     show = true
                                 }) {
    const [formData, setFormData] = useState({
        name: (initialData.name || '').trim(),
        country: (initialData.country || '').trim(),
        latitude: initialData.latitude?.toString() || '',
        longitude: initialData.longitude?.toString() || ''
    });

    const [errors, setErrors] = useState({});
    const [formError, setFormError] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        // ביצוע trim אוטומטי עבור שדות טקסט
        const processedValue = name === 'name' || name === 'country'
            ? value.trimStart()
            : value;

        setFormData(prev => ({ ...prev, [name]: processedValue }));

        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
        if (formError) setFormError(null);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setFormError(null);

        // ולידציה עם בדיקת ייחודיות שם העיר
        try {
            const validationErrors = validateCityForm(
                {
                    ...formData,
                    name: formData.name.trim(),
                    country: formData.country.trim()
                },
                mode === 'add' ? cities : null
            );

            if (Object.keys(validationErrors).length > 0) {
                setErrors(validationErrors);
                return;
            }

            await onSubmit({
                ...formData,
                name: formData.name.trim(),
                country: formData.country.trim(),
                latitude: parseFloat(formData.latitude),
                longitude: parseFloat(formData.longitude)
            });

        } catch (error) {
            setFormError(error.message || 'An error occurred while saving the city');
        }
    };

    const countries = [...new Set([
        ...DEFAULT_COUNTRIES,
        ...cities.map(c => c.country).filter(Boolean)
    ])].sort();

    return (
        <Modal show={show} onHide={onCancel} aria-labelledby="city-form-title">
            <Form onSubmit={handleSubmit} noValidate>
                <Modal.Header closeButton>
                    <Modal.Title id="city-form-title">
                        {mode === 'add' ? 'הוספת עיר חדשה' : 'עריכת עיר'}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {formError && (
                        <Alert variant="danger" dismissible onClose={() => setFormError(null)}>
                            {formError}
                        </Alert>
                    )}

                    <CityInputField
                        label="שם העיר"
                        type="text"
                        name="name"
                        id="city-name-input"
                        value={formData.name}
                        onChange={handleChange}
                        error={errors.name}
                        placeholder="הזן שם עיר"
                        required
                        pattern="[a-zA-Z\u0590-\u05FF\s]+"
                        inputMode="text"
                        aria-describedby="city-name-help"
                    />
                    <Form.Text id="city-name-help" muted>
                        אותיות ורווחים בלבד
                    </Form.Text>

                    <CountrySelect
                        value={formData.country}
                        onChange={handleChange}
                        countries={countries}
                        error={errors.country}
                        required
                        aria-describedby="country-help"
                    />

                    <CityInputField
                        label="קו רוחב"
                        type="number"
                        name="latitude"
                        id="latitude-input"
                        value={formData.latitude}
                        onChange={handleChange}
                        error={errors.latitude}
                        placeholder="מספר בין 90- ל-90"
                        required
                        step="any"
                        min="-90"
                        max="90"
                        inputMode="decimal"
                        aria-describedby="latitude-help"
                    />
                    <Form.Text id="latitude-help" muted>
                        ערך בין 90- ל-90
                    </Form.Text>

                    <CityInputField
                        label="קו אורך"
                        type="number"
                        name="longitude"
                        id="longitude-input"
                        value={formData.longitude}
                        onChange={handleChange}
                        error={errors.longitude}
                        placeholder="מספר בין 180- ל-180"
                        required
                        step="any"
                        min="-180"
                        max="180"
                        inputMode="decimal"
                        aria-describedby="longitude-help"
                    />
                    <Form.Text id="longitude-help" muted>
                        ערך בין 180- ל-180
                    </Form.Text>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={onCancel} aria-label="Cancel">
                        ביטול
                    </Button>
                    <Button
                        variant="primary"
                        type="submit"
                        aria-label={mode === 'add' ? 'Add city' : 'Update city'}
                    >
                        {mode === 'add' ? 'הוסף עיר' : 'עדכן עיר'}
                    </Button>
                </Modal.Footer>
            </Form>
        </Modal>
    );
}