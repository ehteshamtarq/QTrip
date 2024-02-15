import config from "../conf/index.js";

//Implementation of fetch call to fetch all reservations
async function fetchReservations() {
  // TODO: MODULE_RESERVATIONS
  // 1. Fetch Reservations by invoking the REST API and return them
  try {
    const apiUrl = config.backendEndpoint + "/reservations/";
    const response = await fetch(apiUrl);
    
    const data = await response.json();
    return data;
  } catch (error) {
    return null;
  }


  // Place holder for functionality to work in the Stubs
  return null;
}

//Function to add reservations to the table. Also; in case of no reservations, display the no-reservation-banner, else hide it.
function addReservationToTable(reservations) {
  // TODO: MODULE_RESERVATIONS
  // 1. Add the Reservations to the HTML DOM so that they show up in the table

  //Conditionally render the no-reservation-banner and reservation-table-parent

  /*
    Iterating over reservations, adding it to table (into div with class "reservation-table") and link it correctly to respective adventure
    The last column of the table should have a "Visit Adventure" button with id=<reservation-id>, class=reservation-visit-button and should link to respective adventure page

    Note:
    1. The date of adventure booking should appear in the format D/MM/YYYY (en-IN format) Example:  4/11/2020 denotes 4th November, 2020
    2. The booking time should appear in a format like 4 November 2020, 9:32:31 pm
  */
 const noReservationBanner = document.getElementById("no-reservation-banner");
  const reservationTableParent = document.getElementById("reservation-table-parent");

  if (reservations.length === 0) {
    noReservationBanner.style.display = "block";
    reservationTableParent.style.display = "none";
  } else {
    noReservationBanner.style.display = "none";
    reservationTableParent.style.display = "block";
  }

  const tbody = document.getElementById("reservation-table");

  reservations.forEach((reservation) => {

    

    const formattedDate = new Date(reservation.date).toLocaleDateString("en-IN");
   const formattedBookingTime = new Date(reservation.time);

   const newformattedBookingDate = formattedBookingTime.toLocaleDateString("en-IN", {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
  
  // Format time
  const newformattedBookingTime = formattedBookingTime.toLocaleTimeString(undefined, {
    hour: 'numeric',
    minute: '2-digit',
    second: '2-digit',
    hour12: true,
  }).replace(/\b([APap][Mm])\b/, (match) => match.toLowerCase());


  const formattedBookingDateTime = `${newformattedBookingDate}, ${newformattedBookingTime}`;

   const rowHTML = `
   <tr>
       <td class="font-weight-bold">${reservation.id}</td>
       <td>${reservation.name}</td>
       <td>${reservation.adventureName}</td>
       <td>${reservation.person}</td>
       <td>${formattedDate}</td>
       <td>${reservation.price}</td>
       <td>${formattedBookingDateTime}</td>
       <td id=${reservation.id}><a type="button" href = "../detail/?adventure=${reservation.adventure}"  class="reservation-visit-button" > Visit Adventure</a></td>
   </tr>
`;
tbody.innerHTML += rowHTML;



});


}

function visitAdventure(adventureId) {
  const adventurePageLink = `../detail/?adventure=${adventureId}`;
  console.log(adventurePageLink);
  window.location.href = adventurePageLink;
}


export { fetchReservations, addReservationToTable, visitAdventure };
