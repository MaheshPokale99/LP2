function getWeather() {
    const cityName = document.getElementById('cityName').value.trim();

    // Check if the city name is not empty
    if (!cityName) {
        alert('Please enter a city name');
        return;
    }

    // Create a new XMLHttpRequest object to make the AJAX call
    const xhr = new XMLHttpRequest();

    // Open the connection to the local JSON file (assuming it's in the same directory)
    xhr.open('GET', 'weatherData.json', true);

    // Set up the function to execute when the request is complete
    xhr.onload = function () {
        if (xhr.status === 200) {
            // Parse the JSON data from the local file
            const weatherData = JSON.parse(xhr.responseText);

            // If the city is found in the local data, display it
            if (weatherData[cityName]) {
                displayWeather(weatherData[cityName], cityName);
            } else {
                alert('City not found');
            }
        } else {
            alert('Error fetching weather data');
        }
    };

    // Send the AJAX request
    xhr.send();
}

function displayWeather(data, cityName) {
    // Get the elements to update with the weather data
    const city = document.getElementById('city');
    const temperature = document.getElementById('temperature');
    const weather = document.getElementById('weather');
    const humidity = document.getElementById('humidity');
    const windSpeed = document.getElementById('windSpeed');
    const weatherContainer = document.getElementById('weatherContainer');

    // Update the elements with the fetched weather data
    city.textContent = cityName;
    temperature.textContent = data.temperature + '°C';
    weather.textContent = data.weather;
    humidity.textContent = data.humidity + '%';
    windSpeed.textContent = data.windSpeed + ' km/h';

    // Show the weather data container
    weatherContainer.style.display = 'block';
}




// function getWeather() {
//     const cityName = document.getElementById('cityName').value.trim();
    
//     // Check if the city name is not empty
//     if (!cityName) {
//         alert('Please enter a city name');
//         return;
//     }

//     // Simulate AJAX-like request (searching for city in the local data)
//     setTimeout(() => {
//         if (weatherData[cityName]) {
//             displayWeather(weatherData[cityName], cityName);
//         } else {
//             alert('City not found in local data');
//         }
//     }, 500);
// }