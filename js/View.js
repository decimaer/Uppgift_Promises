export const renderBackgroundImage = function (url) {
	document.body.style.backgroundImage = `url('${url}')`;
	document.body.style.backgroundSize = "cover";
};

export const getGeolocation = function (success) {
	navigator.geolocation.getCurrentPosition(success);
};
