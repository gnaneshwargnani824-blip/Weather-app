function getWeather() {
    const location = document.getElementById("locationInput").value;
    const result = document.getElementById("weatherResult");

    if (!location) {
        result.innerHTML = "Enter a city name";
        return;
    }

    fetch(`http://localhost:5000/weather?q=${location}`)
        .then(res => res.json())
        .then(data => {
            if (data.error) {
                result.innerHTML = data.error;
            } else {
                result.innerHTML = `
                    <h3>${data.location.name}</h3>
                    <p>🌡 ${data.current.temp_c} °C</p>
                    <p>${data.current.condition.text}</p>
                `;
            }
        });
}
