
const WEATHER_API_KEY = '527b5b7b96274157a07624081904c45e';

export async function getCurrentWeather(lat, lon) { 
    const weatherApiCallUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=imperial`;

    try {
        const weatherResponse = await fetch(weatherApiCallUrl, {mode: 'cors'});
        const weatherData = await processWeatherJSON(weatherResponse);
        console.log(weatherData);
    }
    catch (error) {
        console.log('There was an issue: ' + error);  
    }
}

export async function processWeatherJSON(weatherRawResponse) {
    try {
        const weatherData = await weatherRawResponse.json();

        const locationName = weatherData.name;
        const actualTemp = weatherData.main.temp;
        const feelsLikeTemp = weatherData.main.feels_like;
        const weatherType = weatherData.weather[0].main;
        const weatherDescription = weatherData.weather[0].description;
        const weatherIcon = weatherData.weather[0].icon;

    return {
        locationName, 
        actualTemp, 
        feelsLikeTemp, 
        weatherType, 
        weatherDescription, 
        weatherIcon}
    }
    catch (error) {
        console.log('There was an issue: ' + error);  
    }
}

export async function getLocationData(postalCode) {
    const geocodeApiCallUrl = `http://api.openweathermap.org/geo/1.0/zip?zip=${postalCode}&appid=${WEATHER_API_KEY}`;

    try {
        const locationResponse = await fetch(geocodeApiCallUrl, {mode: 'cors'});
        const locationData = await locationResponse.json();
        console.log(locationData);
        return locationData;
    }
    catch (error) {
        console.log('There was an issue: ' + error);  
    } 
} 