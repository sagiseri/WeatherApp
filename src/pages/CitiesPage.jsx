import { useState } from 'react';
import { Button, Container, Modal } from 'react-bootstrap';
import CityForm from '../components/cities/CityForm/CityForm';
import CityCard from '../components/cities/CityCard';
import { useCities } from '../features/cities/cityHooks';
import ErrorBoundary from '../components/ui/ErrorBoundary';

export default function CitiesPage({ cities, dispatch }) {
    const [isAdding, setIsAdding] = useState(false);
    const [editingCity, setEditingCity] = useState(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [cityToDelete, setCityToDelete] = useState(null);

    const {
        addCity,
        editCity,
        deleteCity,
        toggleFavorite,
    } = useCities(dispatch);


    const handleAdd = (newCity) => {
        addCity(newCity);
        setIsAdding(false);
    };

    const handleEdit = (updatedCity) => {
        if (!updatedCity.id && editingCity) {
            updatedCity.id = editingCity.id;
        }
        editCity(updatedCity);
        setEditingCity(null);
    };

    const handleDelete = (id) => {
        deleteCity(id);
        setShowDeleteModal(false);
    };

    const confirmDelete = (id) => {
        setCityToDelete(id);
        setShowDeleteModal(true);
    };

    return (
        <Container className="mt-4">
            <h1 className="mb-4">All Cities</h1>

            <div className="d-flex justify-content-between mb-4">
                <Button variant="primary" onClick={() => setIsAdding(true)}>
                    Add City
                </Button>
            </div>

            {/* טופס הוספה */}
            {isAdding && (
                <ErrorBoundary>
                    <CityForm
                        mode="add"
                        onSubmit={handleAdd}
                        onCancel={() => setIsAdding(false)}
                        cities={cities}
                        dispatch={dispatch}
                    />
                </ErrorBoundary>
            )}

            {/* טופס עריכה */}
            {editingCity && (
                <ErrorBoundary>
                    <CityForm
                        mode="edit"
                        city={editingCity}
                        onSubmit={handleEdit}
                        onCancel={() => setEditingCity(null)}
                        cities={cities}
                        dispatch={dispatch}
                    />
                </ErrorBoundary>
            )}

            {/* רשימת ערים */}
            <div className="row">
                {cities.map(city => (
                    <div key={city.id} className="col-md-4 mb-4">
                        <CityCard
                            city={city}
                            onEdit={() => setEditingCity(city)}
                            onDelete={() => confirmDelete(city.id)}
                            onToggleFavorite={() => toggleFavorite(city.id)}
                            showEditDelete={true}
                            showForecast={false}
                        />
                    </div>
                ))}
            </div>

            {/* Modal למחיקה */}
            <ErrorBoundary>
                <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
                    <Modal.Header closeButton>
                        <Modal.Title>Delete City</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        Are you sure you want to delete this city?
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
                            Cancel
                        </Button>
                        <Button variant="danger" onClick={() => handleDelete(cityToDelete)}>
                            Delete
                        </Button>
                    </Modal.Footer>
                </Modal>
            </ErrorBoundary>
        </Container>
    );
}