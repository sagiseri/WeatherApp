// src/components/ui/Spinner.jsx
/**
 * A reusable loading spinner component using Bootstrap styling.
 *
 * @param size - The size of the spinner.
 * @returns {JSX.Element} A Bootstrap spinner element.
 * @constructor
 */
const Spinner = ({ size = 'md' }) => (
    <div className={`spinner-border text-primary spinner-${size}`} role="status">
        <span className="visually-hidden">Loading...</span>
    </div>
);
export default Spinner;