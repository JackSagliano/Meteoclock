import axios from 'axios';
import { getCoordinates } from './coordinatesService';

const apiClient = axios.create({
    baseURL: 'https://api.openweathermap.org/data/2.5/'
    
});
//lat=45.07&lon=7.69&appid=YOUR_API_KEY&units=metric
const getWeather = async (cap) => {
    try{
        const coordinatesResponse = await getCoordinates(cap); //ottengo tutti i paesi con quel determinato cap
        const places = coordinatesResponse.data.places; //estraggo i paesi
        const weatherPromises = places.map(place => {
        const lat = place.latitude;
        const lon = place.longitude;
        const placeName = place['place name'];

        return apiClient.get(`weather`, {
            params: {
            lat,
            lon,
            appid: "9e9b98c5593a053ed8daaae75ead7851",
            units: 'metric',
            },
        }).then(response => ({
            place: placeName,
            lat,
            lon,
            weather: response.data,
            }));
        });

        const allWeatherData = await Promise.all(weatherPromises);
        return allWeatherData;
    } catch (error) {
        console.error("Errore nel recupero meteo:", error);
        throw error;
    }
  
};


export { getWeather};