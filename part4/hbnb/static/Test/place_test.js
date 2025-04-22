// Place details

document.addEventListener('DOMContentLoaded', () => {
    console.log(checkAuthentication);
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
    const addReviewSection = document.getElementById('add-review');

    if (!token) {
        addReviewSection.style.display = 'none';
    } else {
        addReviewSection.style.display = 'block';
        // Store the token for later use
        fetchPlaceDetails(token);
        // console.log(token);
    }
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
    const placeUrl = `http://127.0.0.1:5000/api/v1/places/e65ed3eb-2a9c-420a-adb4-b20657c9b658`;
    const reviewUrl = `http://127.0.0.1:5000/api/v1/places/e65ed3eb-2a9c-420a-adb4-b20657c9b658/reviews`;

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
    // Clear the current content of the place details section
    const placeDetailsSection = document.getElementById('place-details');
    placeDetailsSection.innerHTML = '';
    
    // Create elements to display the place details (name, description, price, amenities and reviews)
    const nameElement = document.createElement('h1');
    nameElement.textContent = place.title;
    console.log(place.title);

    const descriptionElement = document.createElement('p');
    descriptionElement.textContent = place.description;
    console.log(place.description);

    const priceElement = document.createElement('p');
    priceElement.textContent = `Price: $${place.price}`;
    console.log(priceElement);

    const amenititesList = document.createElement('ul');
    place.amenities.forEach(element => {
        const newElement = document.createElement('li');
        newElement.textContent = element.name;
        amenititesList.appendChild(newElement);
        console.log(amenititesList);
    });

    const reviewsList = document.createElement('ul');
    review.forEach(element => {
        const newElement = document.createElement('li');
        newElement.textContent = `Text: ${element.text} Rating: ${element.rating}`;
        reviewsList.appendChild(newElement);
        console.log(reviewsList);
    })

    // Append the created elements to the place details section
    placeDetailsSection.appendChild(nameElement);
    placeDetailsSection.appendChild(descriptionElement);
    placeDetailsSection.appendChild(priceElement);
    placeDetailsSection.appendChild(amenititesList);
    placeDetailsSection.appendChild(reviewsList);
}
