PROJECT DESCRIPTION
This repository contains an application that replicates a simplified version of an Airbnb-like web application. This project was built for educational purposes for Holberton School Australia.
The aim of this project was to gain an understanding of the stages of full-stack web development - from design and architecture through to implementation.

The application allows users to perform the following operations:

1. User Management
   Users can register, update their profule and be identified as a regular user or administrator.
    
3. Place Management
   Users can list a place they own and specify the details including: name, description location (latitude and longitude).
   Places also have a list of amenitites.
   
4. Review Management
   Users can leave reiews for places they have visitied, inclusing a rating and a comment.
   
5. Amenity Management
   Amenities can be added and associated with places.

ARCHITECTURE AND LAYERS
The application follows a 3 layered architecture with communication between these layers via a facade pattern.

1. Presentation Layer: Manages the interaction between the user and the application. it includes user-facing services and APIs eposed to the user.
2. Buisness Logic Layer: Contains the applications core buisness logic and defines the models; User, Place, Review and Amenity that represent the key system entities.
3. Persistence Layer: Handles the data storage and retrieval, serving as an interface between the application and the database.

TECHNOLOGIES USED
The main technologies used to build the application inlcude:
Python3
Flask RESTfulAPI
MySQL
HTML5/CSS3/JavaScript ES6

PROJECT STRUCTURE AND DEVELOPMENT PHASES
The project was split into 4 parts. Part 2, 3 and 4 are separate codebases that build the respective previous version.

Part 1: Technical documentation
  
Part 2: Implementation of Buisness Logic and API Endpoints

Part 3: Enhanced Backend with Authentication and Database Integration

Part 4:  Simple Web Client

CONTRIBUTORS
Nigel Feng
Maxine Janka
Dieu Dohn
