import React from 'react';

/**
 * About component for the weather application.
 * Displays information about the application and the submitters.
 * Uses enhanced Bootstrap styling for better visual appeal.
 *
 * @returns {JSX.Element} The About page component
 */
const About = () => {
    // Submitter information - replace with your actual information
    const submitters = [
        {
            name: "Sagi Seri",
            email: "sagise@edu.jmc.ac.il"
        },
        {
            name: "Malka Grafstein",
            email: "malkagra@edu.jmc.ac.il"
        }
    ];

    return (
        <div className="container py-5">
            <div className="row justify-content-center mb-5">
                <div className="col-lg-10">
                    <div className="text-center mb-5">
                        <h1 className="display-4 fw-bold text-primary mb-3">About Our Weather App</h1>
                        <p className="lead text-muted">Your personal weather forecasting assistant</p>
                        <hr className="my-4" />
                    </div>

                    <div className="card border-0 rounded-3 mb-5 bg-light">
                        <div className="card-body p-4 p-md-5">
                            <h2 className="card-title fw-bold text-primary mb-4">Weather Forecasting Application</h2>
                            <p className="card-text fs-5">
                                This application allows users to manage a list of cities and view detailed weather forecasts.
                                Built with React, it demonstrates the use of components, state management, forms, and API integration.
                            </p>

                            <div className="bg-white rounded-3 p-4 mt-4 mb-4">
                                <h3 className="h5 fw-bold mb-3">Key Features</h3>
                                <div className="row">
                                    <div className="col-md-6">
                                        <ul className="list-group list-group-flush">
                                            <li className="list-group-item bg-transparent">
                                                Managing cities with coordinates
                                            </li>
                                            <li className="list-group-item bg-transparent">
                                                Marking cities as favorites
                                            </li>
                                            <li className="list-group-item bg-transparent">
                                                Filtering cities by country
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="col-md-6">
                                        <ul className="list-group list-group-flush">
                                            <li className="list-group-item bg-transparent">
                                                7-day weather forecasts
                                            </li>
                                            <li className="list-group-item bg-transparent">
                                                Form validation
                                            </li>
                                            <li className="list-group-item bg-transparent">
                                                Responsive design
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>

                            <div className="card-text p-3 bg-white rounded-3">
                                <p className="mb-0">
                                    The application uses React Router for navigation, React hooks for state management,
                                    and Bootstrap for responsive design. All data is stored locally for easy access.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="row justify-content-center">
                <div className="col-lg-8">
                    <h2 className="text-center fw-bold text-primary mb-4">Development Team</h2>
                    <div className="row">
                        {submitters.map((submitter, index) => (
                            <div key={index} className="col-md-6 mb-4">
                                <div className="card h-100 border-0 rounded-3 bg-light">
                                    <div className="card-header bg-primary text-white text-center py-3">
                                        <h3 className="card-title h5 fw-bold mb-0">Developer</h3>
                                    </div>
                                    <div className="card-body text-center p-4">
                                        <h4 className="h4 fw-bold mb-3">{submitter.name}</h4>
                                        <p className="card-text mb-0">
                                            <strong>Email:</strong> {submitter.email}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

        </div>
    );
};

export default About;