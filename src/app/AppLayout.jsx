import React from 'react';
import { Container, Navbar, Nav } from 'react-bootstrap';
import { Link, Outlet } from 'react-router-dom';

/**
 * רכיב המגדיר את מבנה העמוד הבסיסי של האפליקציה
 * @returns {JSX.Element} - מבנה העמוד הבסיסי
 */
export default function AppLayout() {
    return (
        <div className="d-flex flex-column min-vh-100">
            <Navbar bg="primary" variant="dark" expand="lg" className="shadow-sm px-3" sticky="top">

                <Navbar.Brand as={Link} to="/" className="d-flex align-items-center me-auto">
                    <i className="bi bi-cloud-sun fs-4 me-2"></i>
                    <span className="fw-bold">Weather App</span>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="main-navbar" />
                <Navbar.Collapse id="main-navbar">
                    <Nav className="ms-auto">
                        <Nav.Link as={Link} to="/" className="mx-2">
                            <i className="bi bi-house-door me-1 aria-label="></i> Homepage
                        </Nav.Link>
                        <Nav.Link as={Link} to="/cities" className="mx-2">
                            <i className="bi bi-buildings me-1"></i> All cities
                        </Nav.Link>
                        <Nav.Link as={Link} to="/about" className="mx-2">
                            <i className="bi bi-info-circle me-1"></i>About
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
                        <div>
                            <a href="#" className="text-decoration-none text-muted mx-2">
                                <i className="bi bi-github"></i>
                            </a>
                            <a href="#" className="text-decoration-none text-muted mx-2">
                                <i className="bi bi-linkedin"></i>
                            </a>
                        </div>
                    </div>
                </Container>
            </footer>
        </div>
    );
}