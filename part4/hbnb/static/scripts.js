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
        placeElement.innerHTML = `
        <a href="place.html?placeId=${place.id}" class="property-link">
            <div class="property-grid-item-image property-image-1"></div>
            <div class="property-grid-details">
                <p class="property-grid-item-location">${place.title}</p>
                <p class="property-grid-item-description">${place.description}</p>
                <p class="property-grid-item-price">$${place.price} per night</p>
            </div>
        </a>`;
        propertyGrid.appendChild(placeElement);
    });
}

//Function to apply price and search filter
function applyFilters() {
    const titleSearchQuery = document.getElementById('title-search').value;
    //console.log(titleSearchQuery);
    const selectedPrice = document.getElementById('price-filter').value;
    // console.log(selectedPrice);

    //places array
    let filteredPlaces = places;

    // filter title search when not empty
    if (titleSearchQuery) {
        filteredPlaces = filteredPlaces.filter(place =>
            place.title.toLowerCase().includes(titleSearchQuery.toLowerCase())
        );
    }

    // filter price
    if (selectedPrice !== 'all') {
        const SelectedPriceAsInt = parseInt(selectedPrice);
        filteredPlaces = filteredPlaces.filter(place => place.price <= SelectedPriceAsInt);
        }

        // Call display places with applied filters
        console.log(filteredPlaces);
        displayPlaces(filteredPlaces);
    }

    

// Filter by title - Search button event listener
const searchButton = document.getElementById('search-button');
//console.log(searchButton);
searchButton.addEventListener('click', applyFilters);

// Filter place by price - Dropdown event listener
const priceFilter = document.getElementById('price-filter');
    priceFilter.addEventListener('change', applyFilters);

// Search on pressing enter key
document.getElementById('title-search').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        applyFilters();
    }
});

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
