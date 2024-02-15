import config from "../conf/index.js";

async function init() {
  //Fetches list of all cities along with their images and description
  console.log("from init")
  
  let cities = await fetchCities();

  //Updates the DOM with the cities

  
  if (cities) {
    cities.forEach((key) => {
      addCityToDOM(key.id, key.city, key.description, key.image);
    });
  }
}

//Implementation of fetch call
async function fetchCities() {
  // TODO: MODULE_CITIES
  // 1. Fetch cities using the Backend API and return the data
  try {
    const response = await fetch(`${config.backendEndpoint}/cities`);
    if (!response.ok) {
      throw new Error('Failed to fetch cities');
    }
    const citiesData = await response.json();
    return citiesData;
  } catch (error) {
    
    return null;
  }

}

//Implementation of DOM manipulation to add cities
function addCityToDOM(id, city, description, image) {

 
  // TODO: MODULE_CITIES
  // 1. Populate the City details and insert those details into the DOM
  const content = document.getElementById('data')
  content.innerHTML += `
  <div class="col-sm-12 col-md-6 col-lg-3 mt-4" >
  <a href="pages/adventures/?city=${id}"  id = "${id}"><div class="tile" >
  <div class="tile-text">
    <h5>${city}</h5>
    <p>${description}</p>
  </div>
  <img src=${image} loading="lazy" alt=${city}>
</div></a>
  
  
</div>`


}

export { init, fetchCities, addCityToDOM };
