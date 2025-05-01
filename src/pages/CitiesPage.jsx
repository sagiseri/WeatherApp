// src/pages/CitiesPage.jsx
import { useState } from 'react';
import { useCities } from '../features/cities/cityHooks';
import CityForm from '../components/cities/CityForm/CityForm'; // שינוי נתיב
import CityCard from '../components/cities/CityCard';
import CityFilter  from '../components/cities/CityFilter'; // שינוי משם CountryFilter ל-CityFilter
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';

export default function CitiesPage({ cities, dispatch }) {
    const [isAdding, setIsAdding] = useState(false);
    const [editingCity, setEditingCity] = useState(null);
    const {
        addCity,
        editCity,
        deleteCity,
        toggleFavorite,
        filterByCountry,
        resetFilter
    } = useCities(dispatch);

    // טיפול בהוספת עיר חדשה
    const handleAdd = (newCity) => {
        addCity({
            ...newCity,
            id: Date.now(), // ID ייחודי
            isFavorite: false
        });
        setIsAdding(false);
    };

    // טיפול בעדכון עיר קיימת
    const handleEdit = (updatedCity) => {
        editCity(updatedCity);
        setEditingCity(null);
    };

    // איסוף רשימת מדינות ייחודית לסינון
    const countries = [...new Set(cities.map(city => city.country))];

    return (
        <Container className="mt-4">
            <h1 className="mb-4">All Cities</h1>

            {/* סרגל פעולות */}
            <div className="d-flex justify-content-between mb-4">
                <div>
                    <Button
                        variant="primary"
                        onClick={() => setIsAdding(true)}
                        className="me-2"
                    >
                        Add City
                    </Button>
                    <CityFilter
                        countries={countries}
                        onFilter={filterByCountry}
                        onReset={resetFilter}
                    />
                </div>
            </div>

            {/* טופס הוספה/עריכה */}
            {(isAdding || editingCity) && (
                <div className="card mb-4 p-3">
                    <CityForm
                        initialData={editingCity || undefined}
                        onSubmit={editingCity ? handleEdit : handleAdd}
                        onCancel={() => {
                            setIsAdding(false);
                            setEditingCity(null);
                        }}
                    />
                </div>
            )}

            {/* רשימת הערים */}
            <div className="row">
                {cities.map(city => (
                    <div key={city.id} className="col-md-4 mb-4">
                        <CityCard
                            city={city}
                            onEdit={() => setEditingCity(city)}
                            onDelete={() => deleteCity(city.id)}
                            onToggleFavorite={() => toggleFavorite(city.id)}
                        />
                    </div>
                ))}
            </div>
        </Container>
    );
}