const cityInput = document.getElementById('city-input');
const searchBtn = document.getElementById('search-btn');
const weatherResult = document.getElementById('weather-result');
const errorMessage = document.getElementById('error-message');

async function getWeatherData(city) {
    try {
        const resposta = await fetch(`https://api.weatherapi.com/v1/current.json?key=5e0aaa1f5a874060921173810250908&q=${city}&lang=pt`);
        
        if (!resposta.ok) {
            throw new Error('Cidade não encontrada ou erro na API');
        }

        const dadosClima = await resposta.json();
        console.log(dadosClima);

        renderWeatherData(dadosClima);

    } catch (erro) {
        console.error('Erro ao buscar o clima:', erro.message);
        weatherResult.classList.add('hidden');
        errorMessage.classList.remove('hidden');
        errorMessage.querySelector('p').textContent = erro.message;
    }
}

function renderWeatherData(weatherData) {
    // Preenche os campos do HTML com os dados recebidos
    document.getElementById('city-name').textContent = `${weatherData.location.name} - ${weatherData.location.country}`;
    document.getElementById('local-time').textContent = `Horário local: ${weatherData.location.localtime}`;
    document.getElementById('weather-icon').src = `https:${weatherData.current.condition.icon}`;
    document.getElementById('weather-icon').alt = weatherData.current.condition.text;
    document.getElementById('temperature').textContent = `${weatherData.current.temp_c} °C`;
    document.getElementById('condition').textContent = weatherData.current.condition.text;
    document.getElementById('feels-like').textContent = `${weatherData.current.feelslike_c} °C`;
    document.getElementById('humidity').textContent = `${weatherData.current.humidity} %`;
    document.getElementById('wind-speed').textContent = `${weatherData.current.wind_kph} km/h`;
    document.getElementById('pressure').textContent = `${weatherData.current.pressure_mb} hPa`;
    document.getElementById('visibility').textContent = `${weatherData.current.vis_km} km`;
    document.getElementById('uv-index').textContent = weatherData.current.uv;

    // Mostra o resultado e esconde o erro
    weatherResult.classList.remove('hidden');
    errorMessage.classList.add('hidden');
}

// Evento do botão
searchBtn.addEventListener('click', () => {
    const cityName = cityInput.value.toLowerCase().trim();

    if (cityName) {
        getWeatherData(cityName);
    }
});
