import './css/styles.css';
import Notiflix from 'notiflix';
import SlimSelect from 'slim-select';
import { fetchCatByBreed, fetchBreeds } from './cat-api.js';

const refs = {
    body: document.querySelector('body'),
    breedSelect: document.querySelector('.breed-select'),
    catInfo: document.querySelector('.cat-info'),
    loader: document.querySelector('.loader'),
    error: document.querySelector('.error'),
};

const classes = {
    loadHidden: 'load-hidden',   
};

const slim = new SlimSelect({
    select: '.breed-select',
});

refs.breedSelect.addEventListener('change', handleChange);
refs.loader.classList.remove('load-hidden');
fetchBreeds()
    .then((breeds) => {
        selectedBreeds(breeds);
    })
    .catch((err) => {
        console.log(err);
        Notiflix.Notify.failure('Oops, something went wrong. ' + err.message);
        refs.catInfo.innerHTML = ''
    });
    
    function selectedBreeds(breeds) {
    const options = breeds.map(breed => ({ text: breed.name, value: breed.id }));
    slim.setData(options);
};

function handleChange(e) {
    const selectedBreedId = e.target.value;
    refs.loader.classList.remove('load-hidden');
    refs.catInfo.innerHTML = '';
    
    fetchCatByBreed(selectedBreedId)
        .then(cat => {
            createMarkup(cat);
        })
        .catch((err) => {
            console.log(err);
            Notiflix.Notify.failure('Oops, something went wrong. ' + err.message);
            refs.catInfo.innerHTML = ''
        })
        // refs.loader.classList.add('load-hidden');
        // .finally(() => {
        //     refs.loader.classList.add(classes.loadHidden);
        // });
}

function createMarkup(breed) {
    refs.loader.classList.add('load-hidden');
    const markup = `
        <img src="${breed.url ? breed.url : ''}" alt="${breed.breed ? breed.breed : ''}" width="800px">
        <h2 class="breed-titel">Breed name: ${breed.name ? breed.name : ''}</h2>
        <p class="breed-description-text">${breed.description ? breed.description : ''}</p>
        <p class="breed-temperament-text">Temperament: ${breed.temperament ? breed.temperament : ''}</p>
    `;
    refs.catInfo.innerHTML = markup;
};
    