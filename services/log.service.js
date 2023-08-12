import chalk from "chalk";
import dedent from "dedent";

const printError = (error) => {
    console.log(chalk.bgRed(" ERROR ") + " " + error);
};

const printSuccess = (message) => {
    console.log(chalk.bgGreen(" SUCCESS ") + " " + message);
};

const printHelp = () => {
    console.log(
        dedent`${chalk.bgCyan(" HELP ")}
        Without paramaters - print weather
        -s [CITY] for setting city
        -h for printing help message
        -t [API_KEY] for saving token
        `
    );
};

const printWeather = (res, icon) => {
    console.log(
        dedent`${chalk.bgYellow(" WEATHER ")} Weather in ${res.name}
        ${icon}  ${res.weather[0].description}
        Temperature: ${res.main.temp} (feels like ${res.main.feels_like})
        Humidity: ${res.main.humidity}
        Wind speed: ${res.wind.speed}
        `
    );
};

export { printError, printSuccess, printHelp, printWeather };
