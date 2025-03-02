from flask_restx import Namespace, Resource, fields
from app.services.__init_ import facade
from app.models.review import Review

api = Namespace('reviews', description='Review operations')

# Define the review model for input validation and documentation
review_model = api.model('Review', {
    'text': fields.String(required=True, description='Text of the review'),
    'rating': fields.Integer(required=True, description='Rating of the place (1-5)'),
    'user_id': fields.String(required=True, description='ID of the user'),
    'place_id': fields.String(required=True, description='ID of the place')
})

@api.route('/')
class ReviewList(Resource):
    @api.expect(review_model)
    @api.response(201, 'Review successfully created')
    @api.response(400, 'Invalid input data')
    def post(self):
        """Register a new review"""
        # Placeholder for the logic to register a new review
        review_data = api.payload

        # Check User id
        owner_id = facade.get_user(review_data['user'])
        if not owner_id:
            return {'error': 'Not User'}, 404

        # Check Place id
        place_id = facade.get_place(review_data['place'])
        if not place_id:
            return {'error': 'Not Place'}, 404

        # Pass directly to Review Class
        new_review = Review(
            text=review_data['text'],
            rating=review_data['rating'],
            user=owner_id,
            place=place_id
        )

        # Convert to dictionary
        review_dict = new_review.to_dict()
        # Add new review
        add_review = facade.create_place(review_dict)

        if add_review:
            return {'text': add_review.text, 'rating': add_review.rating, 'place': place_id.id, 'user': owner_id.id}, 201
        else:
            return {'error': 'Invalid input data'}, 400

    @api.response(200, 'List of reviews retrieved successfully')
    def get(self):
        """Retrieve a list of all reviews"""
        # Placeholder for logic to return a list of all reviews
        all_reviews = facade.get_all_reviews()
        list_all_reviews = []
        for review in all_reviews:
            list_all_reviews.append({
                'text': review.text,
                'rating' : review.rating,
                'place' : review.place,
                'user' : review.user
            })
        return list_all_reviews, 200

@api.route('/<review_id>')
class ReviewResource(Resource):
    @api.response(200, 'Review details retrieved successfully')
    @api.response(404, 'Review not found')
    def get(self, review_id):
        """Get review details by ID"""
        # Placeholder for the logic to retrieve a review by ID
        review = facade.get_review(review_id)
        if review: 
            return review, 200
        else:
            return {'Error': 'Review not found'}, 404

    @api.expect(review_model)
    @api.response(200, 'Review updated successfully')
    @api.response(404, 'Review not found')
    @api.response(400, 'Invalid input data')
    def put(self, review_id):
        """Update a review's information"""
        review_exist = facade.get_review(review_id)
        review_data = api.payload
        if review_exist:
            review_up = facade.update_review(review_id, review_data)
            return {'text': review_up.text, 'rating': review_up.rating, 'place': review_up.place, 'user': review_up.user }, 200
        else: 
            return {'Error': 'Review not found'}, 404


    @api.response(200, 'Review deleted successfully')
    @api.response(404, 'Review not found')
    def delete(self, review_id):
        """Delete a review"""
        # Placeholder for the logic to delete a review
        review_exist = facade.get_review(review_id)
        if review_exist:
            facade.delete_review(review_id)
            return 200
        else:
            return {'Error': 'Review not found'}, 404

@api.route('/places/<place_id>/reviews')
class PlaceReviewList(Resource):
    @api.response(200, 'List of reviews for the place retrieved successfully')
    @api.response(404, 'Place not found')
    def get(self, place_id):
        """Get all reviews for a specific place"""
        # Placeholder for logic to return a list of reviews for a place
        review_by_attr = []
        while facade.get_reviews_by_place(place_id):
            review_by_attr.append(facade.get_reviews_by_place)
        if review_by_attr:
            return review_by_attr, 200
        else:
            return {'Error': 'Place not found'}, 404
        
        ### CURL COMMMANDS TO TEST HHTP REQUESTS ###
#  Register new Review:
#  curl -X POST http://127.0.0.1:5000/api/v1/reviews/ -H "Content-Type: application/json" -d '{"text": "Great place to stay!", "rating": 5, "user_id": "<user_id>", "place_id": "<place_id>"}'

#  Retrieve All Reviews:
#  curl -X GET "http://127.0.0.1:5000/api/v1/reviews/" -H "Content-Type: application/json"

#  Retrieve a Review’s Details:
#  curl -X GET "http://127.0.0.1:5000/api/v1/reviews/<review_id>" -H "Content-Type: application/json" -d '{"id": "<review_id>", "text": "Great place to stay!", "rating": 5, "user_id": "<user_id>", "place_id": "<place_id>"}'

#  Update a Review’s Information:
#  curl -X PUT http://127.0.0.1:5000/api/v1/reviews/<review_id> -H "Content-Type: application/json" -d '{"text": "Amazing stay!", "rating": 4}'

#  Delete a Review:
#  curl -X DELETE http://127.0.0.1:5000/api/v1/<review_id> -H "Content-Type: application/json"

#  Retrieve All Reviews for a Specific Place:
#  curl -X GET http://127.0.0.1:5000/api/v1/places/<place_id>/reviews -H "Content-Type: application/json"
