# ![Weather](https://img.shields.io/badge/WeatherApp-React-blue) WeatherApp

## 👨‍🎓 Student Information

| Name | Email | Notes |
|------|-------|-------|
| Sagi Seri | [sagise@edu.jmc.ac.il](mailto:sagise@edu.jmc.ac.il) | – |
| Malka Grafstein | [malkagra@edu.jmc.ac.il](mailto:malkagra@edu.jmc.ac.il) | – |

> **Note:** One of the team members was on *miluim* (reserve duty) for one week during the assignment.

---

## 📝 Description
**WeatherApp** is a **React-based application** that provides real-time weather information for cities worldwide. Users can search for cities, select countries, and view detailed weather data, including:  
- Temperature (min & max)  
- Weather conditions (sunny, cloudy, etc.)  
- Wind speed  
- Date (in `DD/MM/YYYY` format)  

The app integrates with the **7timer API** to fetch accurate and up-to-date weather information.

---

## ⚡ Features

### 1. City Search
- Search for cities and view their current weather.
- Dropdown menu for quick city selection.
- Displays key weather metrics (condition, temperature, wind, date).

### 2. Weather Data Display
- Clear and readable weather information.
- Includes:
  - Weather condition (e.g., cloudy, sunny)
  - Minimum and maximum temperature
  - Wind speed
  - Date in `DD/MM/YYYY` format

### 3. Reset Functionality
- Reset button clears all input fields instantly.

### 4. Dropdown Menu
- Predefined list of cities for easy selection.

### 5. API Integration
- Fetches data from the **7timer API**.  
- Example API response:
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
### 6. API Endpoint
- Weather data is retrieved from:

```bash
https://www.7timer.info/bin/api.pl?lon=35.213618&lat=31.771959&product=civillight&output=json
```

### 7. Country Selection
- Users can select a country, and the app will display weather information for cities within that country.

## ⚙️ Installation

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

## 🛠️ Technologies Used

- **React** – Frontend framework  
- **JavaScript (ES6+)** – Application logic  
- **7timer API** – Weather data  
- **CSS / HTML** – Styling and layout  


