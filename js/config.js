export const UNSPLASH_API_URL = `https://api.unsplash.com/topics/wallpapers/photos/?orientation=landscape&per_page=30&client_id=`;
export const WEATHER_API_URL = `https://api.openweathermap.org/data/2.5/weather?units=metric`;
export const ON_THIS_DAY_API_URL =
	"https://en.wikipedia.org/api/rest_v1/feed/featured/";
export const WORD_OF_THE_DAY_API_URL =
	"https://api.wordnik.com/v4/words.json/wordOfTheDay?date=";
export const API_PROXY_SERVER_URL = "http://oblako.dufberg.se:81";

// Error handling
import bkgImagePath from "url:../img/photo-1573996987033-47fd3a4ca35e.jpeg";
export const ERROR_BKG_IMAGE = bkgImagePath;
export const ERROR_IMAGE_ALT = "town on hill covered with snow";
export const ERROR_IMAGE_CREDITS = {
	name: "Visit Greenland",
	links: {
		self: "https://api.unsplash.com/users/visitgreenland",
	},
	profile_image: {
		medium:
			"https://images.unsplash.com/profile-1666964217102-88b68120c4ffimage?ixlib=rb-4.0.3\u0026crop=faces\u0026fit=crop\u0026w=64\u0026h=64",
	},
};
