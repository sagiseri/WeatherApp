import React, { Component } from 'react';
import { Alert, Button } from 'react-bootstrap';


export default class ErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true, error };
    }

    componentDidCatch(error, errorInfo) {
        console.error('Error caught by ErrorBoundary:', error, errorInfo);
    }

    handleReset = () => {
        this.setState({ hasError: false, error: null });
    };

    render() {
        if (this.state.hasError) {
            return (
                <div className="p-4">
                    <Alert variant="danger" className="text-center">
                        <Alert.Heading>אירעה שגיאה!</Alert.Heading>
                        <p className="mb-3">{this.state.error.message}</p>
                        <Button variant="outline-danger" onClick={this.handleReset}>
                            נסה שוב
                        </Button>
                    </Alert>
                </div>
            );
        }

        return this.props.children;
    }
}