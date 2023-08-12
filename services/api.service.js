import { getKeyValue, TOKEN_DICTIONARY } from "./storage.service.js";
import axios from "axios";
import { printError, printWeather } from "./log.service.js";

const getIcon = (icon) => {
    switch (icon.slice(0, -1)) {
        case "01":
            return "☀️";
        case "02":
            return "🌤️";
        case "03":
            return "☁️";
        case "04":
            return "☁️";
        case "09":
            return "🌧️";
        case "10":
            return "🌦️";
        case "11":
            return "🌩️";
        case "13":
            return "❄️";
        case "50":
            return "🌫️";
    }
};

const getWeather = async (city) => {
    const token =
        process.env.TOKEN ?? (await getKeyValue(TOKEN_DICTIONARY.token));
    if (!token) {
        throw new Error(
            "Token is not provided. Set it via command: -t [API_KEY]"
        );
    }

    const { data } = await axios.get(
        "https://api.openweathermap.org/data/2.5/weather",
        {
            params: {
                q: city,
                appid: token,
                lang: "en",
                units: "metric",
            },
        }
    );
    return data;
};

const getForecast = async (city) => {
    try {
        const weather = await getWeather(city);
        printWeather(weather, getIcon(weather.weather[0].icon));
    } catch (e) {
        if (e?.response?.status == 404) {
            printError("Incorrect city!");
        } else if (e?.response?.status == 401) {
            printError("Incorrect token!");
        } else {
            printError(e.message);
        }
    }
};

export { getWeather, getForecast };
