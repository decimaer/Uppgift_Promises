const http = require("http");
const axios = require("axios");
const url = require("url");
const fs = require("fs");

const unsplashAPIKey = "j-zMGC9DSdNwckUvHCyKnbObujQDpIoMlz7R1z1pTBQ";
const weatherAPIKey = "cf884975fe56a901fb868d0f0d730477";

const getData = async function (url) {
	try {
		return await axios.get(url, {
			transformResponse: (res) => {
				return res;
			},
			responseType: "json",
		});
	} catch (error) {
		console.error(error);
	}
};

const server = http.createServer(async (request, response) => {
	const path = new URL(request.url, "http://localhost:8000/");

	if (path.pathname === "/unsplash") {
		const sourceURL = decodeURIComponent(
			path.searchParams.get("url") + unsplashAPIKey
		);
		console.log(sourceURL);

		const obj = await getData(sourceURL);
		// const { keys, values } = Object.entries(obj);
		// console.log(keys, values);
		// for (const [key, value] of Object.entries(obj)) {
		// 	console.log(`${key}: ${value}`);
		// }
		// console.log(obj.data);
		response.writeHead(200, { "Content-type": "application/json" });
		response.end(obj.data);
	}
	if (path.pathname === "/openweathermap") {
		const sourceURL = decodeURIComponent(
			path.searchParams.get("url") + weatherAPIKey
		);
		console.log(sourceURL);

		const obj = await getData(sourceURL);

		response.writeHead(200, { "Content-type": "application/json" });
		response.end(obj.data);
	} else {
		response.writeHead(404);
		response.end("<h1>Error 404 - file not found!</h1>");
	}
});

server.listen(8000, "localhost", () => {
	console.log("server listening...");
});
