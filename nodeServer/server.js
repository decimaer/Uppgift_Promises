import http from "http";
import axios from "axios";
import fs from "fs";

import { unsplashAPIKey, weatherAPIKey, wordnikAPIKey } from "./apiKeys.mjs";

const logFile = "/usr/local/www/node/server-log";

const responseHeader = {
	"Content-type": "application/json",
	"Access-Control-Allow-Origin": "*",
};

const getData = async function (url) {
	try {
		const response = await axios.get(url, {
			transformResponse: (res) => {
				return res;
			},
			responseType: "json",
		});
		return response.data;
	} catch (error) {
		throw error;
	}
};

const serverHandler = async function (request, response) {
	try {
		const path = new URL(request.url, "http://oblako.dufberg.se:81");

		if (path.pathname === "/unsplash/") {
			const sourceURL =
				decodeURIComponent(path.searchParams.get("url")) + unsplashAPIKey;
			console.log(sourceURL);

			const data = await getData(sourceURL);

			response.writeHead(200, responseHeader);
			response.end(data);
		} else if (path.pathname === "/openweathermap/") {
			const sourceURL =
				decodeURIComponent(path.searchParams.get("url")) + weatherAPIKey;
			console.log(sourceURL);

			const data = await getData(sourceURL);

			response.writeHead(200, responseHeader);
			response.end(data);
		} else if (path.pathname === "/wordoftheday/") {
			const sourceURL =
				decodeURIComponent(path.searchParams.get("url")) +
				"&api_key=" +
				wordnikAPIKey;
			console.log(sourceURL);

			const data = await getData(sourceURL);

			response.writeHead(200, responseHeader);
			response.end(data);
		} else {
			throw new Error(
				`User request unavailable: ${path.pathname} @ ${path}`
			);
		}
	} catch (error) {
		response.writeHead(404, responseHeader);
		response.end(
			JSON.stringify({
				error: `${error}`,
			})
		);

		fs.appendFile(logFile, `\n${new Date()}: ${error}`, "utf-8", () => {});
	}
};

const server = http.createServer(serverHandler);

server.listen(80, "oblako.dufberg.se", () => {
	console.log("Node JS server listening to port 80");
});
