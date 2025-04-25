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

// form submit
document.addEventListener('DOMContentLoaded', () => {
	const reviewForm = document.getElementById('review-form');
	const token = getCookie('token');
	const placeId = getPlaceIdFromURL();
	// click star rating and write text
	submitBtn.addEventListener("click", () => {
		if (reviewForm) {
			reviewForm.addEventListener('submit', async (event) => {
			event.preventDefault();
			// Get review text from form
			const review = reviewText.value;
			const userRating = parseInt(rating.innerText);

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

				// Make AJAX request to submit review
				await submitReview(token, placeId, review, userRating);
		
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
		}
	});
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


async function submitReview(token, placeId, reviewText, rating) {
    // Make a POST request to submit review data
    // Include the token in the Authorization header
    // Send placeId and reviewText in the request body
	const url = 'http://127.0.0.1:5000/api/v1/reviews/';
	try {
		const form = document.getElementById('review-form');
		const formData = new FormData(form);
		formData.append("text", `${reviewText}`);
		formData.append("rating", `${rating}`);
		formData.append("place_id", `${placeId}`);

		for (item of formData) {
			console.log(item[0], item[1]);
		}

		const response = await fetch(url, {
			method: 'POST',
			headers: {
				'Authorization': `Bearer ${token}`, // JWT token
				'Content-Type': 'application/json'
			},
			body: formData
		});

		console.log(response);
		// Handle the response
		handleResponse(response);
	} catch (err) {
		alert(`Error: ${err.message}`);
	}
}

function handleResponse(response) {
    if (response.ok) {
        alert('Review submitted successfully!');
        // Clear the form
    } else {
        alert('Failed to submit review');
    }
}
