import { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import CityCard from '../components/cities/CityCard';
import CityFilter from '../components/cities/CityFilter';
import Spinner from '../components/ui/Spinner';
import { Link } from 'react-router-dom';
import { useCities } from '../features/cities/cityHooks'; // ייבוא ההוק
import ErrorBoundary from '../components/ui/ErrorBoundary';

export default function HomePage({ cities, loading, dispatch }) {
    const [selectedCountry, setSelectedCountry] = useState('');
    const { toggleFavorite } = useCities(dispatch);

    // מיון הערים המועדפות לפי א-ב
    const favoriteCities = cities
        .filter(city => city.isFavorite)
        .sort((a, b) => a.name.localeCompare(b.name));

    // סינון נוסף לפי מדינה אם נבחר
    const filteredCities = selectedCountry
        ? favoriteCities.filter(city => city.country === selectedCountry)
        : favoriteCities;

    if (loading) return <Spinner />;

    return (
        <Container className="mt-4">
            <h1>Favorite Cities</h1>

            <div className="d-flex justify-content-between align-items-center mb-3">
                <CityFilter
                    countries={[...new Set(cities.map(c => c.country))]}
                    selectedCountry={selectedCountry}
                    onSelect={setSelectedCountry}
                    onReset={() => setSelectedCountry('')}
                />
                <Link to="/cities" className="btn btn-outline-primary">
                    View All Cities
                </Link>
            </div>

            <Row>
                {filteredCities.map(city => (
                    <Col key={city.id} md={4} className="mb-4">
                        <ErrorBoundary> {/* כל כרטיס עיר בבידוד */}
                            <CityCard
                                city={city}
                                onToggleFavorite={() => toggleFavorite(city.id)}
                            />
                        </ErrorBoundary>
                    </Col>
                ))}
            </Row>
        </Container>
    );
}