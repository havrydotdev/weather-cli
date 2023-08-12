#!/usr/bin/env node
import { getArgs } from "./helpers/args.js";
import { getWeather } from "./services/api.service.js";
import { printHelp, printSuccess, printError } from "./services/log.service.js";
import { saveKeyValue, TOKEN_DICTIONARY } from "./services/storage.service.js";

const saveToken = async (token) => {
    if (!token.length) {
        printError("Token is not provided");
        return;
    }

    try {
        await saveKeyValue(TOKEN_DICTIONARY.token, token);
        printSuccess("Token saved");
    } catch (e) {
        printError(e.message);
    }
};

const initCLI = () => {
    const args = getArgs(process.argv);
    if (args.h) {
        // Print help text
        printHelp();
    }
    if (args.s) {
        // Save city
    }
    if (args.t) {
        // Save token
        return saveToken(args.t);
    }
    getWeather("kharkiv");
    // Print weather
};

initCLI();
