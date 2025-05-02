import { Form } from 'react-bootstrap';

/**
 * קומפוננטה לבחירת מדינה מתוך רשימה
 * @param {Object} props
 * @param {string} props.value - הערך הנבחר
 * @param {function} props.onChange - פונקציה לטיפול בשינוי
 * @param {Array<string>} props.countries - רשימת מדינות
 * @param {string} [props.error] - הודעת שגיאה
 * @param {boolean} [props.required] - האם השדה נדרש
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