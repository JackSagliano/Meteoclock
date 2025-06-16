import axios from 'axios';


const apiClient = axios.create({
    baseURL: 'https://api.zippopotam.us/it/'
});


//Gli passiamo il CAP e ci restituisce le coordinate
const getCoordinates = (cap) => {
  return apiClient.get(cap);
};


export { getCoordinates};