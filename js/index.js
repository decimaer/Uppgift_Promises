import * as model from "./model";
import * as view from "./View";
import { initIntersectionObserver as preloaderGallery } from "./preloaderGallery";

import {
	UNSPLASH_API_URL,
	WEATHER_API_URL,
	ON_THIS_DAY_API_URL,
	WORD_OF_THE_DAY_API_URL,
} from "./config";

//TODO: function to set background img and author credits (possibly changing every n seconds?)
const controlSetBackgroundImage = async function () {
	try {
		// create event
		const event = new Event("imageDataLoaded");

		// load image data
		await model.loadBackgroundImage(UNSPLASH_API_URL);

		// emit event when data is loaded
		document.dispatchEvent(event);

		const imageURL = model.state.backgroundImage.currentBackground.urls.full;
		const altText =
			model.state.backgroundImage.currentBackground.alt_description;
		view.renderBackgroundImage(
			model.state.backgroundImage.currentBackground.urls.full,
			model.state.backgroundImage.currentBackground.alt_description
		);

		view.renderImageCredit(
			model.state.backgroundImage.currentBackground.user
		);

		console.info("Background loaded");
	} catch (error) {
		console.error(error);
	}
};

//TODO: weather api function
const controlSetWeather = async function (pos) {
	try {
		const {
			coords: { latitude, longitude },
		} = await pos;

		model.state.geoLocation = {
			lat: latitude,
			lon: longitude,
		};

		// store data
		model.state.weatherData = await model.getAuthorizedData(
			`${WEATHER_API_URL}&lat=${latitude}&lon=${longitude}&appid=`,
			"/openweathermap/"
		);

		//render weather
		view.renderWeather(model.state.weatherData);

		console.info("Weather API loaded");
	} catch (error) {
		console.error(error);
	}
};

const controlGetGeolocation = function () {
	view.getGeolocation((pos) => {
		controlSetWeather(pos);
	});
};

//TODO: current date and time function
const controlTimeDate = function () {
	model.dateTime(view.renderTimeDate);
};

//TODO: Other API 1: on this day - picks randomly one of the available 'on this day' articles from wikipedia
//https://en.wikipedia.org/api/rest_v1/feed/featured/2023/01/19

const controlOnThisDayAPI = async function () {
	try {
		await model.loadOnThisDayAPI(ON_THIS_DAY_API_URL);

		view.renderOnThisDayAPI(model.state.onThisDayAPI);

		console.info("On this day API loaded");
	} catch (error) {
		console.error(error);
	}
};

//TODO: Other API 2: wordnik
const controlWordOfTheDay = async function () {
	try {
		await model.loadWordOfTheDayAPI(WORD_OF_THE_DAY_API_URL);

		view.renderWordOfTheDayAPI(model.state.wordOfTheDayAPI);

		console.info("Word of the day API loaded");
	} catch (error) {
		console.error(error);
	}
};

controlGetGeolocation();
controlSetBackgroundImage();
controlTimeDate();
controlOnThisDayAPI();
controlWordOfTheDay();

// gallery can only be initiated when image data is loaded
document.addEventListener("imageDataLoaded", preloaderGallery);
