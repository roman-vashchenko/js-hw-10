import axios from 'axios';
import { removeClass, addClass } from './index.js';

axios.defaults.headers.common['x-api-key'] =
  'live_UQb8vTU4eJ5MdeRb22OJHPQC6juxZjQlriiizPMR6UGyb9gzvgGiVGDCtX0uURvI';

const loader = document.querySelector('.wrrap');

function fetchBreeds() {
  removeClass(loader);
  return axios
    .get('https://api.thecatapi.com/v1/breeds')
    .then(response => response)
    .then(({ data }) => {
      addClass(loader);
      return data;
    });
}

function fetchCatByBreed(breedId) {
  return axios
    .get(`https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`)
    .then(response => response)
    .then(data => data);
}

export { fetchBreeds, fetchCatByBreed };
