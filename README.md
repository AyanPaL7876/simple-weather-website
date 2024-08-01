# Weather App

A simple weather application built with React that provides weather information based on the city entered. It displays current weather details including temperature, weather type, feels like temperature, wind speed, humidity, and air pressure. Additionally, it shows sunrise and sunset times.

## Live Demo

You can view the live version of the [Weather App](https://simple-weather-website-eight.vercel.app/).

## Features

- Search for weather by city name
- Display current weather conditions including temperature, weather type, and feels like temperature
- Show wind speed, humidity, and air pressure
- Display sunrise and sunset times

## Technologies Used

- React
- CSS for styling
- OpenWeatherMap API for weather data

## Setup and Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/yourusername/weather-app.git
    ```

2. Navigate to the project directory:

    ```bash
    cd weather-app
    ```

3. Install the dependencies:

    ```bash
    npm install
    ```

4. Create a `.env` file in the root of the project and add your OpenWeatherMap API key:

    ```env
    VITE_API_KEY=your_api_key_here
    ```

5. Start the development server:

    ```bash
    npm start
    ```

6. Open `http://localhost:3000` in your browser to view the application.

## Usage

- Enter a city name in the search input field and click the search button or press Enter.
- The application will fetch and display the weather information for the entered city.

## API

The application uses the OpenWeatherMap API to fetch weather data. Make sure to sign up and get an API key from [OpenWeatherMap](https://openweathermap.org/api).
