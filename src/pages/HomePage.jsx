// src/pages/HomePage.jsx
import CityCard from '../components/cities/CityCard';
import { useState } from 'react';
import CityFilter from '../components/cities/CityFilter'; // שינוי משם
import Spinner from '../components/ui/Spinner';
import { Link } from 'react-router-dom';

export default function HomePage({ cities, loading, dispatch }) {
    const [selectedCountry, setSelectedCountry] = useState('');

    const favoriteCities = cities.filter(city => city.isFavorite);
    const countries = [...new Set(favoriteCities.map(city => city.country))];

    const filteredCities = selectedCountry
        ? favoriteCities.filter(city => city.country === selectedCountry)
        : favoriteCities;

    if (loading) return <Spinner />;

    return (
        <div className="container mt-4">
            <h1>Favorite Cities</h1>
            <div className="d-flex justify-content-between align-items-center mb-3">
                <CityFilter
                    countries={countries}
                    selectedCountry={selectedCountry}
                    onSelect={setSelectedCountry}
                />
                <Link to="/cities" className="btn btn-outline-primary">
                    View All Cities
                </Link>
            </div>
            <div className="row">
                {filteredCities.map(city => (
                    <div key={city.id} className="col-md-4 mb-4">
                        <CityCard city={city} dispatch={dispatch} />
                    </div>
                ))}
            </div>
        </div>
    );
}