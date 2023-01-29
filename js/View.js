const mainContainer = document.getElementById("main-container");
const sectionContainer = document.querySelectorAll(".section-container");
const galleryContainer = document.getElementById("gallery-container");
const contentCards = document.querySelectorAll(".content-cards");
const weatherContainer = document.getElementById("weather-container");
const timeDateContainer = document.getElementById("time-date-container");
const creditContainer = document.getElementById("credit-container");
const onThisDayContainer = document.getElementById("on-this-day-container");
const wordOfTheDayContainer = document.getElementById(
	"word-of-the-day-container"
);

const css = {
	cssBody: "margin: 0;",
	cssSectionContainer: "height: 100vh; width: auto;",
	cssContentCards: `
      display: flex;
      flex-direction: row;
      margin: 0;
      padding: 1em;
      height: fit-content;
      width: fit-content;
      background-color: white;
      border-radius: 15px;
      font-size: 0.7em;
   `,
	cssWeatherContainer: `
      position: absolute;
      right: 1em;
      top: 1em;
   `,
	cssTimeDateContainer: `
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
   `,
	cssTimeDateTextElement: `
      font-size: 2em;
   `,
	cssCreditContainer: `
      align-items: center;
      position: absolute;
      left: 1em;
      bottom: 1em;
   `,
	cssImageCreditContainer: `
      width: 3em;
      height: 3em;
      border-radius: 50%;
      padding-right: 1em;
      `,
	cssOnThisDayContainer: `
      flex-direction: column;
      position: absolute;
      right: 1em;
      bottom: 1em;
      max-width: 30vw;
   `,
	cssWordOftheDayContainer: `
      flex-direction: column;
      position: absolute;
      left: 1em;
      top: 1em;
      max-width: 30vw;
   `,
};

const setCSS = function () {
	document.body.style.cssText = css.cssBody;
	sectionContainer.forEach((el) => {
		el.style.cssText = css.cssSectionContainer;
	});
	weatherContainer.style.cssText =
		css.cssContentCards + css.cssWeatherContainer;
	timeDateContainer.style.cssText =
		css.cssContentCards + css.cssTimeDateContainer;

	creditContainer.style.cssText = css.cssContentCards + css.cssCreditContainer;
	onThisDayContainer.style.cssText =
		css.cssContentCards + css.cssOnThisDayContainer;

	wordOfTheDayContainer.style.cssText =
		css.cssContentCards + css.cssWordOftheDayContainer;
};
setCSS();

export const renderImageCredit = function (data) {
	console.log(data);
	creditContainer.innerHTML = `
   <img src="${data.profile_image.medium}">
   <p>Photo by <a href="${data.links.self}">${data.name}</a> on <a href="https://unsplash.com/">Unsplash</a></p>
   `;

	const imageCreditContainer = creditContainer.firstElementChild;
	imageCreditContainer.style.cssText = css.cssImageCreditContainer;
};

export const renderBackgroundImage = function (url, alt) {
	mainContainer.style.backgroundImage = `url('${url}')`;
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

	const timeDateTextElement = timeDateContainer.firstElementChild;
	timeDateTextElement.style.cssText = css.cssTimeDateTextElement;
};

export const renderOnThisDayAPI = function (data) {
	onThisDayContainer.innerHTML = `
      <span style="font-weight: bold">Did you know that on this day in ${
			data.year
		}....</span>
      <span>${data.text} Read more: ${data.pages
		.map(
			(item) =>
				`<a href="${item.content_urls.desktop.page}">${item.normalizedtitle}</a>`
		)
		.join(", ")}</span>
   `;
};

export const renderWordOfTheDayAPI = function (data) {
	wordOfTheDayContainer.innerHTML = `
      <p style="font-weight: bold">Word Of The Day: ${data.word}</p>
      <span> ${data.definitions[0].text}</span>
      <a href="https://wordnik.com/words/${data.word}">Learn more about this word on Wordnik</a>
   `;
};
