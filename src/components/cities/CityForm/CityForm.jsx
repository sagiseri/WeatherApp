// src/components/cities/CityForm/CityForm.jsx
import React, { useState } from 'react';
import { Form, Button, Modal, Alert } from 'react-bootstrap';
import CityInputField from './CityInputField';
import CountrySelect from './CountrySelect';
import { validateCityFields, validateCityUniqueness } from '../../../utils/validation';
import { DEFAULT_COUNTRIES } from '../../../utils/constants';

/**
 *
 * Custom hook for managing the form state in the CityForm component.
 * It handles the form data, errors, and form error state.
 * @param initialData - The initial data used to populate the form (e.g., for editing).
 * @returns {{setFormError: (value: unknown) => void,
 * setFormData: (value: (((prevState: {country: string, latitude: (string|string),
 * name: string, longitude: (string|string)}) => {country: string, latitude: (string|string),
 * name: string, longitude: (string|string)}) | {country: string, latitude: (string|string),
 * name: string, longitude: (string|string)})) => void, formData: {country: string, latitude: (string|string),
 * name: string, longitude: (string|string)}, formError: unknown,
 * setErrors: (value: (((prevState: {}) => {}) | {})) => void, errors: {}}}  The form state, setters for form data, errors, and formError.
 */
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
/**
 * Custom hook to generate the list of countries, combining a default set of countries
 * with countries that already exist in the cities list.
 * @param cities - The list of cities used to gather unique countries.
 * @returns {*[]} A sorted list of countries (both default and cities from the data).
 */
const useCountryList = (cities) => {
    return [...new Set([
        ...DEFAULT_COUNTRIES,
        ...cities.map(c => c.country).filter(Boolean)
    ])].sort();
};
/**
 * View component for rendering the city form modal, including input fields for city name,
 * country, latitude, and longitude, along with error messages and validation feedback.
 *
 * @param mode - The mode of the form ('add' or 'edit').
 * @param show - Whether the modal should be shown or not.
 * @param onCancel - Function to call when the form is cancelled.
 * @param formData - The form data being edited.
 * @param errors - The errors for each field.
 * @param formError - General form-level error message.
 * @param handleChange - The function to handle form field changes.
 * @param handleSubmit - The function to handle form submission.
 * @param countries - List of available countries for the select dropdown.
 * @param setFormError - Function to clear/set form-level error messages.
 * @returns {React.JSX.Element} The rendered modal view for adding or editing a city.
 * @constructor
 */
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
                    {mode === 'add' ? 'Add New City' : 'Edit City'}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {formError && (
                    <Alert variant="danger" dismissible onClose={() => setFormError(null)}>
                        {formError}
                    </Alert>
                )}

                <CityInputField
                    label="City Name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    error={errors.name}
                    placeholder="Enter city name"
                    required
                    pattern="[/^[a-zA-Z\s]+$/]"
                />

                <CountrySelect
                    value={formData.country}
                    onChange={handleChange}
                    countries={countries}
                    error={errors.country}
                    required
                />

                <CityInputField
                    label="Latitude"
                    type="number"
                    name="latitude"
                    value={formData.latitude}
                    onChange={handleChange}
                    error={errors.latitude || errors.coordinates}
                    placeholder="Number between -90 and 90"
                    required
                    min="-90"
                    max="90"
                    step="any"
                />

                <CityInputField
                    label="Longitude"
                    type="number"
                    name="longitude"
                    value={formData.longitude}
                    onChange={handleChange}
                    error={errors.longitude || errors.coordinates}
                    placeholder="Number between -180 and 180"
                    required
                    min="-180"
                    max="180"
                    step="any"
                />
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onCancel}>
                    Cancel
                </Button>
                <Button variant="primary" type="submit">
                    {mode === 'add' ? 'Add City' : 'Update City'}
                </Button>
            </Modal.Footer>
        </Form>
    </Modal>
);
/**
 * CityForm is the form component for adding or editing a city. It manages form data, handles validation,
 * and submits the form data via the `onSubmit` function passed as a prop.
 *
 * @param initialData - Initial data for editing a city (empty object for adding).
 * @param onSubmit - Function to call when the form is submitted (add or edit).
 * @param onCancel - Function to call when the form is cancelled.
 * @param mode - The mode of the form ('add' for adding a new city, 'edit' for editing).
 * @param cities - The list of cities used to validate uniqueness.
 * @param show - Whether the form modal should be visible.
 * @returns {Element} The rendered CityForm component.
 * @constructor
 */
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
    /**
     * Handles form submission for adding or editing a city. It performs validation
     * of the form fields and checks for uniqueness before passing the form data to
     * the parent `onSubmit` function. If any validation errors are found, they are
     * displayed on the form.
     * @param e - The submit event triggered when the form is submitted.
     */
    const handleSubmit = (e) => {
        e.preventDefault();
        setFormError(null);

        const trimmedData = {
            ...formData,
            name: formData.name.trim(),
            country: formData.country.trim()
        };


        const fieldErrors = validateCityFields(trimmedData);


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