import axios from "axios";
import { API_PROXY_SERVER_URL } from "./config";

export const state = {
	backgroundImage: {},
	geoLocation: {},
	locale: navigator.language,
	onThisDayAPI: {},
};

//TODO: get img url from remote node server
export const getAuthorizedData = async function (url, api) {
	try {
		const encodedURL = encodeURIComponent(url);

		return getData(API_PROXY_SERVER_URL + api + "?url=" + encodedURL);
	} catch (error) {
		throw error;
	}
};

// general fetch funktion med axios
export const getData = async function (url) {
	try {
		const response = await axios.get(url);

		if (!response.status === 200)
			throw new Error(response.statusText + response.status);

		return response.data;
	} catch (error) {
		throw error;
	}
};

export const loadBackgroundImage = async function (url) {
	try {
		// get collection of images
		state.backgroundImage.fullData = await getAuthorizedData(
			url,
			"/unsplash/"
		);

		// choose random image
		const random = Math.floor(Math.random() * 30);
		state.backgroundImage.currentBackground =
			state.backgroundImage.fullData[random];
	} catch (error) {
		throw error;
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

		const data = await getData(fullURL);
		const numberOfArticles = data.onthisday.length;
		const random = Math.floor(Math.random() * numberOfArticles);

		state.onThisDayAPI = data.onthisday[random];
	} catch (error) {
		throw error;
	}
};

export const loadWordOfTheDayAPI = async function (url) {
	try {
		const date = new Date();
		const year = date.getFullYear();
		const month = (date.getMonth() + 1).toString().padStart(2, "0");
		const day = date.getDate().toString().padStart(2, "0");

		const fullURL = url + year + "-" + month + "-" + day;

		const data = await getAuthorizedData(fullURL, "/wordoftheday/");

		state.wordOfTheDayAPI = data;
	} catch (error) {
		throw error;
	}
};
