import config from "../conf/index.js";

//Implementation to extract adventure ID from query params
function getAdventureIdFromURL(search) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Get the Adventure Id from the URL
  const params = new URLSearchParams(search);
  const adventureId = params.get('adventure');
  return adventureId;
}
//Implementation of fetch call with a paramterized input based on adventure ID
async function fetchAdventureDetails(adventureId) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Fetch the details of the adventure by making an API call
  try {
    const apiUrl = `${config.backendEndpoint}/adventures/detail?adventure=${adventureId}`;
    const response = await fetch(apiUrl);
    
    const data = await response.json();
    return data;
  } catch (error) {
    return null;
  }
}

//Implementation of DOM manipulation to add adventure details to DOM
function addAdventureDetailsToDOM(adventure) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the details of the adventure to the HTML DOM
  const {id, name , subtitle, images, content} = adventure
  const headingElement = document.getElementById("adventure-name");
  const subtitleElement = document.getElementById("adventure-subtitle");
  const photoGalleryElement = document.getElementById("photo-gallery");
  const contentElement = document.getElementById("adventure-content");

  headingElement.textContent = `${name}`;
  subtitleElement.textContent = `${subtitle}`;
  images.map(image =>{
    console.log("ehtesham");

    const container = document.createElement("div");
    container.className = "col-lg-12";
    container.innerHTML = `
    <img src = ${image} alt = "picture" class = "activity-card-image"/>`;

    photoGalleryElement.append(container);

  })

  contentElement.textContent = `${content}`
}

//Implementation of bootstrap gallery component
function addBootstrapPhotoGallery(images) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the bootstrap carousel to show the Adventure images
  console.log(images)

  const photoGalleryElement = document.getElementById("photo-gallery");
  photoGalleryElement.innerHTML = `
  <div id="carouselExampleIndicators" class="carousel slide" data-bs-ride="carousel">
  <div class="carousel-indicators">
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
  </div>
  <div class="carousel-inner" id = 'carousel-inner'>
    
  </div>
  <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Previous</span>
  </button>
  <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Next</span>
  </button>
</div>`;

const innerElement = document.getElementById("carousel-inner");

images.forEach((image, index) =>{
  const container = document.createElement("div");
  container.className = `col-lg-12 carousel-item${index === 0 ? ' active' : ''}`;

  container.innerHTML = `<img src = ${image} class = "activity-card-image"/>`;
  innerElement.append(container);
})
}

//Implementation of conditional rendering of DOM based on availability
function conditionalRenderingOfReservationPanel(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If the adventure is already reserved, display the sold-out message.
  let soldout=document.getElementById('reservation-panel-sold-out');
  let reserve=document.getElementById('reservation-panel-available');
  let reservationcost=document.getElementById('reservation-person-cost');
  if(adventure.available == true)
  {
    soldout.style.display='none';
    reserve.style.display='block';
    reservationcost.innerHTML=adventure.costPerHead;
  }
  else
  {
    soldout.style.display='block';
    reserve.style.display='none';
  }
}

//Implementation of reservation cost calculation based on persons
function calculateReservationCostAndUpdateDOM(adventure, persons) {
  // TODO: MODULE_RESERVATIONS
  // 1. Calculate the cost based on number of persons and update the reservation-cost field
  const {costPerHead} = adventure;
  const costPerHeadElement = document.getElementById("reservation-person-cost");
  costPerHeadElement.innerHTML = costPerHead;

  const totalCost = persons * costPerHead;
 

  const totalCostElement = document.getElementById("reservation-cost");
  
  totalCostElement.innerHTML = totalCost;

}

//Implementation of reservation form submission
function captureFormSubmit(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. Capture the query details and make a POST API call using fetch() to make the reservation
  // 2. If the reservation is successful, show an alert with "Success!" and refresh the page. If the reservation fails, just show an alert with "Failed!".

  
  const form = document.getElementById("myForm");
  const nameElement = form.elements["name"];
  const dateElement = form.elements["date"];
  const personsElement = form.elements["person"];
  const {id} = adventure 
  form.addEventListener("submit", async(event)=>{
    event.preventDefault();

    const payload = {
      name : nameElement.value,
      date: dateElement.value,
      person: personsElement.value,
      adventure: id
    }

    const url = config.backendEndpoint + "/reservations/new";

    try{
      const response = await fetch(url, {method : "POST", body: JSON.stringify(payload), headers:{
        "Content-Type":"application/json"
      }});
      const data = await response.json();
      console.log(data, 'data log');

      if(response.status === 200){
        alert("Success!");

      }
      else{
        alert("Failed!"); 
      }
    }
    catch(error){
      return null;

    }
    
  })
}

//Implementation of success banner after reservation
function showBannerIfAlreadyReserved(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If user has already reserved this adventure, show the reserved-banner, else don't

  console.log(adventure);

  const {reserved} = adventure;

  const reservedBannerElement = document.getElementById("reserved-banner");

  reservedBannerElement.style.display = "none";

  if(reserved){

    
    
    reservedBannerElement.style.display = "block";

  }
  

}

export {
  getAdventureIdFromURL,
  fetchAdventureDetails,
  addAdventureDetailsToDOM,
  addBootstrapPhotoGallery,
  conditionalRenderingOfReservationPanel,
  captureFormSubmit,
  calculateReservationCostAndUpdateDOM,
  showBannerIfAlreadyReserved,
};
