import axios from "axios";
import { UNSPLASH_API_URL, ON_THIS_DAY_API_URL } from "./config";

export const state = {
	backgroundImage: {},
	geoLocation: {},
	locale: navigator.language,
	onThisDayAPI: {},
};

//TODO: get img url from remote node server
export const getAuthorizedData = async function (url) {
	try {
		const encodedURL = encodeURIComponent(url);

		return await getData();
	} catch (error) {}
};

// general fetch funktion med axios
export const getData = async function (url) {
	try {
		return await axios.get(url);
	} catch (error) {
		console.error(error);
	}
};

export const loadBackgroundImage = async function (url) {
	try {
		// get collection of images
		state.backgroundImage.fullData = await getData(url);

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

export const loadOnThisDayAPI = async function (url) {
	try {
		const date = new Date();
		const year = date.getFullYear();
		const month = (date.getMonth() + 1).toString().padStart(2, "0");
		const day = date.getDate().toString().padStart(2, "0");

		const fullURL = url + year + "/" + month + "/" + day;
		console.log(fullURL);

		const data = await getData(fullURL);
		console.log(data);
		const numberOfArticles = data.data.onthisday.length;
		const random = Math.floor(Math.random() * numberOfArticles);
		console.log(random);

		state.onThisDayAPI = data.data.onthisday[random];

		console.log(state.onThisDayAPI);
	} catch (error) {
		console.error(error);
	}
};
