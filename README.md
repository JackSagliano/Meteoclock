# 📍 Meteoclock — App Meteo per Consegne in Italia

Un'applicazione web pensata per i dipendenti che effettuano consegne in giro per l’Italia. Inserendo un CAP (Codice di Avviamento Postale), l'app mostra le previsioni meteo attuali in quella zona, così che l’utente possa vestirsi e prepararsi adeguatamente.

## 🚀 Funzionalità principali

- 🔍 Inserimento CAP italiano
- 🌍 Conversione automatica da CAP a coordinate geografiche
- 🌦️ Visualizzazione meteo attuale tramite OpenWeatherMap
- 📱 Responsive design ottimizzato per smartphone

## 🛠️ Tecnologie utilizzate

- [React.js](https://reactjs.org/)
- [Zippopotam.us API](https://zippopotam.us/) – per conversione CAP → coordinate
- [OpenWeatherMap API](https://openweathermap.org/api) – per previsioni meteo

## 🔗 How-To

### 🔄 API per la conversione da CAP a coordinate

Tramite **Zippopotam.us** è possibile convertire un CAP italiano in coordinate geografiche:

📌 URL di esempio:  
https://api.zippopotam.us/it/53100

🔁Risultato:  
Coordinate della località corrispondente al CAP 53100 (es. Siena).


### 🌦️ API per la previsione meteo

Per ottenere le previsioni meteo in base alle coordinate geografiche puoi usare il servizio gratuito di **OpenWeatherMap** (richiede registrazione gratuita per ottenere una API key):

📌 URL di esempio:  
https://api.openweathermap.org/data/2.5/weather?lat=43.1764&lon=11.5455&appid=YOUR_API_KEY&units=metric

🔁 Risultato:  
Previsioni meteo correnti per la posizione specificata.
