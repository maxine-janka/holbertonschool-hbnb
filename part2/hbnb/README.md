### PROJECT DESCRIPTION &ensp; ✏️
<hr>
This is part 2 of the HBnB project and the first implemention phase of the HBnB application based on system designs in part 1.
This phase focuses on building the Presentation and Buisness Logic layers using Python and Flask. The core functionality and the foundations of the application operations were first implemented here including classes, methods and API endpoints. Postman and cURL were the tools used to test API endpoints and ensure edge cases were handled appropriately.

### PART 2 OBJECTIVES &ensp; ✅
<hr>

* Develop the core classes for the buisness logic, including: User, Place, Review and Amenity entities
* Implement the facade pattern to allow communication between the Presentation and Buisness Logic layers
* Add API endpoints to handle CRUD operations for Users, Places, Reviews and Amenities (Delete operations for User, Place and Amenity are implemented in part 3)
* Implement data serialization to return attributes that are related to the object. For example, the API will return the owner's details, such as the owner's first_name, last_name and email when fetching a Place details.
* Tests to validate the buisness logic behaviour
* Ensure API repsonses are consistent with expected behaviour
* Ensure API endpoints work correcrly and handle edge cases appropriately

### HOW TO INSTALL IT &ensp; 🔧
<hr>

The requirements needed for part 2 are:
* flask
* flaskrestx

To install the requirements, download the repository, navigate to the part2/hbnb folder and use the following command to install:
<br>

```
pip install -r requirements.txt
```

### HOW TO RUN IT &ensp; 🖥️
<hr>
Once requirments are installed. Run the run.py file to launch the application and start up the Flask development server.
This will allow the user to interact with the application locally.
<br>

```
python3 run.py
```
### API ENDPOINTS &ensp; ⚙️

__Users__:
* Create a User POST /api/v1/users
* Retrieve a User by ID GET /api/v1/users/<user_id>
* Retrieve a List of Users GET /api/v1/users/
* Update a User PUT /api/v1/users/<user_id>

__Amenities__:
* Register a new amenity POST /api/v1/amenities/
* Retrieve a list of all amenities GET /api/v1/amenities/
* Get amenity details by ID GET /api/v1/amenities/<amenity_id>
* Update an amenity's information PUT /api/v1/amenities/<amenity_id>

__Places__:
* Register a new place POST /api/v1/places/
* Return a list of all places GET /api/v1/places/
* Retrieve details of a specific place, including its associated owner and amenities GET /api/v1/places/<place_id>
* Update place information PUT /api/v1/places/<place_id>

__Reviews__:
* Register a new review POST /api/v1/reviews/
* Return a list of all reviews GET /api/v1/reviews/
* Retrieve details of a specific review GET /api/v1/reviews/<review_id>
* Retrieve all reviews for a specific place GET /api/v1/places/<place_id>/reviews
* Update a review’s information PUT /api/v1/reviews/<review_id>
* Delete a review DELETE /api/v1/reviews/<review_id>

### HOW TO USE IT &ensp; 🧑‍💻
<hr>
Use the following commands to test different endpoints using cURL:

### Test the creation of a new User
Possible status codes:
* 201: User successfully created
* 400: Email already registered
* 400: Invalid input data
```
curl -X POST http://127.0.0.1:5000/api/v1/users/ -H "Content-Type: application/json" -d
'{
    "first_name": "John",
    "last_name": "Doe",
    "email": "john.doe@example.com"
}'
```
### Expected Response
```
{
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "first_name": "John",
  "last_name": "Doe",
  "email": "john.doe@example.com"
}
```
### Test registering a new amenity
Possible status codes:
* 201: Amenity successfully created
* 400: Invalid input data
  
```
curl -X POST http://127.0.0.1:5000/api/v1/amenities/ -H "Content-Type: application/json" -d
'{
    "name": "Wi-Fi"
}'
```
### Expected Response
```
{
  "id": "1fa85f64-5717-4562-b3fc-2c963f66afa6",
  "name": "Wi-Fi"
}
```
### Test the creation of a Place
Possible status codes:
* 201: Place successfully created
* 400: Invalid input data
```
#  curl -X POST http://127.0.0.1:5000/api/v1/places/ -H "Content-Type: application/json" -d
'{
    "title": "Cozy Apartment",
    "description": "A nice place to stay",
    "price": 100.0,
    "latitude": 37.7749,
    "longitude": -122.4194,
    "owner": "<user_id>"
}'
```

### Expected Response
```
{
  "id": "1fa85f64-5717-4562-b3fc-2c963f66afa6",
  "title": "Cozy Apartment",
  "description": "A nice place to stay",
  "price": 100.0,
  "latitude": 37.7749,
  "longitude": -122.4194,
  "owner_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
}
```
### Test retreiving a Place details with listed amenities
Possible status codes:
* 201: Place details retrieved successfully
* 400: Place not found
```
curl -X GET http://127.0.0.1:5000/api/v1/places/<place_id> -H "Content-Type: application/json"
```

### Expected Response
🐛 Every amenity that is registered is added as an amenity to all created Places at the places/<place_id> endpoints. This has been debugged in part 3.
```
{
  "id": "1fa85f64-5717-4562-b3fc-2c963f66afa6",
  "title": "Cozy Apartment",
  "description": "A nice place to stay",
  "latitude": 37.7749,
  "longitude": -122.4194,
  "owner": {
    "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "first_name": "John",
    "last_name": "Doe",
    "email": "john.doe@example.com"
  },
  "amenities": [
    {
      "id": "1fa85f64-5717-4562-b3fc-2c963f66afa6",
      "name": "Wi-Fi"
    },
  ]
}
```

### Test adding a review by a second user:
Possible status codes:
* 201: Review successfully created
* 400: Invalid input data
```
#  curl -X POST http://127.0.0.1:5000/api/v1/reviews/ -H "Content-Type: application/json" -d
'{
    "text": "Great place to stay!",
    "rating": 5,
    "user_id": "<user_id>",
    place_id": "<place_id>"
}'
```
### Expected response:
```
{
  "id": "2fa85f64-5717-4562-b3fc-2c963f66afa6",
  "text": "Great place to stay!",
  "rating": 5,
  "user_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "place_id": "1fa85f64-5717-4562-b3fc-2c963f66afa6"
}
```

### CONTRIBUTORS 🧑‍💻👩‍💻🧑‍💻
Nigel Feng
<br>
Maxine Janka
<br>
Dieu Doan


