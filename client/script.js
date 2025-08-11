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
		.then((res) => console.log(res.data));
}
