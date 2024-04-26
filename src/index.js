import { fetchBreeds, fetchCatByBreed } from './cat-api.js';
import SlimSelect from 'slim-select';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  breedSelect: document.querySelector('.breed-select'),
  loader: document.querySelector('.wrrap'),
  container: document.querySelector('.cat-info'),
};

refs.breedSelect.addEventListener('change', onSelectedCat);

fetchBreeds()
  .then(data => {
    const markup = createMarkupOptions(data);
    refs.breedSelect.innerHTML = markup;
    new SlimSelect({
      select: '.breed-select',
    });
    removeClass(refs.breedSelect);
  })
  .catch(() => {
    Notify.failure('Oops! Something went wrong! Try reloading the page!');
    addClass(refs.loader);
  });

function onSelectedCat(event) {
  refs.container.innerHTML = '';
  removeClass(refs.loader);
  const breedId = event.currentTarget.value;
  fetchCatByBreed(breedId)
    .then(({ data }) => {
      const markup = createMarkupCard(data[0]);
      refs.container.innerHTML = markup;
      addClass(refs.loader);
    })
    .catch(() => {
      Notify.failure('Oops! Something went wrong! Try reloading the page!');
      addClass(refs.loader);
    });
}

function createMarkupOptions(array) {
  return array.map(el => `<option value="${el.id}">${el.name}</option>`);
}

function createMarkupCard(data) {
  return `<img src="${data.url}" alt="${data.breeds[0].name}" width='550' height='350'/>
            <p class="cat-name">${data.breeds[0].name}</p>
            <p class="cat-description">${data.breeds[0].description}</p>
            <p class="cat-temperament"><b>Temperament:</b> ${data.breeds[0].temperament}</p>`;
}

function removeClass(elemet) {
  elemet.classList.remove('is-hidden');
}

function addClass(elemet) {
  elemet.classList.add('is-hidden');
}

export { removeClass, addClass };
