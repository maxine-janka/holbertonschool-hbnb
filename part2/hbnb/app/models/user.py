from app.models.basemodel import BaseModel

class User(BaseModel):
    def __init__(self, first_name, last_name, email, is_admin=False):
        super().__init__()
        self.first_name = first_name
        self.last_name = last_name
        self.email = email
        self.is_admin = is_admin
        self.places = []
        self.reviews = []

    def add_place(self, place):
        """User adds a place to list"""
        self.places.append(place)

    def add_review(self, review):
        """User can add a review"""
        self.reviews.append(review)
