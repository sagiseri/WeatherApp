// src/App.js
import { useReducer, useEffect } from 'react';
import { initialCities } from './utils/constants';
import { Routes, Route, Link } from 'react-router-dom';
import HomePage from './pages/HomePage';
import CitiesPage from './pages/CitiesPage';
import AboutPage from './pages/AboutPage';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';

function reducer(state, action) {
  switch (action.type) {
    case 'SET_CITIES':
      return { ...state, cities: action.payload, loading: false };
    case 'TOGGLE_FAVORITE':
      return {
        ...state,
        cities: state.cities.map(city =>
            city.id === action.payload ? { ...city, isFavorite: !city.isFavorite } : city
        ),
      };
    case 'SET_ERROR':
      return { ...state, error: action.payload, loading: false };
    case 'ADD_CITY':
      return {
        ...state,
        cities: [...state.cities, { ...action.payload, id: Date.now() }]
      };
    case 'DELETE_CITY':
      return {
        ...state,
        cities: state.cities.filter(city => city.id !== action.payload)
      };
    default:
      return state;
  }
}

function App() {
  const [state, dispatch] = useReducer(reducer, {
    cities: [],
    loading: true,
    error: null
  });

  useEffect(() => {
    try {
      const savedCities = JSON.parse(localStorage.getItem('cities'));
      dispatch({
        type: 'SET_CITIES',
        payload: savedCities || initialCities
      });
    } catch (error) {
      dispatch({
        type: 'SET_ERROR',
        payload: 'שגיאה בטעינת ערים מה-localStorage'
      });
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('cities', JSON.stringify(state.cities));
  }, [state.cities]);

  if (state.error) {
    return (
        <div className="alert alert-danger m-4">
          <strong>Error:</strong> {state.error}
          <button
              onClick={() => dispatch({ type: 'SET_ERROR', payload: null })}
              className="btn btn-sm btn-outline-danger ms-2"
          >
            Try Again
          </button>
        </div>
    );
  }

  return (
      <div className="app">
        <Navbar bg="light" expand="lg">
          <Container>
            <Navbar.Brand as={Link} to="/">Weather App</Navbar.Brand>
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/">Home</Nav.Link>
              <Nav.Link as={Link} to="/cities">All Cities</Nav.Link>
              <Nav.Link as={Link} to="/about">About</Nav.Link>
            </Nav>
          </Container>
        </Navbar>

        <Container className="mt-4">
          <Routes>
            <Route
                path="/"
                element={
                  <HomePage
                      cities={state.cities}
                      dispatch={dispatch}
                      loading={state.loading}
                  />
                }
            />
            <Route
                path="/cities"
                element={
                  <CitiesPage
                      cities={state.cities}
                      dispatch={dispatch}
                  />
                }
            />
            <Route path="/about" element={<AboutPage />} />
          </Routes>
        </Container>
      </div>
  );
}

export default App;