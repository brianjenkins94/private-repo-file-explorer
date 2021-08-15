#!/usr/bin/env node

import { unescape } from "querystring";
import * as fs from "fs";
import * as path from "path";
import * as portFinder from "portfinder";
import ejs from "ejs";
import express from "express";
import helmet from "helmet";
import logger from "morgan";
import open from "open";

const server = express();

server.use(helmet({
	"contentSecurityPolicy": false
}));

server.set("json spaces", 4);

server.use(logger("dev"));

let username = "";
let repository = "";
let description = "";

const packageJsonFile = path.join(process.cwd(), "package.json");

if (fs.existsSync(packageJsonFile)) {
	const parsedPackageJson = JSON.parse(fs.readFileSync(packageJsonFile, { "encoding": "utf8" }));

	if (parsedPackageJson?.["repository"]?.["url"] !== undefined) {
		const matches = new URL(parsedPackageJson["repository"]["url"]).pathname.split("/");

		username = matches[1];
		repository = path.basename(matches[2], path.extname(matches[2]));
	}

	if (parsedPackageJson["description"] !== undefined) {
		description = parsedPackageJson["description"];
	}
}

const basePath = process.cwd();

server.get("/", async function(request, response) {
	response.send(await ejs.renderFile(path.join(__dirname, "index.html"), {
		"username": username,
		"repository": repository,
		"description": description,
		"hasReadme": fs.existsSync(path.join(basePath, "README.md")),
		"hasLicense": fs.existsSync(path.join(basePath, "LICENSE"))
	}));
});

server.get("*", function(request, response, next) {
	const fullPath = path.join(basePath, unescape(request.path.replace("/~", "")));

	if (path.resolve(fullPath).startsWith(basePath)) {
		if (fs.existsSync(fullPath)) {
			if (fs.statSync(fullPath).isFile()) {
				response.sendFile(fullPath);
			} else if (!(fullPath.endsWith("/") || fullPath.endsWith("\\"))) {
				response.redirect(request.path + "/");
			} else if (request.path.startsWith("/~/")) {
				const files = [];
				const folders = [];

				for (const file of fs.readdirSync(fullPath)) {
					if (fs.statSync(path.join(fullPath, file)).isFile()) {
						files.push(file);
					} else {
						folders.push(file);
					}
				}

				response.json({
					"files": files,
					"folders": folders
				});
			}

			return;
		}
	}

	response.status(404);

	next();
});

portFinder.getPort(function(error, port) {
	if (error) {
		throw error;
	}

	server.listen(port, function() {
		const url = "http://localhost:" + this.address().port + "/";

		console.log("Listening on " + url);

		open(url);
	});
});
