<h1>student information:</h1>
Sagi Seri sagise@edu.jmc.ac.il<br>
Malka Grafstein malkagra@edu.jmc.ac.il<br>
one of the members was in miluim for a week of the assignment.

# WeatherApp

## Description
WeatherApp is a weather information app built with React that allows users to search for cities and retrieve real-time weather data. The app integrates a weather API to display weather conditions, temperature (min and max), wind speed, and more.

## Features

1. **City Search**:
    - Users can search for cities, and the app will display the weather details for the selected city.
    - The app uses a dropdown to select the city.
    - Displays data such as weather, max and min temperature, wind speed, etc.

2. **Weather Data Display**:
    - Displays weather data like:
        - Weather conditions (e.g., cloudy, sunny).
        - Minimum and maximum temperature.
        - Wind speed.
        - Date in `DD/MM/YYYY` format.

3. **Reset Functionality**:
    - Reset button that clears all input fields.

4. **Dropdown Menu**:
    - A dropdown allows the user to select cities from a predefined list.

5. **API Integration**:
    - Fetches data from a weather API:
    - Sample API Response:
      ```json
      {
        "date": 20250424,
        "weather": "cloudy",
        "temp2m": {
          "max": 30,
          "min": 18
        },
        "wind10m_max": 3
      }
      ```

6. **API Endpoint**:
    - The weather data is fetched from the `7timer` API at:
    ```bash
    https://www.7timer.info/bin/api.pl?lon=35.213618&lat=31.771959&product=civillight&output=json
    ```

7. **Country Information**:
    - The app allows users to choose a country, and based on the selected country, the corresponding weather information is shown.

## Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/yourusername/WeatherApp.git
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Start the development server:
    ```bash
    npm start
    ```
