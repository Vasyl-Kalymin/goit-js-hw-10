//import SlimSelect from 'slim-select';
//import 'slim-select/dist/slimselect.css';
import { fetchBreeds, fetchCatByBreed } from './cat-api';

const selectInput = document.querySelector('.breed-select');
const loader = document.querySelector('.loader');
const errorOutput = document.querySelector('.error');
const catInfo = document.querySelector('cat-info');

console.log(fetchBreeds())
