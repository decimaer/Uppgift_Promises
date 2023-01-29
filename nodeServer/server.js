import http from "http";
import axios from "axios";
import fs from "fs";

import { unsplashAPIKey, weatherAPIKey, wordnikAPIKey } from "./apiKeys.mjs";

const responseHeader = {
	"Content-type": "application/json",
	"Access-Control-Allow-Origin": "*",
};

const getData = async function (url) {
	try {
		return await axios.get(url, {
			transformResponse: (res) => {
				return res;
			},
			responseType: "json",
		});
	} catch (error) {
		throw error;
	}
};

const serverHandler = async function (request, response) {
	try {
		// await fs.writeFile(
		// 	"/usr/local/www/node/log",
		// 	`Request initiated with: ${request}`,
		// 	"utf-8",
		// 	() => {}
		// );

		const path = new URL(request.url, "http://oblako.dufberg.se:81");

		if (path.pathname === "/unsplash/") {
			const sourceURL =
				decodeURIComponent(path.searchParams.get("url")) + unsplashAPIKey;
			console.log(sourceURL);

			const obj = await getData(sourceURL);

			response.writeHead(200, responseHeader);
			response.end(obj.data);
		} else if (path.pathname === "/openweathermap/") {
			const sourceURL =
				decodeURIComponent(path.searchParams.get("url")) + weatherAPIKey;
			console.log(sourceURL);

			const obj = await getData(sourceURL);

			response.writeHead(200, responseHeader);
			response.end(obj.data);
		} else if (path.pathname === "/wordoftheday/") {
			const sourceURL =
				decodeURIComponent(path.searchParams.get("url")) +
				"&api_key=" +
				wordnikAPIKey;
			console.log(sourceURL);

			const obj = await getData(sourceURL);

			response.writeHead(200, responseHeader);
			response.end(obj.data);
		} else {
			// fs.writeFile("log", `Error 404`, "utf-8");
			response.writeHead(404);
			response.end("<h1>Error 404 - file not found!</h1>");
			throw new Error(
				`User request unavailable: ${path.pathname} @ ${path}`
			);
		}
	} catch (error) {
		// fs.writeFile("log", `${error}`, "utf-8", () => {});
		console.error(error);
	}
};

const server = http.createServer(serverHandler);

server.listen(80, "oblako.dufberg.se", () => {
	console.log("server listening...");
});
