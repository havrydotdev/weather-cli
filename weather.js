#!/usr/bin/env node
import { getArgs } from "./helpers/args.js";
import { getForecast } from "./services/api.service.js";
import { printHelp, printSuccess, printError } from "./services/log.service.js";
import {
    getKeyValue,
    saveCity,
    saveKeyValue,
    TOKEN_DICTIONARY,
} from "./services/storage.service.js";

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

const initCLI = async () => {
    const args = getArgs(process.argv);
    let city = null;
    if (args.h) {
        // Print help text
        printHelp();
    }
    if (args.s) {
        // Save city
        saveCity(args.s);
        city = args.s;
    }
    if (args.t) {
        // Save token
        return saveToken(args.t);
    }
    // Print forecast
    const cityFromConfig = await getKeyValue(TOKEN_DICTIONARY.city);
    if (!city && !cityFromConfig) {
        printError("You should provide city by using -s [CITY]");
        return;
    }

    getForecast(city ?? cityFromConfig);
};

initCLI();
