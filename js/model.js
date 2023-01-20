import axios from "axios";
import { UNSPLASH_API_URL } from "./config";

export const state = {
	backgroundImage: {},
	geoLocation: {},
	locale: navigator.language,
};

//TODO: get img url from remote node server

// general fetch funktion med axios
export const getData = async function (url) {
	try {
		return await axios.get(url);
	} catch (error) {
		console.error(error);
	}
};

export const loadBackgroundImage = async function () {
	try {
		// get collection of images
		state.backgroundImage.fullData = await getData(UNSPLASH_API_URL);

		// choose random image
		const random = Math.floor(Math.random() * 30);
		state.backgroundImage.currentBackground =
			state.backgroundImage.fullData.data[random];

		console.log(state.backgroundImage);
	} catch (error) {
		console.error(error);
	}
};

export const dateTime = function (callback) {
	const options = {
		year: "numeric",
		month: "long",
		day: "numeric",
		hour: "numeric",
		minute: "numeric",
		second: "numeric",
	};
	const formatedDateTime = new Intl.DateTimeFormat(state.locale, options);
	callback(formatedDateTime.format(new Date()));

	setInterval(() => {
		callback(formatedDateTime.format(new Date()));
	}, 1000);
};
