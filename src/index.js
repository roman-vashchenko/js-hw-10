import { fetchBreeds, fetchCatByBreed } from './cat-api.js';

const refs = {
  breedSelect: document.querySelector('.breed-select'),
  loader: document.querySelector('.loader'),
  error: document.querySelector('.error'),
  container: document.querySelector('.cat-info'),
};

refs.breedSelect.addEventListener('change', onSelectedCat);

fetchBreeds().then(data => {
  const markup = createMarkupOptions(data);
  refs.breedSelect.innerHTML = markup;
});

function createMarkupOptions(array) {
  return array.map(el => `<option value="${el.id}">${el.name}</option>`);
}

function onSelectedCat(event) {
  const breedId = event.currentTarget.value;
  fetchCatByBreed(breedId).then(({ data }) => {
    const markup = createMarkupCard(data[0]);
    refs.container.innerHTML = markup;
  });
}

function createMarkupCard(data) {
  return `<img  src="${data.url}" alt="${data.breeds[0].name}" width='500' height='300'/>
            <p>${data.breeds[0].name}</p>
            <p">${data.breeds[0].description}
            <p>Temperament: ${data.breeds[0].temperament}</p>`;
}
