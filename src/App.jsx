import { useState } from 'react'
import { useEffect } from "react";
import logo from './assets/logo.png';
import './assets/styles/navbar.css'
import './assets/styles/App.css'
import './assets/styles/content.css'
import { getWeather } from './services/weatherService';

function App() {
  const [cities, setCities] = useState([]);
  const [pageGroup, setPageGroup] = useState(0); 
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;
  async function checkCityWeather(){
    try{
      const capInput = document.querySelector('input').value;
      const response = await getWeather(capInput)
        setCities(response);
        console.log(response);  
        setPageGroup(0); 
        setCurrentPage(1);
      } catch(e){
          alert('Inserisci un CAP valido')
      }
  }
  function getGroupedPages(totalPages, pageGroup, groupSize = 3) {
    const pages = [];
    const startPage = pageGroup * groupSize + 1;
    const endPage = Math.min(startPage + groupSize - 1, totalPages);

    if (startPage > 1) pages.push({ type: 'dots', direction: 'left' });

    for (let i = startPage; i <= endPage; i++) {
      pages.push({ type: 'page', number: i });
    }

    if (endPage < totalPages) pages.push({ type: 'dots', direction: 'right' });

    return pages;
  }
  useEffect(()=>{
    const checkCityWeatherButton = document.querySelector(".search-icon");
    checkCityWeatherButton.addEventListener('click', checkCityWeather)
  }, []);
  return (
    <>
      <nav className="nav">
        <img title="logo" id="logo" src={logo}></img>
        <div className="search-box">
          <input name="cap" type="number" placeholder="Inserisci CAP" onKeyDown={(e) => {if (["e", "E", "+", "-", "."].includes(e.key)) {e.preventDefault();}}}/>
          <i className="uil uil-search search-icon" id="searchIcon"></i>
        </div>
      </nav>
      <div className="content">
        <div className="card-list">  
          {cities.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage).map((item, index) => {
            const icon = item.weather.weather[0].icon;
            const description = item.weather.weather[0].description;
            const iconUrl = `https://openweathermap.org/img/wn/${icon}@2x.png`;
            return(
              <div className="card mb-3 w-100" key={index} >
                <div className="row g-0">
                  <div className="col-12 col-md-4 d-flex flex-column align-items-center">
                    <h5 className="card-title">{item.place}</h5>    
                    <img className="weather-icon" src={iconUrl} alt={item.weather.weather[0].description} />
                  </div>
                  <div className="col-md-8">
                    <div className="card-body">
                      <div className="card-text row">
                        <div className="col-12 col-md-6">
                          <p><strong>Condizioni:</strong> {item.weather.weather[0].description}</p>
                          <p><strong>Temperatura:</strong> {item.weather.main.temp}°C</p>
                          <p><strong>Percepita come:</strong> {item.weather.main.feels_like}°C</p>
                        </div>
                        <div className="col-12 col-md-6">
                          <p><strong>Umidità:</strong> {item.weather.main.humidity}%</p>
                          <p><strong>Vento:</strong> {item.weather.wind.speed} m/s</p>
                          <p><strong>Visibilità:</strong> {(item.weather.visibility/1000).toFixed(1)} km</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>  
          )})}
        </div>   
      </div>   
      {cities.length > itemsPerPage && (
    <>
      {(() => {
        const totalPages = Math.ceil(cities.length / itemsPerPage);
        const pageGroupsCount = Math.ceil(totalPages / 3);
        return (
          <div className="pagination">
            {getGroupedPages(totalPages, pageGroup).map((item, idx) => {
              if (item.type === 'page') {
                return (
                  <button
                    key={idx}
                    className={item.number === currentPage ? 'active' : ''}
                    onClick={() => setCurrentPage(item.number)}
                  >
                    {item.number}
                  </button>
                );
              } else if (item.type === 'dots') {
                return (
                  <button
                    key={idx}
                    className="dots"
                    onClick={() =>
                      setPageGroup(prev =>
                        item.direction === 'left'
                          ? Math.max(prev - 1, 0)
                          : Math.min(prev + 1, pageGroupsCount - 1)
                      )
                    }
                  >
                    ...
                  </button>
                );
              }
              return null;
            })}
          </div>
        );
      })()}
    </>
  )}
</>
)}
export default App
