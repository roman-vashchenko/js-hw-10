import axios from 'axios';

axios.defaults.headers.common['x-api-key'] =
  'live_UQb8vTU4eJ5MdeRb22OJHPQC6juxZjQlriiizPMR6UGyb9gzvgGiVGDCtX0uURvI';

function fetchBreeds() {
  return axios
    .get('https://api.thecatapi.com/v1/breeds')
    .then(response => response)
    .then(({ data }) => data);
}

function fetchCatByBreed(breedId) {
  return axios
    .get(`https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`)
    .then(response => response)
    .then(data => data);
}

export { fetchBreeds, fetchCatByBreed };
