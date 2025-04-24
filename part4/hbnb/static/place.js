// FETCH PLACE DETAILS //

document.addEventListener('DOMContentLoaded', () => {
  console.log("place.js loaded and DOM content is ready");
  checkAuthentication();
});

function getPlaceIdFromURL() {
  // Extract the place ID from window.location.search
  const idParam = new URLSearchParams(window.location.search);
  // console.log(idParam.get('placeId'));
  return idParam.get('placeId');
}

function checkAuthentication() {
  const token = getCookie('token');
  const reviewBtn = document.getElementById('review-button');

  if (!token) {
      reviewBtn.style.display = 'none';
  } else {
      reviewBtn.style.display = 'block';
      // Store the token for later use
      // console.log(token);
  }
  fetchPlaceDetails(token);
}

function getCookie(name) {
  // Function to get a cookie value by its name
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) {
      return parts.pop().split(';').shift();
  } else {
      return null;
  }
}

async function fetchPlaceDetails(token) {
  // Make a GET request to fetch place details
  const placeId = getPlaceIdFromURL();
  //console.log(placeId);
  const placeUrl = `http://127.0.0.1:5000/api/v1/places/${placeId}`;
  const reviewUrl = `http://127.0.0.1:5000/api/v1/places/${placeId}/reviews`;

  // Include the token in the Authorization header
  try {
      const placeResponse = await fetch(placeUrl, {
          method: 'GET',
          headers: {
              'Authorization': `Bearer ${token}`, // JWT token
              'Content-Type': 'application/json'
          }
      });

      const reviewResponse = await fetch(reviewUrl, {
          method: 'GET',
          headers: {
              'Authorization': `Bearer ${token}`, // JWT token
              'Content-Type': 'application/json'
          }
      });

      // Handle the response and pass the data to displayPlaceDetails function
      if (!placeResponse.ok && !reviewResponse.ok) {
          throw new Error(`Response status: ${placeResponse.status} and ${reviewResponse.status}`);
      } else {
          const placeData = await placeResponse.json();
          console.log(placeData);
          const reviewData = await reviewResponse.json();
          console.log(reviewData);
          displayPlaceDetails(placeData, reviewData);
      }
  } catch (err) {
      console.error(err.message);
  }

}

function displayPlaceDetails(place, review) {
  // Title
  const placeHeader = document.getElementById('place-header');
  placeHeader.innerHTML = '';
  placeHeader.innerHTML = `${place.title}`;

  // Owner
  const ownerName = document.getElementById('owner-name');
  ownerName.innerHTML = '';
  ownerName.innerHTML = `${place.owner.first_name} ${place.owner.last_name}`;

  // Description
  const descriptionElement = document.querySelector('.place-long-description-placeholder');
  descriptionElement.innerHTML = '';
  descriptionElement.innerHTML = `${place.description}`;

  // Price
  const placePrice = document.getElementById('place-price');
  placePrice.innerHTML = '';
  placePrice.innerHTML = `$${place.price} per night`;

  // Amenities
  const amenititesList = document.getElementById('amenities-list');
  amenititesList.innerHTML = '';

  place.amenities.forEach(element => {
      const newElement = document.createElement('li');
      newElement.textContent = element.name;
      amenititesList.appendChild(newElement);
  });

  // Reviews
    review.forEach(element => {
      // Reviewer
      const reviewName = document.getElementById('user-review-name');
      reviewName.innerHTML = '';
      reviewName.innerHTML = `${element.user.first_name} ${element.user.last_name}`;

      // Rating
      const reviewRate = document.querySelector('.user-place-rating');
      reviewRate.innerHTML = '';
      reviewRate.innerHTML = `★★★★★ ${element.rating}`;

      // Text
      const reviewText = document.querySelector('.users-review-text');
      reviewText.innerHTML = '';
      reviewText.innerHTML = `${element.text}`;

    })

}


/* -------------------------------------------------------------------- */

/* document.addEventListener('DOMContentLoaded', () => {
  // const placeIdParam = window.location.search.slice(1);
  console.log(placeIdParam);
  fetchPlaceDetails(placeIdParam);

})

let placeData;
async function fetchPlaceDetails(token, placeIdParam) {
  try {
    //fetch place details + amenities list
    const placeResponse = await axios.get(`http://127.0.0.1:5000/api/v1/places/${placeIdParam}`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer: ${token}`,
      }
    });
    const placeData = placeResponse.data;
    //console.log(placeData);

    // fetch reviews for place
    const reviewResponse = await fetch(`http://127.0.0.1:5000/api/v1/places/${placeIdParam}/reviews`, {
      headers: {
        'Content-Type': 'application/json',
      }
    });
    const reviewData = reviewResponse.data;

    displayPlaceDetails(placeData, reviewData);
    //console.log(reviewData)

  } catch (error) {
    console.error('Error fetching place details', error)
    return;
  }
}

function displayPlaceDetails(placeData, reviewData) {

  //Display place title
  document.getElementById('place-header').textContent = placeData.title;
  
  //Display owner name
  document.getElementById('owner-name').textContent = `${placeData.owner.first_name} ${placeData.owner.last_name}`;

  //Display price
  document.getElementById('place-price').textContent = `$${placeData.price} per night`

  //Display Amenities
  const amenitiesList = document.getElementById('amenities-list')
  amenitiesList.innerHTML = '';
  console.log(placeData.amenities);
  placeData.amenities.forEach(amenity => {
    amenityItem = document.createElement('li');
    amenityItem.textContent = amenity.name;
    amenitiesList.appendChild(amenityItem);
  })

  //Display reviews
  const reviewList = document.getElementById('review-container-wrapper');
  reviewList.innerHTML = '';
  reviewData.forEach(review => {
    const reviewElement = document.createElement('div');
    reviewElement.className = 'review-container';
    reviewElement.innerHTML = `<div class="user-review-details">
    <div class="user-review-icon"></div>
    <p class="user-review-name"></p>${review.user.first_name} ${review.user.last_name}</div>
    <p class="user-place-rating">★ ${review.rating} / 5</p>
    <p class="users-review-text">"${review.text}"</p>`;
    reviewList.appendChild(reviewElement);
  });
 
}
*/
