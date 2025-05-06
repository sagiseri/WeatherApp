import React from 'react';
import { Container, Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Outlet } from 'react-router-dom';

/**
 * AppLayout is the main layout component for the Weather App.
 *
 * It includes:
 * - A responsive Bootstrap navigation bar with links to main pages.
 * - A dynamic content area rendered via React Router's <Outlet />.
 * - A footer that stays at the bottom using flex layout.
 *
 * This layout wraps all pages in a consistent UI structure.
 * @returns {Element} The layout including navbar, page content, and footer.
 * @constructor
 */
export default function AppLayout() {
    return (
        <div className="d-flex flex-column min-vh-100">
            <Navbar bg="primary" variant="dark" expand="lg" className="shadow-sm px-3" sticky="top">
                <Navbar.Brand as="div" className="d-flex align-items-center me-auto">
                    <Link to="/" className="text-decoration-none text-white d-flex align-items-center">
                        <i className="bi bi-cloud-sun fs-4 me-2"></i>
                        <span className="fw-bold">Weather App</span>
                    </Link>
                </Navbar.Brand>

                <Navbar.Toggle aria-controls="main-navbar" />
                <Navbar.Collapse id="main-navbar">
                    <Nav className="ms-auto">

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

            {/* Main Content */}
            <Container className="flex-grow-1 mt-4 mb-5">
                <Outlet />
            </Container>

            {/* Footer */}
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