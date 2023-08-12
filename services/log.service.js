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

export { printError, printSuccess, printHelp };
