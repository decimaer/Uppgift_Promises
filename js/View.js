const mainContainer = document.getElementById("main-container");
const sectionContainer = document.querySelectorAll(".section-container");
const contentCards = document.querySelectorAll(".content-cards");
const weatherContainer = document.getElementById("weather-container");
const timeDateContainer = document.getElementById("time-date-container");
const creditContainer = document.getElementById("credit-container");

const setCSS = function () {
	const cssBody = "margin: 0;";
	const cssSectionContainer = "height: 100vh; width: auto;";
	const cssContentCards = `
      display: flex;
      flex-direction: row;
      margin: 0;
      padding: 1em;
      height: fit-content;
      width: fit-content;
      background-color: white;
      border-radius: 15px;
   `;
	const cssWeatherContainer = `
      position: absolute;
      right: 1em;
      top: 1em;
   `;
	const cssTimeDateContainer = `
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
   `;
	const cssCreditContainer = `
      position: absolute;
      left: 1em;
      bottom: 1em;
   `;

	document.body.style.cssText = cssBody;
	sectionContainer.forEach((el) => {
		el.style.cssText = cssSectionContainer;
	});
	weatherContainer.style.cssText = cssWeatherContainer + cssContentCards;
	timeDateContainer.style.cssText = cssTimeDateContainer + cssContentCards;
	creditContainer.style.cssText = cssCreditContainer + cssContentCards;
};
setCSS();

export const renderImageCredit = function (data) {
	console.log(data);
	creditContainer.innerHTML = `
   <img src="${data.profile_image.medium}">
   <p>Photo by <a href="${data.links.self}">${data.name}</a> on <a href="https://unsplash.com/">Unsplash</a></p>
`;
};

export const renderBackgroundImage = function (url, alt) {
	mainContainer.style.backgroundImage = `url('${url}')`;
	// mainContainer.style.height = "100vh";
	// mainContainer.style.width = "100vw";

	mainContainer.style.backgroundSize = "cover";

	mainContainer.setAttribute("title", `background image: ${alt}`);
};

export const renderWeather = function (weatherData) {
	weatherContainer.insertAdjacentHTML(
		"beforeend",
		`
      <div>
       <h1 class="place">${weatherData.data.name}</h1>
       <p class="temp">${Math.round(weatherData.data.main.temp)}°C</p>
       <p class="sky">${weatherData.data.weather[0].main}</p>
       </div>
       <img class="skyicon" src="http://openweathermap.org/img/wn/${
				weatherData.data.weather[0].icon
			}@2x.png" alt="">
       `
	);
};

export const getGeolocation = function (success) {
	navigator.geolocation.getCurrentPosition(function (pos) {
		success(pos);
	});
};

export const renderTimeDate = function (timeDate) {
	timeDateContainer.innerHTML = `
      <p>${timeDate}</p>


   `;
};
