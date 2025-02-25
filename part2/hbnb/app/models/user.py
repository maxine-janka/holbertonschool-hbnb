import re
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

    @property
    def first_name(self):
        return self._first_name

    @first_name.setter
    def first_name(self, value):
        if isinstance(value, str) and len(value) in range(0, 51):
            self._first_name = value
        else:
            raise ValueError("First name must be a maximum of 50 characters")
    
    @property
    def last_name(self):
        return self._last_name

    @last_name.setter
    def last_name(self, value):
        if isinstance(value, str) and len(value) in range(0, 51):
            self._last_name = value
        else:
            raise ValueError("Last name must be a maximum of 50 characters")

	@property
	def email(self):
    	return self._email
	
	@email.setter
	def email(self, value):
    
        
    def add_place(self, place):
        """User adds a place to list"""
        self.places.append(place)

    def add_review(self, review):
        """User can add a review"""
        self.reviews.append(review)

