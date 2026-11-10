import {API_KEY } from "./config";

export async function getWeatherData(location = 'Nairobi',unitGroup = 'metric'){
    const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${encodeURIComponent(location)}?unitGroup=${unitGroup}&key=${API_KEY}&contentType=json`;


    try{
        const repsonse = await fetch(url,{mode:'cors'});

        if(!repsonse.ok){
            throw new Error(`Location not found (${repsonse.status})`);
        }

        const data = await repsonse.json();
        return data;
    }catch (error){
        console.error("Error fetching weather data:",error);
        throw error;
    }
}

export function getUserLocation(){
    return new Promise((resolve,reject) => {
        if(!navigator.geolocation){
            reject(new Error('Geolocation is not supported by your browser'));
        }else{
            navigator.geolocation.getCurrentPosition(
                async  (position) =>{
                    const lat = position.coords.latitude;
                    const long = position.coords.longitude;
                    
                    try{
                        const response = await fetch(
                            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${long}`,
                            {
                                headers:{
                                    'User-Agent':'WeatherApp-StudentProject'
                                }
                            }
                        );

                        const data = await response.json();
                        const address = data.address;
                        const placeName = address.city || address.town || address.village || address.county || `${lat},${long}`;

                        resolve(placeName);
                    }catch {
                        resolve(`${lat},${long}`);
                    }
                },
                (error) => {
                    reject(error);
                },
                {timeout : 15000}
            );
        }
    });
}