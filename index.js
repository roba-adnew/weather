/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/getData.js":
/*!************************!*\
  !*** ./src/getData.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getCurrentWeather: () => (/* binding */ getCurrentWeather),
/* harmony export */   getLocationData: () => (/* binding */ getLocationData),
/* harmony export */   processWeatherJSON: () => (/* binding */ processWeatherJSON)
/* harmony export */ });
const WEATHER_API_KEY = '527b5b7b96274157a07624081904c45e';
async function getCurrentWeather(lat, lon) {
  const weatherApiCallUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=imperial`;
  try {
    const weatherResponse = await fetch(weatherApiCallUrl, {
      mode: 'cors'
    });
    const weatherData = await processWeatherJSON(weatherResponse);
    return weatherData;
  } catch (error) {
    console.log('There was an issue: ' + error);
  }
}
async function processWeatherJSON(weatherRawResponse) {
  try {
    const weatherData = await weatherRawResponse.json();
    const locationName = weatherData.name;
    const actualTemp = weatherData.main.temp;
    const feelsLikeTemp = weatherData.main.feels_like;
    const weatherType = weatherData.weather[0].main;
    const weatherDescription = weatherData.weather[0].description;
    const iconCode = weatherData.weather[0].icon;
    return {
      locationName,
      actualTemp,
      feelsLikeTemp,
      weatherType,
      weatherDescription,
      iconCode
    };
  } catch (error) {
    console.log('There was an issue: ' + error);
  }
}
async function getLocationData(postalCode) {
  const geocodeApiCallUrl = `http://api.openweathermap.org/geo/1.0/zip?zip=${postalCode}&appid=${WEATHER_API_KEY}`;
  try {
    const locationResponse = await fetch(geocodeApiCallUrl, {
      mode: 'cors'
    });
    const locationData = await locationResponse.json();
    return locationData;
  } catch (error) {
    console.log('There was an issue: ' + error);
  }
}

/***/ }),

/***/ "./src/searchForm.js":
/*!***************************!*\
  !*** ./src/searchForm.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   createSearchForm: () => (/* binding */ createSearchForm),
/* harmony export */   startSearchListeners: () => (/* binding */ startSearchListeners)
/* harmony export */ });
/* harmony import */ var _getData__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./getData */ "./src/getData.js");
/* harmony import */ var _weatherDisplay__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./weatherDisplay */ "./src/weatherDisplay.js");


function createSearchForm() {
  const searchForm = document.createElement('form');
  const searchField = document.createElement('input');
  searchField.id = 'search';
  const submitButton = document.createElement('button');
  submitButton.type = 'button';
  submitButton.id = 'button';
  submitButton.innerHTML = 'get weather';
  searchForm.appendChild(searchField);
  searchForm.appendChild(submitButton);
  document.body.appendChild(searchForm);
}
function startSearchListeners() {
  const submitButton = document.getElementById('button');
  async function searchLocation() {
    const searchField = document.getElementById('search');
    const zipCode = searchField.value === '' ? '11238' : searchField.value;
    // add in line that grabs zip from IP address 
    const locationData = await (0,_getData__WEBPACK_IMPORTED_MODULE_0__.getLocationData)(zipCode);
    const lat = await locationData.lat;
    const lon = await locationData.lon;
    const currentWeather = await (0,_getData__WEBPACK_IMPORTED_MODULE_0__.getCurrentWeather)(lat, lon);
    await (0,_weatherDisplay__WEBPACK_IMPORTED_MODULE_1__.displayWeather)(currentWeather);
  }
  submitButton.addEventListener('click', searchLocation, false);
}

/***/ }),

/***/ "./src/weatherDisplay.js":
/*!*******************************!*\
  !*** ./src/weatherDisplay.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   displayWeather: () => (/* binding */ displayWeather)
/* harmony export */ });
function displayWeather(weatherData) {
  const currentWeatherIconElement = document.getElementById('icon');
  if (currentWeatherIconElement) {
    currentWeatherIconElement.src = `https://openweathermap.org/img/wn/${weatherData.iconCode}@2x.png`;
  } else {
    const weatherIcon = getWeatherIcon(weatherData.iconCode);
    document.body.appendChild(weatherIcon);
  }
  const currentStatement = document.getElementById('statement');
  if (currentStatement) {
    statement.innerHTML = `Right now in ${weatherData.locationName} it is 
        ${weatherData.actualTemp}&deg and ${weatherData.weatherType}`;
  } else {
    const statement = buildHtmlElements('h3', 'statement', weatherData);
    document.body.appendChild(statement);
  }
  const currentActual = document.getElementById('actual');
  if (currentActual) {
    `...and even though it's ${weatherData.actualTemp} it 
        feels like ${weatherData.feelsLikeTemp}&deg`;
  } else {
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
  } else if (id === 'actual') {
    htmlElement.innerHTML = `...and even though it's ${weatherData.actualTemp} it 
        feels like ${weatherData.feelsLikeTemp}&deg`;
  }
  return htmlElement;
}
function getWeatherIcon(iconCode) {
  const weatherIcon = new Image();
  weatherIcon.id = 'icon';
  weatherIcon.src = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
  return weatherIcon;
}

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _searchForm__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./searchForm */ "./src/searchForm.js");
/* harmony import */ var _getData__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./getData */ "./src/getData.js");


(0,_searchForm__WEBPACK_IMPORTED_MODULE_0__.createSearchForm)();
(0,_searchForm__WEBPACK_IMPORTED_MODULE_0__.startSearchListeners)();
})();

/******/ })()
;
//# sourceMappingURL=index.js.map