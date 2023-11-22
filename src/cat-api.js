import axios from "axios";


const API_KEY = 'live_9IIzxZ8TCPOsTERuYoSCVZDzM160Q6xVS1M1mfBWaN1ZNYh9N0zckU6T5fL3hn3x';

axios.defaults.headers.common["x-api-key"] = API_KEY;
const BASE_URL = "https://api.thecatapi.com/v1/breeds"
const IMAGE_BREED_URL = "https://api.thecatapi.com/v1/images/search?breed_ids="
export function fetchBreeds() {    
    return axios.get(BASE_URL)
        .then(response => response.data)
    }

export function fetchCatByBreed(breedId) {
    const url = `${IMAGE_BREED_URL}${breedId}`;
    return axios.get(url)
    .then(response => {
    const breedDataUrl = `${BASE_URL}/${breedId}`;
    return axios.get(breedDataUrl)
        .then(breedResponse => {
        const breedData = breedResponse.data;
            const catData = response.data[0];
        return {
            url: catData.url,
            name: breedData.name,
            description: breedData.description,
            temperament: breedData.temperament
        };
        });
    });
}