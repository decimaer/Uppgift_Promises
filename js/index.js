import * as model from "./model";
import * as view from "./View";
import { UNSPLASH_API_URL } from "./config";

//TODO: function to set background img and author credits (possibly changing every n seconds?)
const controlSetBackgroundImage = async function () {
	try {
		const data = await model.getData(UNSPLASH_API_URL);
		console.log(data);

		const imageURL = data.data[0].urls.full;
		console.log(imageURL);
		view.renderBackgroundImage(imageURL);
	} catch (error) {
		console.error(error);
	}
};

//TODO: weather api function
const controlGetGeolocation = function () {
	// &lat=${lat}&lon=${lon}
};
const controlSetWeather = async function () {};

//TODO: current date and time function

//TODO: Other API 1

//TODO: Other API 2

controlSetBackgroundImage();
