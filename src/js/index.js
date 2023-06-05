import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';
import { fetchBreeds, fetchCatByBreed } from './cat-api';

const selectInput = document.querySelector('.breed-select');
const loader = document.querySelector('.loader');
const errorOutput = document.querySelector('.error');
let catInfo = document.querySelector('.cat-info');

selectInput.classList.add('inviseble');
errorOutput.classList.add('inviseble');

renderMarkupOptions();

selectInput.addEventListener('change', onChangeSelect);

function onChangeSelect(e) {
  loader.classList.remove('inviseble');
  selectInput.classList.add('inviseble');
  errorOutput.classList.add('inviseble')
  const outputValue = e.currentTarget.value;
  catInfo.innerHTML = '';
  requestById(outputValue);
}

function requestById(catId) {
  fetchCatByBreed(catId)
    .then(renderMarkupAboutCat)
    .catch(error => {
      errorOutput.classList.remove('inviseble');
      selectInput.classList.add('inviseble');
      console.log('Oops! Something went wrong! Try reloading the page!');
    })
    .finally(() => {
      loader.classList.add('inviseble');
      selectInput.classList.remove('inviseble');
    });
}

function renderMarkupAboutCat(cat) {
  const descriptiomCat = `<div class="img-cat">
      <img src="${cat.url}" alt="${cat.breeds[0].name}" width="450" />
    </div>
    <div class="about-cat">
      <h2 class="title-cat">${cat.breeds[0].name}</h2>
      <p class="description-cat">${cat.breeds[0].description}</p>
      <p class="temperament-cat"><b>Temperament</b>: ${cat.breeds[0].temperament}</p>
    </div>`;

  catInfo.insertAdjacentHTML('beforeend', descriptiomCat);
}

function renderMarkupOptions() {
  fetchBreeds()
    .then(cats => renderOptions(cats))
    .catch(error => {
      errorOutput.classList.remove('inviseble')
      console.log(error);
      console.log('Oops! Something went wrong! Try reloading the page!');
    })
    .finally(() => {
      selectInput.classList.remove('inviseble');
      loader.classList.add('inviseble');
    });
}
function renderOptions(cats) {
  const markup = cats
    .map(cat => {
      return `
    <option value="${cat.reference_image_id}">${cat.name}</option>
    `;
    })
    .join('');

  selectInput.insertAdjacentHTML('beforeend', markup);
  new SlimSelect({
    select: '#single',
  });
}
