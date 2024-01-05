export function displayWeather(weatherData) {
    const currentWeatherIconElement = document.getElementById('icon');
    if (currentWeatherIconElement) {
        currentWeatherIconElement.src = 
            `https://openweathermap.org/img/wn/${weatherData.iconCode}@2x.png`;
    }
    else {
        const weatherIcon = getWeatherIcon(weatherData.iconCode);
        document.body.appendChild(weatherIcon);
    }
    
    const currentStatement = document.getElementById('statement');
    if (currentStatement) {
        statement.innerHTML = `Right now in ${weatherData.locationName} it is 
        ${weatherData.actualTemp}&deg and ${weatherData.weatherType}`;
    }
    else {
        const statement = buildHtmlElements('h3','statement', weatherData);
        document.body.appendChild(statement);
    }

    const currentActual = document.getElementById('actual');
    if (currentActual) {
        `...and even though it's ${weatherData.actualTemp} it 
        feels like ${weatherData.feelsLikeTemp}&deg`
    }
    else {
        const actual = buildHtmlElements('h4', 'actual', weatherData);
        document.body.appendChild(actual);
    }
}

function buildHtmlElements(elementType, id, weatherData) {
    const htmlElement = document.createElement(elementType);
    htmlElement.id = id;
    if (id === 'statement') {
        htmlElement.innerHTML = `Right now in ${weatherData.locationName} it is 
        ${weatherData.actualTemp}&deg and ${weatherData.weatherType}`;
    }
    else if (id === 'actual') {
        htmlElement.innerHTML = `...and even though it's ${weatherData.actualTemp} it 
        feels like ${weatherData.feelsLikeTemp}&deg`
    }
    return htmlElement;
}

function getWeatherIcon(iconCode){
    const weatherIcon = new Image();
    weatherIcon.id = 'icon';
    weatherIcon.src = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;    
    return weatherIcon;
}