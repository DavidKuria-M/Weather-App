import './style.css';
import { getWeatherData, getUserLocation } from './weatherService';
import { renderCurrentWeather,renderForecast,showStatus } from './uiRender';

let currentQueryLocation = 'Nairobi';
let currentUnit = 'metric';

async function fetchAndRenderWeather(location,unit) {
    try{
        showStatus('Fetching weather data...','This may take a few seconds',true);

        const weatherData = await getWeatherData(location,unit);

        renderCurrentWeather(weatherData,unit);
        renderForecast(weatherData,unit);

        showStatus('Enjoy the weather! ',location.toUpperCase(),false);
    }catch {
        showStatus('City not found', 'Please check the spelling and try again.',false);
    }
}

document.addEventListener('DOMContentLoaded', async() =>{

    fetchAndRenderWeather(currentQueryLocation,currentUnit);

    const searchForm = document.getElementById('search-form');
    const searchInput = document.getElementById('search-input');
    const btnCelsius = document.getElementById('btn-celsius');
    const btnFahrenheit = document.getElementById('btn-fahrenheit');

    try{
        showStatus('Detecting location...','Please allow location access if prompted',true);
        const coords = await getUserLocation();
        await fetchAndRenderWeather(coords,currentUnit);
    }catch {
        showStatus('Geolocation permission denied.Falling back to default.');
        if(searchInput) searchInput.value = currentQueryLocation;
        await fetchAndRenderWeather(currentQueryLocation,currentUnit);
    }




    searchForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const query = searchInput.value.trim();
        if(query){
            currentQueryLocation = query;
            fetchAndRenderWeather(currentQueryLocation,currentUnit);
        }
    });

   
    btnCelsius.addEventListener('click', () =>{
        if(currentUnit !== 'metric'){
            currentUnit = 'metric';
            btnCelsius.classList.add('active');
            btnFahrenheit.classList.remove('active');
            fetchAndRenderWeather(currentQueryLocation,currentUnit);
        }
    });

    btnFahrenheit.addEventListener('click', () =>{
        if(currentUnit !== 'us'){
            currentUnit = 'us';
            btnFahrenheit.classList.add('active');
            btnCelsius.classList.remove('active');
            fetchAndRenderWeather(currentQueryLocation,currentUnit);
        }
    });
});