import React, { Component } from 'react';
import { Alert, Button } from 'react-bootstrap';

/**
 * A React error boundary component that catches rendering errors
 * in its child component tree and displays a fallback UI.
 */
export default class ErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null };
    }

    /**
     * Lifecycle method that updates state when an error is thrown.
     * @param error - The error thrown during rendering.
     * @returns {{hasError: boolean, error}}
     */
    static getDerivedStateFromError(error) {
        return { hasError: true, error };
    }

    /**
     * Lifecycle method for logging error details.
     * @param error - The caught error.
     * @param errorInfo - Additional info about the error.
     */
    componentDidCatch(error, errorInfo) {
        console.error('Error caught by ErrorBoundary:', error, errorInfo);
    }

    /**
     * Resets the error boundary state to allow retrying the render.
     */
    handleReset = () => {
        this.setState({ hasError: false, error: null });
    };

    /**
     * Renders fallback UI if an error has occurred, otherwise renders children.
     * @returns {React.JSX.Element|*}
     */
    render() {
        if (this.state.hasError) {
            return (
                <div className="p-4">
                    <Alert variant="danger" className="text-center">
                        <Alert.Heading>an error has occurred</Alert.Heading>
                        <p className="mb-3">{this.state.error.message}</p>
                        <Button variant="outline-danger" onClick={this.handleReset}>
                            try again
                        </Button>
                    </Alert>
                </div>
            );
        }

        return this.props.children;
    }
}