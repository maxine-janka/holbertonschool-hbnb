
### PROJECT DESCRIPTION  &ensp; ✏️
***
This repository contains an application that replicates a simplified version of an Airbnb-like web application. This project was built for educational purposes for Holberton School Australia.
The aim of this project was to gain an understanding of the stages of full-stack web development - from design and architecture through to implementation.

The application allows users to perform the following operations:

__User Management__
<br>
   Users can register, update their profule and be identified as a regular user or administrator.
    
__Place Management__
 <br>
   Users can list a place they own and specify the details including: name, description location (latitude and longitude).
   Places also have a list of amenitites.
   
__Review Management__
<br>
   Users can leave reiews for places they have visitied, inclusing a rating and a comment.
   
__Amenity Management__
<br>
   Amenities can be added and associated with places.

### ARCHITECTURE AND LAYERS  &ensp; 📚
***
The application follows a 3 layered architecture with communication between these layers via a __facade pattern__.

__1. Presentation Layer:__
  <br>
   Manages the interaction between the user and the application. it includes user-facing services and APIs eposed to the user.
 
__2. Buisness Logic Layer:__
<br>
     Contains the applications core buisness logic and defines the models; User, Place, Review and Amenity that represent the key system entities.
     
__3. Persistence Layer:__
<br>
   Handles the data storage and retrieval, serving as an interface between the application and the database.

### TECHNOLOGIES USED  &ensp;  💡
***
The main technologies used to build the application inlcude:
<br>
<br>
Python3
<br>
Flask RESTfulAPI
<br>
MySQL
<br>
HTML5/CSS3/JavaScript ES6

### PROJECT STRUCTURE AND DEVELOPMENT PHASES  &ensp; 🛠️
***
The project was split into 4 parts. Part 2, 3 and 4 are separate codebases that build on the previous version.
A more detailed description of each part can be found in respective directories.

__Part 1: Technical documentation__
<br>
To steer the implementation phases, the overall architecture, business logic, and system interactions were documented using three different diagram styles.
  
__[Part 2](https://github.com/maxine-janka/holbertonschool-hbnb/tree/master/part2/hbnb): Implementation of Buisness Logic and API Endpoints__
<br>
In this phase the documented architecture was transformed by developing the application's core functionality. The Presenation and Buisness Logic Layers were built using Python and Flask. Key classes, methods, enetity relationships and API endpoints fore CRUD operations were implemented and tested.  An in-memory repository was used for object storage and validation, in preparation for persistence layer integration in Part 3.

__[Part 3](https://github.com/maxine-janka/holbertonschool-hbnb/tree/master/part3/hbnb): Enhanced Backend with Authentication and Database Integration__
<br>
In part 3 the backend was extended through user autheniticatin, authorization and database integration. JWT-based user autheniication was implemeted with Flask-JWT-Extened, in-memory storage was replaced with MySQL using SQLAlchemy as the ORM, all CRUD oerations were refactored and relationships between entities were correctly mapped.

__[Part 4](): Simple Web Client__
<br>
In the final phase, an interactive user-interface connecting the backend services was designed and implementedd using HTML5, CSS3, and JavaScript ES6.

### CONTRIBUTORS  🧑‍💻👩‍💻🧑‍💻
***
Nigel Feng
<br>
Maxine Janka
<br>
Dieu Doan
