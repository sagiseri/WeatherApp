
/**
 * Formats API date to readable format (DD/MM/YYYY)
 * @param {number} apiDate - Date in YYYYMMDD format
 * @returns {string} Formatted date
 */
export const formatWeatherDate = (apiDate) => {
    const dateStr = apiDate.toString();
    return `${dateStr.slice(6,8)}/${dateStr.slice(4,6)}/${dateStr.slice(0,4)}`;
};

/**
 * Maps weather codes to descriptions
 * @param {string} weatherCode - API weather code
 * @returns {string} Weather description
 */
export const getWeatherDescription = (weatherCode) => {
    const descriptions = {
        'clear': 'Clear',
        'pcloudy': 'Partly cloudy',
        'mcloudy': 'Mostly cloudy',
        'cloudy': 'Cloudy',
        'humid': 'Humid',
        'lightrain': 'Light rain',
        'oshower': 'Occasional showers',
        'ishower': 'Isolated showers',
        'lightsnow': 'Light snow',
        'rain': 'Rain',
        'snow': 'Snow',
        'rainsnow': 'Rain and snow',
        'ts': 'Thunderstorm',
        'tsrain': 'Thunderstorm with rain'
    };

    return descriptions[weatherCode] || weatherCode;
};