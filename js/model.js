import axios from "axios";

export const state = {};

//TODO: get img url from remote node server

// general fetch funktion med axios
export const getData = async function (url) {
	try {
		return await axios.get(url);
	} catch (error) {
		console.error(error);
	}
};
