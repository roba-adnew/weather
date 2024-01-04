/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
const header = document.createElement('h1');
header.innerHTML = 'hello';
document.body.appendChild(header);
async function getCurrentWeather() {
  const weatherApiCall = 'https://api.openweathermap.org/data/3.0/onecall?lat=40.7&lon=-73.9&exclude=minutely,hourly,daily,alerts&units=imperial&appid=527b5b7b96274157a07624081904c45e';
  try {
    const rawResponse = await fetch(weatherApiCall, {
      mode: 'cors'
    });
    const jsonResponse = await rawResponse.json();
    console.log(jsonResponse);
  } catch (error) {
    console.log('There was an issue: ' + error);
  }
}
getCurrentWeather;
/******/ })()
;
//# sourceMappingURL=index.js.map