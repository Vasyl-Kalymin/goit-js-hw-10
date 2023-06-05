const BASE_URL_BREEDS = 'https://api.thecatapi.com/v1/breeds';
const BASE_URL_IMAGES = 'https://api.thecatapi.com/v1/images/';
const API_KEY ='api_key=live_U0B2dz0jEF92k1MVegVm1nc79ja4IDirjZUg5Ed5vtPwAcYJPWID4wYfzlCYb3h3';

function fetchBreeds() {
  return fetch(`${BASE_URL_BREEDS}?${API_KEY}`).then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json();
  });
}


function fetchCatByBreed(breedId) {
  return fetch(`${BASE_URL_IMAGES}${breedId}?${API_KEY}`).then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json();
  });
}



export { fetchBreeds, fetchCatByBreed };