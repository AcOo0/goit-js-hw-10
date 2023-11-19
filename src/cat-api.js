import axios from "axios";


const API_KEY = 'live_9IIzxZ8TCPOsTERuYoSCVZDzM160Q6xVS1M1mfBWaN1ZNYh9N0zckU6T5fL3hn3x';

axios.defaults.headers.common["x-api-key"] = API_KEY;
const BASE_URL = "https://api.thecatapi.com/v1/breeds"

export function colectionBreeds() {
    
    return axios.get(BASE_URL)
        .then(response => response.data)
    }

export function fetchCatByBreed(breedId) {
    const loader = document.querySelector('.loader');
    loader.classList.remove('load-hidden');
    const url = `https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`;
    return axios.get(url)
    .then(response => {
    const breedDataUrl = `${BASE_URL}/${breedId}`;
    return axios.get(breedDataUrl)
        .then(breedResponse => {
        const breedData = breedResponse.data;
            const catData = response.data[0];
            loader.classList.add('load-hidden');
        return {
            url: catData.url,
            name: breedData.name,
            description: breedData.description,
            temperament: breedData.temperament
        };
        });
    });
}