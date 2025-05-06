import { useState } from 'react';
import { Button, Container, Modal, Row, Col, Card } from 'react-bootstrap';
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
        <Container className="py-4">
            {/* Header section with styled title */}
            <div className="mb-4 pb-2 border-bottom">
                <h1 className="display-5 fw-bold">All Cities</h1>
                <p className="text-muted">Manage your city collection</p>
            </div>

            {/* Action bar */}
            <div className="d-flex justify-content-between align-items-center mb-4">
                <Button variant="primary" className="px-4" onClick={() => setIsAdding(true)}>
                    <i className="bi bi-plus-lg me-2"></i>Add City
                </Button>

                <div className="text-muted">
                    {cities.length} {cities.length === 1 ? 'city' : 'cities'} in collection
                </div>
            </div>

            {/* Form sections with improved styling */}
            {isAdding && (
                <ErrorBoundary>
                    <Card className="mb-4 shadow-sm border-primary">
                        <Card.Header className="bg-primary bg-opacity-10 fw-bold">
                            Add New City
                        </Card.Header>
                        <Card.Body>
                            <CityForm
                                mode="add"
                                onSubmit={handleAdd}
                                onCancel={() => setIsAdding(false)}
                                cities={cities}
                                dispatch={dispatch}
                            />
                        </Card.Body>
                    </Card>
                </ErrorBoundary>
            )}

            {editingCity && (
                <ErrorBoundary>
                    <Card className="mb-4 shadow-sm border-warning">
                        <Card.Header className="bg-warning bg-opacity-10 fw-bold">
                            Edit City: {editingCity.name}
                        </Card.Header>
                        <Card.Body>
                            <CityForm
                                mode="edit"
                                initialData={editingCity}
                                onSubmit={handleEdit}
                                onCancel={() => setEditingCity(null)}
                                cities={cities}
                                dispatch={dispatch}
                            />
                        </Card.Body>
                    </Card>
                </ErrorBoundary>
            )}

            {/* Empty state */}
            {cities.length === 0 && !isAdding && (
                <div className="text-center my-5 py-5 bg-light rounded-3">
                    <div className="py-3">
                        <i className="bi bi-buildings fs-1 text-secondary mb-3"></i>
                        <h4 className="mb-3">No cities in your collection yet</h4>
                        <p className="text-muted mb-4">Add your first city to get started</p>
                        <Button variant="primary" onClick={() => setIsAdding(true)}>
                            Add Your First City
                        </Button>
                    </div>
                </div>
            )}

            {/* City grid with improved responsiveness */}
            <Row xs={1} sm={2} lg={3} xl={4} className="g-4">
                {cities.map(city => (
                    <Col key={city.id}>
                        <ErrorBoundary>
                            <CityCard
                                city={city}
                                onEdit={() => setEditingCity(city)}
                                onDelete={() => confirmDelete(city.id)}
                                onToggleFavorite={() => toggleFavorite(city.id)}
                                showEditDelete={true}
                                showForecast={false}
                            />
                        </ErrorBoundary>
                    </Col>
                ))}
            </Row>

            {/* Delete confirmation modal with improved styling */}
            <ErrorBoundary>
                <Modal
                    show={showDeleteModal}
                    onHide={() => setShowDeleteModal(false)}
                    centered
                >
                    <Modal.Header closeButton className="border-0 pb-0">
                        <Modal.Title className="text-danger">
                            <i className="bi bi-exclamation-triangle me-2"></i>
                            Delete City
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body className="pt-0">
                        <p>Are you sure you want to delete this city?</p>
                        <p className="text-muted small">This action cannot be undone.</p>
                    </Modal.Body>
                    <Modal.Footer className="border-0">
                        <Button variant="outline-secondary" onClick={() => setShowDeleteModal(false)}>
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