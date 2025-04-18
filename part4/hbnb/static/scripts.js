async function fetchPlaces() {
    let places;
    try {
        const response = await axios.get('http://127.0.0.1:5000/api/v1/places/', {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        places = response.data;
        console.log(places);

    } catch (error) {
        console.error('Error fetching places:', error);
        return
    }
    displayPlaces(places);
}

function displayPlaces(places) {
    console.log(places);
    const propertyGrid = document.getElementById('hbnb-property-grid');
    propertyGrid.innerHTML = '';
    places.forEach(place => {
        const placeElement = document.createElement('section');
        placeElement.className = 'property-grid-item';
        placeElement.innerHTML = ` <div class="property-grid-item-image property-image-1"></div>
            <ul class="property-grid-item-details">
                <li class="property-grid-item-location">${place.title} (${place.latitude}, ${place.longitude})</li>
                <li class="property-grid-item-description">${place.description || 'No description'}</li>
                <li class="property-grid-item-price">$${place.price} per night</li>
            </ul>`;
        propertyGrid.appendChild(placeElement);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    console.log('Page loaded, calling fetchPlaces...');
    fetchPlaces();
});
