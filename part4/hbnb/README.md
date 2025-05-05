### PROJECT DESCRIPTION &ensp; ✏️
<hr>
This is part 4 of the HBnB project and the final implemention of the HBnB application.
This phase focuses on designing and implementing the front-end of the application using HTML5, CSS3, and JavaScript ES6.
The front-end will be an interactive user interface that connects with the back-end services previously developed in part 3.

### PART 4 OBJECTIVES &ensp; ✅
<hr>

### Overall
<hr>

* Develop a user-friendly interface following provided design specifications.
* Implement client-side functionality to interact with the back-end API.
* Ensure secure and efficient data handling using JavaScript.
* Apply modern web development practices to create a dynamic web application.

### Design and Structure (HTML5 and CSS3)
<hr>

* Structure the web pages of the HBnB application using HTML5.
* Design and style using CSS3.
* Create the following pages:<br>
    1. Login Form
    2. Index Page (List of Places)
    3. Place Details
    4. Review Form

### Functionality (JavaScript ES6)
<hr>

#### Login Form
* Make an AJAX request to the login endpoint of your API when the user submits the login form.
* If the login is successful, store the JWT token in a cookie.
* Redirect the user to the main page (index.html) after a successful login.
* Display an error message if the login fails.

#### Index Page
* Implement the main page to display a list of all places.
* Make an AJAX request to the API to fetch the list of places.
* Populate the places list dynamically using JavaScript.
* Implement a client-side filter to allow users to filter places by price without reloading the page.
* Show or hide the login link based on user authentication.

#### Place Details
* Display detailed information about the place, including name, description, price, amenities and reviews.
* Make an AJAX request to the API to fetch the details of the selected place.
* If the user is authenticated, provide access to the form for adding a review.

#### Review Form
* Make an AJAX request to the API to submit the review data.
* Ensure only authenticated users can submit reviews.
* Display a success message upon successful submission and handle errors appropriately.

### HOW TO INSTALL IT &ensp; 🔧
<hr>

### Back-end
<hr>

The requirements needed for part 4 are:
* flask
* flaskrestx
* flask-bcrypt
* flask-jwt-extended
* sqlalchemy
* flask-sqlalchemy

To install the requirements, download the repository, navigate to the part4/hbnb folder and use the following command to install:
<br>

```
pip install -r requirements.txt
```

Note: This process is the same as part 3.

### Front-end
<hr>

* Install VS Code - Live Preview extension


### HOW TO RUN IT &ensp; 🖥️
<hr>

### Back-end
<hr>

Once requirments are installed, ensure the MySQL server is running and initialise the database. This can be done in flask shell.
Run the run.py file to launch the application and start up the Flask development server.
This will allow the user to interact with the application locally.
<br>

```
flask shell
>>> from app import db
>>> db.create_all()
```

```
python3 run.py
```

### Front-end
<hr>

Use the two options below:
* Use Live Preview extension to open any one of the HTML code
(index, login, place, review).
* Paste your local host url.
eg. http://localhost:3000/part4/hbnb/static/index.html or http://127.0.0.1:3000/part4/hbnb/static/index.html to your web browser.


### API ENDPOINTS &ensp; ⚙️

Refer back to Part 3.

### HOW TO USE IT &ensp; 🧑‍💻
<hr>

There are four web pages that are implemented in the project.
1. Login Form
2. Index Page (List of Places)
3. Place Details
4. Review Form

Note: Creating new users, places and amenities are not implemented in this application. Refer to part 3 to create.

### 1. Login Form
<hr>

* Click on the Login button at the top right corner of the page to open the Login form.
* Enter user email and password to log in.

![HBnB login form](./README%20images/HBnB_login.png)

* Once logged in, it will take you back to the previous page you were on. But the login button will be a Logout button.
* Click on the Logout button to log out.

![Log out](./README%20images/Login_button.png)

### 2. Index Page
<hr>

* The Home/Index page displays the list of places available.
* Click on the hbnb logo to take you back to the home page.
* Use Search and Filter bar. Date bar currently not implemented.
* Click on a place to move to place detail page.

![HBnB index page](./README%20images/HBnB_index.png)

### 3. Place Details
<hr>

* The Place details page displays the information of the place.

![HBnB place page](./README%20images/HBnB_Place.png)

### 4. Review Form
<hr>

* The Review button will not be displayed if the user is not logged in. Once logged in, the button will appear.

![Review button](./README%20images/Review_Button.png)

* Click on the review button to open the Review form.
* Begin writing a review and give a star rating.

![HBnB review form](./README%20images/HBnB_Review.png)

* Once the review is submitted, the form will close and the review will be added to the Place details page.

![Review added](./README%20images/HBnB_Review_added.png)


### CONTRIBUTORS 🧑‍💻👩‍💻
Nigel Feng
<br>
Maxine Janka


