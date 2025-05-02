import { Form } from 'react-bootstrap';

/**
 * קומפוננטה גנרית לשדות קלט בטופס
 * @param {Object} props
 * @param {string} props.label - תווית השדה
 * @param {string} props.type - סוג השדה (text, number וכו')
 * @param {string} props.name - שם השדה
 * @param {any} props.value - ערך השדה
 * @param {function} props.onChange - פונקציה לטיפול בשינוי
 * @param {string} [props.error] - הודעת שגיאה
 * @param {string} [props.placeholder] - טקסט מציין מקום
 * @param {boolean} [props.required] - האם השדה נדרש
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