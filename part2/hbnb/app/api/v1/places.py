from flask_restx import Namespace, Resource, fields
from app.services.__init_ import facade
from app.models.place import Place


api = Namespace('places', description='Place operations')

# Define the models for related entities
amenity_model = api.model('PlaceAmenity', {
    'id': fields.String(description='Amenity ID'),
    'name': fields.String(description='Name of the amenity')
})

user_model = api.model('PlaceUser', {
    'id': fields.String(description='User ID'),
    'first_name': fields.String(description='First name of the owner'),
    'last_name': fields.String(description='Last name of the owner'),
    'email': fields.String(description='Email of the owner')
})

# Define the place model for input validation and documentation
place_model = api.model('Place', {
    'title': fields.String(required=True, description='Title of the place'),
    'description': fields.String(description='Description of the place'),
    'price': fields.Float(required=True, description='Price per night'),
    'latitude': fields.Float(required=True, description='Latitude of the place'),
    'longitude': fields.Float(required=True, description='Longitude of the place'),
    'owner_id': fields.String(required=True, description='ID of the owner'),
    'amenities': fields.List(fields.String, required=True, description="List of amenities ID's")
})

# Adding the review model
review_model = api.model('PlaceReview', {
    'id': fields.String(description='Review ID'),
    'text': fields.String(description='Text of the review'),
    'rating': fields.Integer(description='Rating of the place (1-5)'),
    'user_id': fields.String(description='ID of the user')
})

place_model = api.model('Place', {
    'title': fields.String(required=True, description='Title of the place'),
    'description': fields.String(description='Description of the place'),
    'price': fields.Float(required=True, description='Price per night'),
    'latitude': fields.Float(required=True, description='Latitude of the place'),
    'longitude': fields.Float(required=True, description='Longitude of the place'),
    'owner_id': fields.String(required=True, description='ID of the owner'),
    'owner': fields.Nested(user_model, description='Owner of the place'),
    'amenities': fields.List(fields.Nested(amenity_model), description='List of amenities'),
    'reviews': fields.List(fields.Nested(review_model), description='List of reviews')
})

@api.route('/')
class PlaceList(Resource):
    @api.expect(place_model)
    @api.response(201, 'Place successfully created')
    @api.response(400, 'Invalid input data')
    def post(self):
        """Register a new place"""
        # Placeholder for the logic to register a new place
        place_data = api.payload

        owner_id = facade.get_user(place_data['owner'])
        # print(type(check_owner))
        # print(check_owner.id)
        if not owner_id:
            return {'error': 'Not Owner'}, 404

        # Pass directly to Place Class
        new_place = Place(
                title=place_data['title'],
                description=place_data.get('description'),
                price=place_data['price'],
                latitude=place_data['latitude'],
                longitude=place_data['longitude'],
                owner=owner_id
            )
        # Convert to dictionary
        place_dict = new_place.to_dict()
        # Add new place
        add_place = facade.create_place(place_dict)

        if add_place:
            return {
                'id': add_place.id,
                'title': add_place.title,
                'description': add_place.description,
                'price': add_place.price,
                'latitude': add_place.latitude,
                'longitude': add_place.longitude,
                'owner': owner_id.id
            }, 201
        else:
            return {'error': 'Invalid input data'}, 400

    @api.response(200, 'List of places retrieved successfully')
    def get(self):
        """Retrieve a list of all places"""
        # Placeholder for logic to return a list of all places
        all_places = facade.get_all_places()
        list_all_places = []
        for place in all_places:
            list_all_places.append({
                'id': str(place.id),
                'title': place.title,
                'latitude': place.latitude,
                'longitude': place.longitude,
            })
        return list_all_places, 200

@api.route('/<place_id>')
class PlaceResource(Resource):
    @api.response(200, 'Place details retrieved successfully')
    @api.response(404, 'Place not found')
    def get(self, place_id):
        """Get place details by ID"""
        # Placeholder for the logic to retrieve a place by ID, including associated owner and amenities
        place = facade.get_place(place_id)
        user = facade.get_user(place.owner)
        all_amenity = facade.get_all_amenities()

        if not place:
            return {'error': 'Place not found'}, 404

        list_all_amenity = []
        for amenity in all_amenity:
            list_all_amenity.append({
                'id': str(amenity.id),
                'name': amenity.name
            })
        amenity_data = list_all_amenity

        return {
            'id': place.id,
            'title': place.title,
            'description': place.description,
            'latitude': place.latitude,
            'longitude': place.longitude,
            'owner': {
                'id': user.id,
                'first_name': user.first_name,
                'last_name': user.last_name,
                'email': user.email
            },
            "amenities": amenity_data
        }, 200

    @api.expect(place_model)
    @api.response(200, 'Place updated successfully')
    @api.response(404, 'Place not found')
    @api.response(400, 'Invalid input data')
    def put(self, place_id):
        """Update a place's information"""
        # Placeholder for the logic to update a place by ID
        place_data = api.payload
        place_exists = facade.get_place(place_id)
        if place_exists:
            facade.update_place(place_id, place_data)
            return {"message": "Place updated successfully"}, 200
        else:
            return {'error': 'Place not found'}, 404


        ### CURL COMMMANDS TO TEST HHTP REQUESTS ###
# Register a New Place
# curl -X POST http://127.0.0.1:5000/api/v1/places/ -H "Content-Type: application/json" -d '{"title": "Cozy", "description": "nice", "price": 100.0, "latitude": 37.7749, "longitude": -122.4194, "owner": "user_id"}'

# Retrieve All Places
# curl -X GET http://127.0.0.1:5000/api/v1/places/ -H "Content-Type: application/json"

# Retrieve Place Details
# curl -X GET http://127.0.0.1:5000/api/v1/places/<place_id> -H "Content-Type: application/json"

# Update a Place’s Information
# curl -X PUT http://127.0.0.1:5000/api/v1/places/<place_id> -H "Content-Type: application/json"
