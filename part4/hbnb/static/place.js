// FETCH PLACE DETAILS //

document.addEventListener('DOMContentLoaded', () => {
  const placeIdParam = window.location.search.slice(1);
  //console.log(placeIdParam);

  fetchPlaceDetails(placeIdParam);
})


let placeData;
async function fetchPlaceDetails(placeIdParam) {
  try {
    //fetch place details + amenities list
    const placeResponse = await axios.get(`http://127.0.0.1:5000/api/v1/places/${placeIdParam}`, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const placeData = placeResponse.data;
    //console.log(placeData);

    // fetch reviews for place
    const reviewResponse = await axios.get(`http://127.0.0.1:5000/api/v1/places/${placeIdParam}/reviews`, {
      headers: {
        'Content-Type': 'application/json'
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