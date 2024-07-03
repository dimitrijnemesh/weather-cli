#!/usr/bin/env node
import { getArgs } from "./helpers/args.js"
import { getIcon, getWeather } from "./services/api.service.js"
import {
  printHelp,
  printSucces,
  printError,
  printWeather,
} from "./services/log.service.js"
import {
  getKeyValue,
  saveKeyValue,
  TOKEN_DICTIONARY,
} from "./services/storage.service.js"

const saveToken = async (token) => {
  if (!token.length) {
    printError("Token wasn't set")
    return
  }
  try {
    await saveKeyValue(TOKEN_DICTIONARY.token, token)
    printSucces("Token was saved")
  } catch (e) {
    console.log(e.message)
  }
}

const saveCity = async (city) => {
  if (!city.length) {
    printError("City wasn't set")
    return
  }
  try {
    await saveKeyValue(TOKEN_DICTIONARY.city, city)
    printSucces("City was saved")
  } catch (e) {
    console.log(e.message)
  }
}

const getForecast = async () => {
  try {
    const weather = await getWeather()
    printWeather(weather, getIcon(weather.weather[0].icon))
  } catch (e) {
    if (e?.response?.status === 404) {
      printError("Wrong name of city")
    } else if (e?.response?.status === 401) {
      printError("Wrong token")
    } else {
      printError(e.message)
    }
  }
}

const initCli = async () => {
  const args = getArgs(process.argv)
  if (args.h) {
    return printHelp()
  }
  if (args.s) {
    await saveCity(args.s)
  }
  if (args.t) {
    await saveToken(args.t)
  }
  return getForecast()
  //   return the weather
}

initCli()
