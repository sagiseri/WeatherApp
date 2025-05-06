// src/components/cities/CityForm/CityForm.jsx
import React, { useState } from 'react';
import { Form, Button, Modal, Alert } from 'react-bootstrap';
import CityInputField from './CityInputField';
import CountrySelect from './CountrySelect';
import { validateCityFields, validateCityUniqueness } from '../../../utils/validation';
import { DEFAULT_COUNTRIES } from '../../../utils/constants';

const useCityFormState = (initialData) => {
    const [formData, setFormData] = useState({
        name: (initialData.name || '').trim(),
        country: (initialData.country || '').trim(),
        latitude: initialData.latitude?.toString() || '',
        longitude: initialData.longitude?.toString() || ''
    });

    const [errors, setErrors] = useState({});
    const [formError, setFormError] = useState(null);

    return { formData, setFormData, errors, setErrors, formError, setFormError };
};

const useCountryList = (cities) => {
    return [...new Set([
        ...DEFAULT_COUNTRIES,
        ...cities.map(c => c.country).filter(Boolean)
    ])].sort();
};

const CityFormView = ({
                          mode,
                          show,
                          onCancel,
                          formData,
                          errors,
                          formError,
                          handleChange,
                          handleSubmit,
                          countries,
                          setFormError
                      }) => (
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
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    error={errors.name}
                    placeholder="הזן שם עיר"
                    required
                    pattern="[a-zA-Z\u0590-\u05FF\s]+"
                />

                <CountrySelect
                    value={formData.country}
                    onChange={handleChange}
                    countries={countries}
                    error={errors.country}
                    required
                />

                <CityInputField
                    label="קו רוחב"
                    type="number"
                    name="latitude"
                    value={formData.latitude}
                    onChange={handleChange}
                    error={errors.latitude || errors.coordinates}
                    placeholder="מספר בין 90- ל-90"
                    required
                    min="-90"
                    max="90"
                    step="any"
                />

                <CityInputField
                    label="קו אורך"
                    type="number"
                    name="longitude"
                    value={formData.longitude}
                    onChange={handleChange}
                    error={errors.longitude || errors.coordinates}
                    placeholder="מספר בין 180- ל-180"
                    required
                    min="-180"
                    max="180"
                    step="any"
                />
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onCancel}>
                    ביטול
                </Button>
                <Button variant="primary" type="submit">
                    {mode === 'add' ? 'הוסף עיר' : 'עדכן עיר'}
                </Button>
            </Modal.Footer>
        </Form>
    </Modal>
);

export default function CityForm({
                                     initialData = {},
                                     onSubmit,
                                     onCancel,
                                     mode = 'add',
                                     cities = [],
                                     show = true
                                 }) {
    const { formData, setFormData, errors, setErrors, formError, setFormError } = useCityFormState(initialData);
    const countries = useCountryList(cities);

    const handleChange = (e) => {
        const { name, value } = e.target;
        const processedValue = ['name', 'country'].includes(name) ? value.trimStart() : value;

        setFormData(prev => ({ ...prev, [name]: processedValue }));
        setErrors(prev => ({ ...prev, [name]: '', coordinates: '' }));
        if (formError) setFormError(null);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setFormError(null);

        const trimmedData = {
            ...formData,
            name: formData.name.trim(),
            country: formData.country.trim()
        };

        // ולידציה בסיסית
        const fieldErrors = validateCityFields(trimmedData);

        // ולידציית ייחודיות (רק אם אין שגיאות אחרות)
        let uniquenessErrors = {};
        if (Object.keys(fieldErrors).length === 0) {
            uniquenessErrors = validateCityUniqueness(
                trimmedData,
                cities,
                mode === 'edit' ? initialData.id : null
            );
        }

        const allErrors = { ...fieldErrors, ...uniquenessErrors };
        if (Object.keys(allErrors).length > 0) {
            setErrors(allErrors);
            return;
        }

        onSubmit({
            ...trimmedData,
            latitude: parseFloat(trimmedData.latitude),
            longitude: parseFloat(trimmedData.longitude)
        });
    };

    return (
        <CityFormView
            mode={mode}
            show={show}
            onCancel={onCancel}
            onSubmit={onSubmit}
            formData={formData}
            errors={errors}
            formError={formError}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            countries={countries}
        />
    );
}