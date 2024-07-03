import chalk from "chalk"
import dedent from "dedent-js"

const printError = (error) => {
  console.log(`${chalk.bgRed(" ERROR ")} ${error}`)
}

const printSucces = (message) => {
  console.log(`${chalk.bgGreen(" SUCCES ")} ${message}`)
}

const printHelp = () => {
  console.log(
    dedent`${chalk.bgCyan(" HELP ")}
        Whithout parameters - weather output
        -s [CITY] for set city
        -h for help
        -t [API_KEY] for set token`
  )
}

const printWeather = (res, icon) => {
  console.log(
    dedent`${chalk.bgYellow(" WEATHER ")} Weather in city ${res.name}
            ${icon}  ${res.weather[0].description}
            Temperature: ${res.main.temp} (feels like: ${res.main.feels_like})
            Humidity: ${res.main.humidity}%
            Wind speed: ${res.wind.speed}`
  )
}

export { printError, printSucces, printHelp, printWeather }
