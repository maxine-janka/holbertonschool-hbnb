/* Review */

const stars = document.querySelectorAll(".star");
const rating = document.getElementById("rating");
const reviewText = document.getElementById("review");
const submitBtn = document.getElementById("submit");
const reviewsContainer = document.getElementById("reviews");


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

function getPlaceIdFromURL() {
	// Extract the place ID from window.location.search
	const idParam = new URLSearchParams(window.location.search);
	return idParam.get('placeId');
}

stars.forEach((star) => {
	star.addEventListener("click", () => {
		const value = parseInt(star.getAttribute("data-value"));
		rating.innerText = value;

		// Remove all existing classes from stars
		stars.forEach((s) => s.classList.remove("one", 
												"two", 
												"three", 
												"four", 
												"five"));

		// Add the appropriate class to 
		// each star based on the selected star's value
		stars.forEach((s, index) => {
			if (index < value) {
				s.classList.add(getStarColorClass(value));
			}
		});

		// Remove "selected" class from all stars
		stars.forEach((s) => s.classList.remove("selected"));
		// Add "selected" class to the clicked star
		star.classList.add("selected");
	});
});

submitBtn.addEventListener("click", (event) => {
	event.preventDefault();
	const review = reviewText.value;
	const userRating = parseInt(rating.innerText);
	const placeId = getPlaceIdFromURL();

	if (!userRating || !review) {
		alert("Please select a rating and provide a review before submitting.");
		return;
	}

	if (userRating > 0) {
		const reviewElement = document.createElement("div");
		reviewElement.classList.add("review");
		reviewElement.innerHTML = 
        `<p><strong>Rating: ${userRating}/5</strong></p><p>${review}</p>`;
		reviewsContainer.appendChild(reviewElement);

		submitReview(placeId, review, userRating);

		// Reset styles after submitting
		reviewText.value = "";
		rating.innerText = "0";
		stars.forEach((s) => s.classList.remove("one", 
												"two", 
												"three", 
												"four", 
												"five", 
												"selected"));
	}
});

function getStarColorClass(value) {
	switch (value) {
		case 1:
			return "one";
		case 2:
			return "two";
		case 3:
			return "three";
		case 4:
			return "four";
		case 5:
			return "five";
		default:
			return "";
	}
}

const modal = document.getElementById('myModal');
const btn = document.getElementById('review-button');
const span = document.getElementById('close');

btn.addEventListener('click', () => {
    modal.style.display = 'block';
});

span.addEventListener('click', () => {
    modal.style.display = 'none';
});

window.addEventListener('click', (event) => {
    if (event.target == modal) {
        modal.style.display = 'none';
    }
});

async function submitReview(placeId, reviewText, rating) {
    const token = checkAuthentication();
    if (!token) {
        alert('You are not authenticated. Please log in first.');
        return;
    }

	// Make a POST request to submit review data
	const url = 'http://127.0.0.1:5000/api/v1/reviews/';
	console.log(placeId, reviewText, rating)
    // Include the token in the Authorization header
	try {
		const response = await fetch(url, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': `Bearer ${token}`,
			},
			// Send placeId and reviewText in the request body
			body: JSON.stringify({placeId, reviewText, rating})
		});
		// Handle the response
		handleResponse(response);
	} catch (err) {
		alert(`Error: ${err.message}`);
	}
}

function handleResponse(response) {
    if (response.ok) {
        alert('Review submitted successfully!');
    } else {
        alert('Failed to submit review');
    }
}
