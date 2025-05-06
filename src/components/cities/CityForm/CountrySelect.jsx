import { Form } from 'react-bootstrap';

/**
 * A dropdown select component for choosing a country, with validation support.
 * Typically used within a form to select a country from a predefined list.
 *
 * @param value - The currently selected country value.
 * @param onChange - Callback function called when the selected value changes.
 * @param countries - Array of country names to display in the dropdown.
 * @param error - Validation error message to display (if any).
 * @param required - Indicates whether the field is required.
 * @returns {JSX.Element} The rendered country dropdown with optional validation feedback.
 * @constructor
 */
export default function CountrySelect({
                                          value,
                                          onChange,
                                          countries,
                                          error,
                                          required = false
                                      }) {
    return (
        <Form.Group className="mb-3">
            <Form.Label>
                Country
                {required && <span className="text-danger"> *</span>}
            </Form.Label>
            <Form.Select
                name="country"
                value={value}
                onChange={onChange}
                isInvalid={!!error}
                required={required}
            >
                <option value="">Select a country</option>
                {countries.map(country => (
                    <option key={country} value={country}>
                        {country}
                    </option>
                ))}
            </Form.Select>
            {error && (
                <Form.Control.Feedback type="invalid">
                    {error}
                </Form.Control.Feedback>
            )}
        </Form.Group>
    );
}