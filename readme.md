# Weather App

A full-stack web application that fetches and displays weather data based on the user's current location.

---

## Purpose of the Project

This project was built to demonstrate a full-stack architecture using a client-side front-end and a separate Node.js back-end. It focuses on asynchronous data fetching, API integration, and rendering dynamic content on a web page.

## Technology Stack

### Client (Front-End)
- **HTML5:** For the application's structure.
- **CSS3:** For styling and layout, including a responsive design.
- **Vanilla JavaScript (ES6+):** For handling user location, fetching data from the server, and dynamically updating the UI.
- **Vite:** A build tool used for a fast development experience.
- **Axios:** A promise-based HTTP client for making API requests.
- **date-fns:** A library for formatting dates and times.

### Server (Back-End)
- **Node.js:** The runtime environment for the server.
- **Express:** A web framework for handling API routes.
- **Axios:** For making requests to the external weather API.
- **dotenv:** To manage environment variables (e.g., the API key).
- **CORS:** To handle cross-origin requests from the client.

---

## Features
* **Real-time Weather:** Fetches and displays current weather conditions.
* **Daily and Hourly Forecasts:** Provides a detailed breakdown of the weather for the upcoming days and hours.
* **Location-Based:** Automatically gets the user's location to provide relevant weather data.
* **Persistent API Key:** The API key is stored securely in a `.env` file, keeping it out of the public codebase.
* **Error Handling:** Gracefully handles errors when fetching location or weather data.

---

## Important Decisions
* **Client-Server Architecture:** The project is split into a client and a server. This separation of concerns allows the server to handle the sensitive API key and business logic, while the client focuses purely on the user interface.
* **Asynchronous Data Handling:** All data fetching, from getting the user's location to requesting weather data from the server, is handled asynchronously using Promises and `async/await`. This prevents the application from freezing while waiting for data to load.
* **Modular Code:** The code is organized into separate files (`script.js`, `server.js`) to keep the logic clean and maintainable.

---

## Problems & Solutions

### Roadblock: Exposing the API key.
* **Problem:** Placing the API key directly in the client-side JavaScript would expose it to the public, posing a security risk.
* **Solution:** I implemented a Node.js server to act as a proxy. The client requests weather data from our server, which then securely makes the request to the external weather API using the API key from a `.env` file. The server then sends the filtered data back to the client.

---

## Future Enhancements
* Allow users to search for weather in a specific location by city name.
* Add more detailed weather information (e.g., humidity, pressure, visibility).
* Implement a dark mode or other theme options.
* Use a more persistent database for caching weather data to reduce API calls.