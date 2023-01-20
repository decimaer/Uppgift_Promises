import * as model from "./model";
import * as view from "./View";
import { UNSPLASH_API_URL, WEATHER_API_URL } from "./config";

//TODO: function to set background img and author credits (possibly changing every n seconds?)
const controlSetBackgroundImage = async function () {
	try {
		await model.loadBackgroundImage();

		const imageURL = model.state.backgroundImage.currentBackground.urls.full;
		const altText =
			model.state.backgroundImage.currentBackground.alt_description;
		console.log(model.state.backgroundImage.currentBackground);
		view.renderBackgroundImage(
			model.state.backgroundImage.currentBackground.urls.full,
			model.state.backgroundImage.currentBackground.alt_description
		);

		view.renderImageCredit(
			model.state.backgroundImage.currentBackground.user
		);
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
		model.state.weatherData = await model.getData(
			`${WEATHER_API_URL}&lat=${latitude}&lon=${longitude}`
		);

		console.log(latitude, longitude);
		console.log(model.state);
		console.log(model.state.weatherData);

		//render weather
		view.renderWeather(model.state.weatherData);
	} catch (error) {
		console.error(error);
	}
};

const controlGetGeolocation = function () {
	view.getGeolocation((pos) => {
		// controlSetWeather(Promise.resolve(pos));
		controlSetWeather(pos);
	});

	// const pos2 = await pos;
	// console.log(pos2);
	//
};

//TODO: current date and time function
const controlTimeDate = function () {
	model.dateTime(view.renderTimeDate);
};

//TODO: Other API 1

//TODO: Other API 2

controlGetGeolocation();
controlSetBackgroundImage();
controlTimeDate();
