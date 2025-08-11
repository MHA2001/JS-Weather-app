import axios from 'axios';

navigator.geolocation.getCurrentPosition(positionSuccess, positionError);

function positionError() {
	alert(
		'There was an error getting your location to use your and refresh the page. '
	);
}
function positionSuccess({ coords }) {
	getWeather(coords.latitude, coords.longitude);
}

function getWeather(lat, lon) {
	axios
		.get('http://localhost:3001/weather', {
			params: {
				lat,
				lon,
				exclude: 'minutely, alerts',
			},
		})
		.then((res) => {
			renderWeather(res.data);
		})
		.catch((e) => {
			console.log(e);
			alert('Error getting weather. pleas try again');
		});
}

function renderWeather({ current, daily, hourly }) {
	document.body.classList.remove('blurred');
	renderCurrentWeather(current);
	renderHourlyWeather(hourly);
	renderDailyWeather(daily);
}

function setValue(selector, value) {
	document.querySelector(`[data-${selector}]`).textContent = value;
}

function getIconUrl(icon, { large = false } = {}) {
	const size = large ? '@2x' : '';
	return `http://openweathermap.org/img/wn/${icon}${size}.png`;
}

const currentIcon = document.querySelector('[data-current-icon]');
function renderCurrentWeather(current) {
	currentIcon.src = getIconUrl(current.icon, { large: true });
	setValue('current-temp', current.currentTemp);
	setValue('current-hight', current.hightTemp);
	setValue('current-low', current.lowTemp);
	setValue('current-fl-low', current.lowFeelsLike);
	setValue('current-fl-hight', current.hightFeelsLike);
	setValue('current-wind', current.windSpeed);
	setValue('current-precip', current.precip);
	setValue('current-description', current.description);
}
function renderDailyWeather(daily) {}
function renderHourlyWeather(hourly) {}
