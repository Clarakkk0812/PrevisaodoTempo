// pegando dados do html para manipulação no JavaScript através do ID
const cityInput = document.getElementById('city-input');
const searchBtn = document.getElementById('search-btn');
const weatherResult = document.getElementById('weather-result');
const errorMessage = document.getElementById('error-message');

async function getWeatherData(city) { // Buscando os dados do clima com base na cidade
    try {
        const resposta = await fetch(`https://api.weatherapi.com/v1/current.json?key=5e0aaa1f5a874060921173810250908&q=${city}&lang=pt`); // Modo de conseguir os dados através da chave da API da conta que criei no aplicativo WeatherAPI
        
        if (!resposta.ok) { // Se a resposta não for OK, lança um erro
            throw new Error('Cidade não encontrada. Por favor, tente novamente.');
        }

        const dadosClima = await resposta.json(); // Converte a resposta em JSON
        console.log(dadosClima); // Mostra os dados no console para depuração 

        renderWeatherData(dadosClima); // Chama a função para pedir os dados do clima

    } catch (erro) { // Mostra os erros
        console.error('Erro ao buscar o clima:', erro.message);
        weatherResult.classList.add('hidden');
        errorMessage.classList.remove('hidden'); 
        errorMessage.querySelector('p').textContent = erro.message;
    }
}

function renderWeatherData(weatherData) { // Preenche os campos do HTML com os dados recebidos
    
    document.getElementById('city-name').textContent = `${weatherData.location.name} - ${weatherData.location.country}`;
    const hoje = new Date(weatherData.location.localtime);
    const dataFormatada = hoje.toLocaleDateString('pt-BR', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    });

    const horaFormatada = hoje.toLocaleTimeString('pt-BR');
    console.log(dataFormatada); // Saída: 15 de agosto de 2025
    document.getElementById('local-time').textContent = `${dataFormatada} - ${horaFormatada}`;
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


}

// Botão de busca
searchBtn.addEventListener('click', () => {
    const cityName = cityInput.value.toLowerCase().trim();

    if (cityName) {
        getWeatherData(cityName);
    }
});
