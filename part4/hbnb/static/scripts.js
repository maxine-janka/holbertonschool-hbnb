// Fetch the token from stored cookie
function fetchCookie(name) {
    const tokenStr = `${document.cookie}`;
    //console.log(tokenStr);
    token = tokenStr.split("token=")[1];
   // console.log(token);
    if (!token)
        return null
    return token
} 

let places;
async function fetchPlaces() {
    try {
        const response = await axios.get('http://127.0.0.1:5000/api/v1/places/', {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        places = response.data;
        //console.log(places);
        

    } catch (error) {
        console.error('Error fetching places:', error);
        return;
    }
    displayPlaces(places);   
}

function displayPlaces(places) {
    //console.log(places);
    const propertyGrid = document.getElementById('hbnb-property-grid');
    propertyGrid.innerHTML = '';
    places.forEach(place => {
        const placeElement = document.createElement('section');
        placeElement.className = 'property-grid-item';
        placeElement.innerHTML = `<a href="place.html?placeId=${place.id}" class="property-link"><div class="property-grid-item-image property-image-1"></div>
            <ul class="property-grid-item-details">
                <li class="property-grid-item-location">${place.title}</li>
                <li class="property-grid-item-description">${place.description}</li>
                <li class="property-grid-item-price">$${place.price} per night</li>
            </ul></a>`;
        propertyGrid.appendChild(placeElement);
    });
}

// Filter place by price
const priceFilter = document.getElementById('price-filter');
    priceFilter.addEventListener('change', (event) => {
        filterPlaceByPrice(event.target.value);
    });

function filterPlaceByPrice(selectedPrice) {
    if (selectedPrice === 'all') {
        displayPlaces(places);
        return;
    }

    const price = parseInt(selectedPrice);
    //console.log(price);

    const filteredPlaces = places.filter(place => {
        let Listedprice = place.price;
        //console.log(Listedprice);
        //console.log(places)
        //Only return filtered place objects from places array
        return Listedprice <= price;
    });
    //console.log(filteredPlaces)
    displayPlaces(filteredPlaces);
}

document.addEventListener('DOMContentLoaded', () => {

    const token = fetchCookie();
    const loginButton = document.getElementById('login-button');
    if (token) {
        loginButton.textContent = 'Logout';
        loginButton.href ='#';
        loginButton.addEventListener('click', (e) => {
            e.preventDefault();
            document.cookie = "token=; expires=Thu, 01 Jan 1970  00:00:00 UTC; path=/";
            //console.log('token cookie cleared');
            //console.log("Current cookies:", document.cookie);
            loginButton.innerHTML = `<i class="material-icons">perm_identity</i>
            <p>Login</p>`
            loginButton.addEventListener('click', (e) => {
                window.location.href = 'login.html';
            })
        });
    } else {
        loginButton.innerHTML = `<i class="material-icons">perm_identity</i>
            <p>Login</p>`
        };

    //console.log('Page loaded, call fetchPlaces');
    fetchPlaces();
});
