import { Form, Button } from 'react-bootstrap';

/**
 * Renders a dropdown filter for selecting a country to filter cities by,
 * along with a reset button to clear the selected filter.
 * @param countries - List of countries available for filtering.
 * @param selectedCountry - The currently selected country.
 * @param onSelect - Callback when a country is selected.
 * @param onReset - Callback to reset the selected country filter.
 * @returns {JSX.Element} The rendered country filter UI.
 * @constructor
 */
export default function CityFilter({
                                       countries,
                                       selectedCountry,
                                       onSelect,
                                       onReset
                                   }) {

    const sortedCountries = [...countries].sort((a, b) => a.localeCompare(b));

    return (
        <div className="d-flex align-items-center gap-2">
            <Form.Select
                value={selectedCountry}
                onChange={(e) => onSelect(e.target.value)}
                className="me-2"
                aria-label="Filter by country"
            >
                <option value="">All Countries</option>
                {sortedCountries.map(country => (
                    <option key={country} value={country}>{country}</option>
                ))}
            </Form.Select>

            <Button
                variant="outline-secondary"
                onClick={onReset}
                disabled={!selectedCountry}
            >
                Reset
            </Button>
        </div>
    );
}