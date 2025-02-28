from flask_restx import Namespace, Resource, fields
from app.services.__init_ import facade

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

@api.route('/')
class PlaceList(Resource):
    @api.expect(place_model)
    @api.response(201, 'Place successfully created')
    @api.response(400, 'Invalid input data')
    def post(self):
        """Register a new place"""
        # Placeholder for the logic to register a new place
        place_data = api.payload

# curl -X POST http://127.0.0.1:5000/api/v1/places/ -H "Content-Type: application/json" -d '{"title": "Cozy", "description": "nice", "price": 100.0, "latitude": 37.7749, "longitude": -122.4194, "owner": "5a871b30-ec65-445a-945b-722f1605de7c"}'

        # Check if Owner owns place
        # check_owner = place_data.get('owner_id')
        # user = facade.get_user(check_owner)
        check_owner = facade.get_user(place_data['owner'])
        if not check_owner:
            return {'error': 'Not Owner'}, 400
        print(check_owner)
        
        new_place = facade.create_place(place_data)

        if new_place:
            return {'id': new_place.id,
                    'title': new_place.title,
                    'description': new_place.description,
                    'price': new_place.price,
                    'latitude': new_place.latitude,
                    'longitude': new_place.longitude,
                    'owner': new_place.owner
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

@api.route('/<place_id>')
class PlaceResource(Resource):
    @api.response(200, 'Place details retrieved successfully')
    @api.response(404, 'Place not found')
    def get(self, place_id):
        """Get place details by ID"""
        # Placeholder for the logic to retrieve a place by ID, including associated owner and amenities
        place = facade.get_place(place_id)
        user = facade.get_user(user_model.get(id))
        amenity = facade.get_amenity(amenity_model.get(id))

        if not place:
            return {'error': 'Place not found'}, 404
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
            'amenities': [
                {
                'id': amenity.id,
                'name': amenity.name
                },
                # {
                # 'id': amenity.id,
                # 'name': amenity.name
                # }
            ]
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
