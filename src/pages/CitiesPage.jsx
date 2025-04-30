// src/pages/CitiesPage.jsx
import { useState } from 'react';
import CityForm from '../components/CityForm/CityForm';
import CityCard from '../components/CityCard';
import { Link } from 'react-router-dom';

export default function CitiesPage({ cities, dispatch }) {
    const [isAdding, setIsAdding] = useState(false);

    const handleAddCity = (newCity) => {
        dispatch({ type: 'ADD_CITY', payload: newCity });
        setIsAdding(false);
    };

    return (
        <div className="container mt-4">
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h1>All Cities</h1>
                <div>
                    <button
                        className="btn btn-primary me-2"
                        onClick={() => setIsAdding(true)}
                    >
                        Add City
                    </button>
                    <Link to="/" className="btn btn-outline-secondary">
                        Back to Favorites
                    </Link>
                </div>
            </div>

            {isAdding && (
                <div className="card mb-4">
                    <div className="card-body">
                        <CityForm
                            onSubmit={handleAddCity}
                            onCancel={() => setIsAdding(false)}
                        />
                    </div>
                </div>
            )}

            <div className="row">
                {cities.map(city => (
                    <div key={city.id} className="col-md-4 mb-4">
                        <CityCard
                            city={city}
                            dispatch={dispatch}
                            showDelete // הוספת אפשרות מחיקה
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}