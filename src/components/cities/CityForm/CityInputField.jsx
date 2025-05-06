import { Form } from 'react-bootstrap';

/**
 * A form input component for rendering a labeled input field with validation feedback.
 * This component is typically used in forms where each input needs to be validated
 * (e.g., city name, latitude, longitude, etc.).
 * @param label - The label text displayed next to the input field.
 * @param type - The type of the input field (e.g., "text", "number", etc.).
 * @param name - The name attribute of the input field.
 * @param value - The value of the input field, which is controlled by the parent component.
 * @param onChange - The function to call when the value of the input changes.
 * @param error - The error message to display if validation fails.
 * @param placeholder - The placeholder text for the input field.
 * @param required - Whether the input field is required (default is false).
 * @returns {JSX.Element} The rendered input field component with label, error message, and validation feedback.
 * @constructor
 */
export default function CityInputField({
                                           label,
                                           type,
                                           name,
                                           value,
                                           onChange,
                                           error,
                                           placeholder,
                                           required = false
                                       }) {
    return (
        <Form.Group className="mb-3">
            <Form.Label>
                {label}
                {required && <span className="text-danger"> *</span>}
            </Form.Label>
            <Form.Control
                type={type}
                name={name}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                isInvalid={!!error}
            />
            {error && (
                <Form.Control.Feedback type="invalid">
                    {error}
                </Form.Control.Feedback>
            )}
        </Form.Group>
    );
}