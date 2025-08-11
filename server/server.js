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

	res.json(weatherData);

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

app.listen(3001);
