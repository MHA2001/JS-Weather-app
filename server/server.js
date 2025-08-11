const express = require('express');
const axios = require('cors');
const cors = require('cors');
require('dotenv').config();
const weatherData = require('./example.json');
const app = express();

app.use(express.urlencoded({ extends: true }));
app.use(cors());
app.get('/weather', (req, res) => {
	const { lat, lon } = req.query;

	if (!lat || !lon) {
		return res.status(400).json({ error: 'Missing lat or lon parameter' });
	}

	res.json({
		current: parseCurrentWeather(weatherData),
		daily: parseDailyWeather(weatherData),
		hourly: parseHourlyWeather(weatherData),
	});

	// the api now need paid subscription
	// axios
	// 	.get(`./example.json`, {
	// 		params: {
	// 			lat,
	// 			lon,
	// 			appid: process.env.API_KEY,
	// 			units: 'imperial',
	// 		},
	// 	})
	// 	.then(({ data }) => {
	// 		res.json(data);
	// 	})
	// 	.catch((e) => {
	// 		console.log(e);
	// 		res.sendStatus(500);
	// 	});
});

function parseCurrentWeather({ current, daily }) {
	const { temp: currentTemp, weather, wind_speed } = current;
	const { pop, temp, feels_like } = daily[0];
	return {
		currentTemp: Math.round(currentTemp),
		hightTemp: Math.round(temp.max),
		lowTemp: Math.round(temp.min),
		hightFeelsLike: Math.round(Math.max(...Object.values(feels_like))),
		lowFeelsLike: Math.round(Math.min(...Object.values(feels_like))),
		windSpeed: Math.round(wind_speed),
		precip: Math.round(pop * 100),
		icon: weather[0].icon,
		description: weather[0].description,
	};
}
function parseDailyWeather({ daily }) {
	return daily.slice(1).map((day) => {
		return {
			timestamp: day.dt * 1000,
			icon: day.weather[0].icon,
			temp: Math.round(day.temp.day),
		};
	});
}

const HOUR_IN_SECONDS = 3600;
function parseHourlyWeather({ hourly, current }) {
	return hourly
		.filter((hour) => hour.dt > current.dt - HOUR_IN_SECONDS)
		.map((hour) => {
			return {
				timestamp: hour.dt * 1000,
				icon: hour.weather[0].icon,
				temp: Math.round(hour.temp),
				feelsLike: Math.round(hour.feels_like),
				windSpeed: Math.round(hour.wind_speed),
				precip: Math.round(hour.pop * 100),
			};
		});
}

app.listen(3001);
