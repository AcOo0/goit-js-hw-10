import './css/styles.css';
import Notiflix from 'notiflix';
import SlimSelect from 'slim-select';
import { fetchCatByBreed, colectionBreeds } from './cat-api.js';

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

colectionBreeds()
    .then((breeds) => {
        selectedBreeds(breeds);
    })
    .catch((err) => {
        console.log(err);
        Notiflix.Notify.failure(err.message);
        refs.catInfo.innerHTML = ''
    });

    function selectedBreeds(breeds) {
    const options = breeds.map(breed => ({ text: breed.name, value: breed.id }));
    slim.setData(options);
};

function handleChange(e) {
    const selectedBreedId = e.target.value;
    
    refs.catInfo.innerHTML = '';

    fetchCatByBreed(selectedBreedId)
        .then(cat => {
            createMarkup(cat);
            console.log(cat);
        })
        .catch((err) => {
            console.log(err);
            Notiflix.Notify.failure(err.message);
            refs.catInfo.innerHTML = ''
        })
        // .finally(() => {
        //     refs.loader.classList.add(classes.loadHidden);
        // });
}

function createMarkup(breed) {
    const markup = `
        <img src="${breed.url ? breed.url : ''}" alt="${breed.breed ? breed.breed : ''}" width="800px">
        <h2 class="breed-name">Breed name: ${breed.name ? breed.name : ''}</h2>
        <p class="description">${breed.description ? breed.description : ''}</p>
        <p class="temperament">Temperament: ${breed.temperament ? breed.temperament : ''}</p>
    `;
    refs.catInfo.innerHTML = markup;
};