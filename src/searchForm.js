import { getCurrentWeather, getLocationData } from "./getData";

export function createSearchForm() {
    const searchForm = document.createElement('form');
    const searchField = document.createElement('input');
    searchField.id = 'search';

    const submitButton = document.createElement('button');
    submitButton.type = 'button';
    submitButton.id = 'button';
    submitButton.innerHTML = 'get weather'

    searchForm.appendChild(searchField);
    searchForm.appendChild(submitButton);
    document.body.appendChild(searchForm);
}

export function startSearchListeners() {
    const submitButton = document.getElementById('button');
    
    async function searchLocation() {
        const searchField = document.getElementById('search');
        const zipCode = searchField.value === '' ? '11238' : searchField.value;
        // add in line that grabs zip from IP address 
        const locationData = await getLocationData(zipCode);
        const lat = await locationData.lat;
        const lon = await locationData.lon;
        const currentWeather = await getCurrentWeather(lat,lon);
    }

    submitButton.addEventListener('click', searchLocation, false)
}

// function roundToHundredth(number) {
//     return Math.floor(number * 100) / 100;
// }