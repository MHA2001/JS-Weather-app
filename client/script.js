import axios from 'axios';
import { format } from 'date-fns';
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

function setValue(selector, value, { parent = document } = {}) {
	parent.querySelector(`[data-${selector}]`).textContent = value;
}

function getIconUrl(icon, { large = false } = {}) {
	const size = large ? '@2x' : '';
	return `http://openweathermap.org/img/wn/${icon}${size}.png`;
}

function formatDate(timestamp) {
	return format(new Date(timestamp), 'eeee');
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

const dailySection = document.querySelector('[data-day-section]');
const dayCardTemplate = document.getElementById('day-card-template');
function renderDailyWeather(daily) {
	dailySection.innerHTML = '';
	daily.forEach((day) => {
		const element = dayCardTemplate.content.cloneNode(true);
		setValue('temp', day.temp, { parent: element });
		setValue('date', formatDate(day.timestamp), { parent: element });
		element.querySelector('[data-icon]').src = getIconUrl(day.icon);
		dailySection.append(element);
	});
}
function renderHourlyWeather(hourly) {}
