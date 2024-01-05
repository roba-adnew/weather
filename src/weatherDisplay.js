export function displayWeather(weatherData) {

    const weatherIcon = getWeatherIcon(weatherData.weatherIcon);
    document.body.appendChild(weatherIcon);

    const overall = buildHtmlElements('h3','statement');
    statement.innerHTML = `Right now in ${weatherData.locationName} it is 
        ${weatherData.actualTemp}&deg and ${weatherData.weatherType}`;
    
    const actual = buildHtmlElements('h4', 'actual');
    actual.innerHTML = `...and even though it's ${weatherData.actualTemp} it 
        feels like ${weatherData.feelsLikeTemp}&deg`
}

function buildHtmlElements(element, id) {
    const htmlElement = document.createElement(element);
    htmlElement.id = id;
    document.body.appendChild(htmlElement);
    return htmlElement;
}

function getWeatherIcon(iconCode){
    const weatherIcon = new Image();
    weatherIcon.src = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
    return weatherIcon;
}