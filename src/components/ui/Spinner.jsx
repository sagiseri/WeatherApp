// src/components/ui/Spinner.jsx
const Spinner = ({ size = 'md' }) => (
    <div className={`spinner-border text-primary spinner-${size}`} role="status">
        <span className="visually-hidden">Loading...</span>
    </div>
);
export default Spinner;