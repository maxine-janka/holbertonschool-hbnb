// FETCH PLACE DETAILS //

document.addEventListener('DOMContentLoaded', () => {
  const placeIdParam = window.location.search.slice(1);
  //console.log(placeIdParam);

  fetchPlaceDetails(placeIdParam);
})

function checkAuthentication() {
  const token = getCookie('token');
  const addReviewSection = document.getElementById('add-review');

  if (!token) {
      addReviewSection.style.display = 'none';
  } else {
      addReviewSection.style.display = 'block';
      // Store the token for later use
      fetchPlaceDetails(token, placeId);
  }
}

function getCookie(name) {
  // Function to get a cookie value by its name
  const value = `;${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) {
    checkCookie = parts.pop().split(';').shift();
    console.log(checkCookie);
    return checkCookie;
  }
}

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
    const reviewResponse = await axios.get(`http://127.0.0.1:5000/api/v1/places/${placeIdParam}/reviews`, {
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

// Show Add Review Form - Not finished
document.addEventListener('DOMContentLoaded', () => {
  const reviewButton = document.getElementsByClassName('review-button');

  if (reviewButton) {
    reviewButton.addEventListener('submit', async (event) => {
      event.preventDefault();

      const token = getCookie('token');
      console.log(`${token}`);
      await addReviews(token);
    })
  }
})

async function addReviews(token) {
  try {
    const response = await fetch('http://127.0.0.1:5000/api/v1/places/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Bearer': `${token}`,
      },
      body: JSON.stringify({token})
    });
  
  if (response.ok) {
    const data = await response.json();
    document.cookie = `token=${data.access_token}; path=/`;
    window.location.href = 'index.html';
  } else {
    alert('Add Review Failed: ' + response.statusText);
  }
  } catch (err) {
    alert(`Error: ${err.message}`);
  }
}

