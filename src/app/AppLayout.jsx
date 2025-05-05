import React from 'react';
import { Container, Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Outlet } from 'react-router-dom';

/**
 * רכיב המגדיר את מבנה העמוד הבסיסי של האפליקציה
 * @returns {JSX.Element} - מבנה העמוד הבסיסי
 */
export default function AppLayout() {
    return (
        <div className="d-flex flex-column min-vh-100">
            <Navbar bg="primary" variant="dark" expand="lg" className="shadow-sm px-3" sticky="top">
                {/* Fix: Use 'as' prop with a string for the component tag */}
                <Navbar.Brand as="div" className="d-flex align-items-center me-auto">
                    <Link to="/" className="text-decoration-none text-white d-flex align-items-center">
                        <i className="bi bi-cloud-sun fs-4 me-2"></i>
                        <span className="fw-bold">Weather App</span>
                    </Link>
                </Navbar.Brand>

                <Navbar.Toggle aria-controls="main-navbar" />
                <Navbar.Collapse id="main-navbar">
                    <Nav className="ms-auto">
                        {/* Fix: Separate Nav.Link from Link component */}
                        <Nav.Link as="div" className="mx-2 p-0">
                            <Link to="/" className="nav-link">
                                <i className="bi bi-house-door me-1" aria-hidden="true"></i> Homepage
                            </Link>
                        </Nav.Link>
                        <Nav.Link as="div" className="mx-2 p-0">
                            <Link to="/cities" className="nav-link">
                                <i className="bi bi-buildings me-1"></i> All cities
                            </Link>
                        </Nav.Link>
                        <Nav.Link as="div" className="mx-2 p-0">
                            <Link to="/about" className="nav-link">
                                <i className="bi bi-info-circle me-1"></i>About
                            </Link>
                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>

            {/* Main Content - תוכן עיקרי */}
            <Container className="flex-grow-1 mt-4 mb-5">
                <Outlet />
            </Container>

            {/* Footer - כותרת תחתונה */}
            <footer className="bg-light py-3 mt-auto">
                <Container>
                    <div className="d-flex flex-column justify-content-between align-items-center text-center">
                        <p className="mb-2 mb-md-0 text-muted w-100">© {new Date().getFullYear()} Weather App</p>
                    </div>
                </Container>
            </footer>
        </div>
    );
}