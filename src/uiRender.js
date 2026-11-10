export function getWeatherIconClass(iconString){

    switch(iconString){
        case 'clear-day':
        case 'sunny':
            return 'fa-sun';
        case 'clear-night':
            return 'fa-moon';
        case 'rain':
            return 'fa-cloud-rain';
        case 'snow':
            return 'fa-snowflake';
        case 'partly-cloudy-day':
        case 'partly-cloud-night':
            return 'fa-cloud-sun';
        case 'cloudy':
        default:
            return 'fa-cloud';
    }
}

export function renderCurrentWeather(data,unit){

    const current = data.currentConditions;

    if(!current) return;

    const locationEl = document.getElementById('city-country');
    if(locationEl) locationEl.textContent = data.resolvedAddress;

    const tempEl = document.getElementById('current-temp');
    if(tempEl){
         tempEl.innerHTML = `${Math.round(current.temp)} &deg;${unit === 'metric' ? 'C' : 'F'}`; 
    }

    const feelsLikeEl = document.getElementById('feels-like-temp');
    if(feelsLikeEl){
        feelsLikeEl.innerHTML = `${Math.round(current.feelslike)}&deg;${unit === 'metric' ? 'C' : 'F'}`;
    }

    const conditionEl = document.getElementById('current-condition');
    if(conditionEl)conditionEl.textContent = current.conditions;

    const iconContainer = document.getElementById('current-weather-icon');
    if(iconContainer){
        const iconClass = getWeatherIconClass(current.icon);
        iconContainer.innerHTML = `<i class="fa-solid ${iconClass} main-icon"></i>`;
    }

    const humidityEl = document.getElementById('humidity-val');
    if(humidityEl)humidityEl.textContent = `${Math.round(current.humidity)}%`;

    const windEl = document.getElementById('wind-val');
    if(windEl){
        const windSpeedUnit = unit == 'metric' ? 'Km/h' : 'Mph';
        windEl.textContent = `${Math.round(current.windspeed)} ${windSpeedUnit}`;
    }

    const pressureEl = document.getElementById('pressure-val');
    if(pressureEl) pressureEl.textContent = `${current.pressure} hPa`;

    const sunriseEL = document.getElementById('sunrise-val');
    if(sunriseEL){
        sunriseEL.textContent = current.sunrise ? current.sunrise.slice(0,5) : '--';
    }

    const sunsetEL = document.getElementById('sunset-val');
    if(sunsetEL){
        sunsetEL.textContent = current.sunset ? current.sunset.slice(0,5) : '--';
    }

    

}

export function renderForecast(data,unit){
    const container = document.getElementById('forecast-container');

    if(!container) return;
    container.innerHTML = '';

    const forecastDays = data.days.slice(1,6);

    forecastDays.forEach(day => {

        const dataObj = new Date(day.datetime);
        const options = {weekday: 'short',month : 'short',day : 'numeric'};
        const formattedDate = dataObj.toLocaleDateString('en-US',options);

        const iconClass = getWeatherIconClass(day.icon);
        const tempUnitSymbol = unit === 'metric' ? '°C' : '°F';

        const card = document.createElement('div');
        card.classList.add('forecast-card');

        card.innerHTML = `
            <span class="day-date">${formattedDate}</span>
            <div class="forecast-icon">
                <i class="fa-solid ${iconClass}"></i>
            </div>
            <div class="forecast-temp">
                <span class="high">${Math.round(day.tempmax)} ${tempUnitSymbol}</span> /
                <span class="low">${Math.round(day.tempmin)} ${tempUnitSymbol}</span>
            </div>
            <span class="forcast-condition">${day.conditions}</span>
        `;
        container.appendChild(card);
    });
}

export function showStatus(title,subtext,isLoading = false){
    const banner = document.getElementById('status-banner');
    const titleEl = document.getElementById('status-title');
    const subtextEl = document.getElementById('status-subtext');
    const spinner = document.getElementById('status-spinner');

    if(titleEl) titleEl.textContent = title;
    if(subtextEl) subtextEl.textContent = subtext;
    if(spinner)  spinner.style.display = isLoading ? 'block' : 'none';
    if(banner) banner.style.opacity = '1';
    
}

