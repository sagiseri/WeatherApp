import { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import CityCard from '../components/cities/CityCard';
import CityFilter from '../components/cities/CityFilter';
import Spinner from '../components/ui/Spinner';
import { Link } from 'react-router-dom';
import { useCities } from '../features/cities/cityHooks';
import ErrorBoundary from '../components/ui/ErrorBoundary';

/**
 * HomePage component displays a list of the user's favorite cities.
 * Allows filtering by country and navigation to the full "cities" collection.
 * @param cities - Array of city objects.
 * @param loading - Indicates whether city data is being loaded.
 * @param dispatch - Dispatch function for state management.
 * @returns {JSX.Element}
 * @constructor
 */
export default function HomePage({ cities, loading, dispatch }) {
    const [selectedCountry, setSelectedCountry] = useState('');
    const { toggleFavorite } = useCities(dispatch);

    //Extract and sort favorite cities alphabetically
    const favoriteCities = cities
        .filter(city => city.isFavorite)
        .sort((a, b) => a.name.localeCompare(b.name));

    //Apply selected country filter to favorite cities
    const filteredCities = selectedCountry
        ? favoriteCities.filter(city => city.country === selectedCountry)
        : favoriteCities;

    if (loading) return <Spinner />;

    return (
        <Container className="py-4">

            <div className="mb-4 pb-2 border-bottom">
                <h1 className="display-5 fw-bold">Favorite Cities</h1>
                <p className="text-muted">Manage your collection of favorite destinations</p>
            </div>


            <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-4 gap-3">
                <div className="flex-grow-1">
                    <CityFilter
                        countries={[...new Set(cities.map(c => c.country))]}
                        selectedCountry={selectedCountry}
                        onSelect={setSelectedCountry}
                        onReset={() => setSelectedCountry('')}
                    />
                </div>
                <Link to="/cities" className="btn btn-primary">
                    <i className="bi bi-grid me-2"></i>View All Cities
                </Link>
            </div>


            {filteredCities.length === 0 && (
                <div className="text-center my-5 py-5 bg-light rounded-3">
                    <div className="py-3">
                        <i className="bi bi-bookmark-star fs-1 text-secondary mb-3"></i>
                        <h4 className="mb-3">
                            {selectedCountry
                                ? `No favorite cities found in ${selectedCountry}`
                                : "You don't have any favorite cities yet"}
                        </h4>
                        <div className="mt-4">
                            <Link to="/cities" className="btn btn-primary">
                                Explore Cities
                            </Link>
                        </div>
                    </div>
                </div>
            )}


            <Row xs={1} sm={2} lg={3} xl={4} className="g-4">
                {filteredCities.map(city => (
                    <Col key={city.id}>
                        <ErrorBoundary>
                            <CityCard
                                city={city}
                                onToggleFavorite={() => toggleFavorite(city.id)}
                            />
                        </ErrorBoundary>
                    </Col>
                ))}
            </Row>

            {/* Summary footer */}
            {filteredCities.length > 0 && (
                <div className="d-flex justify-content-between align-items-center mt-4 pt-3 border-top">
                    <span className="text-muted">
                        Showing {filteredCities.length} {filteredCities.length === 1 ? 'city' : 'cities'}
                        {selectedCountry && ` in ${selectedCountry}`}
                    </span>
                    {selectedCountry && (
                        <button
                            className="btn btn-sm btn-outline-secondary"
                            onClick={() => setSelectedCountry('')}
                        >
                            Clear Filter
                        </button>
                    )}
                </div>
            )}
        </Container>
    );
}