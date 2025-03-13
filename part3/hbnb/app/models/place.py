from app.models.basemodel import BaseModel
from app.models.user import User

class Place(BaseModel):
    def __init__(self, title, description, price, latitude, longitude, owner):
        super().__init__()
        self.title = title
        self.description = description
        self.price = price
        self.latitude = latitude
        self.longitude = longitude
        self.owner = owner
        self.reviews = []  # List to store related reviews
        self.amenities = []  # List to store related amenities

    @property
    def title(self):
        return self._title

    @title.setter
    def title(self, value):
        if len(value) in range(101):
            self._title = value
        else:
            raise ValueError("title must be a maximum of 100 characters")

    @property
    def price(self):
        return self._price

    @price.setter
    def price(self, value):
        if (isinstance(value, float) or isinstance(value, int)) and value > 0.0:
            self._price = value
        else:
            raise ValueError("Must be a positive value and float")

    @property
    def latitude(self):
        return self._latitude

    @latitude.setter
    def latitude(self, value):
        if isinstance(value, float) and (-90.00 < value < 90.00):
            self._latitude = value
        else:
            raise ValueError("Must be within the range of -90.0 to 90.0 and float")

    @property
    def longitude(self):
        return self._latitude

    @longitude.setter
    def longitude(self, value):
        if isinstance(value, float) and (-180.0 < value < 180.0):
            self._longitude = value
        else:
            raise ValueError("Must be within the range of -90.0 to 90.0 and float")

    @property
    def owner(self):
        return self._owner

# User instance of who owns the place. This should be validated to ensure the owner exists.
    @owner.setter
    def owner(self, value):
        if isinstance(value, User):
            self._owner = value
        else:
            raise ValueError("Owner must be validated")

    def to_dict(self):
        """Converty to dictionary method"""
        return {
            'title': self.title,
            'description': self.description,
            'price': self.price,
            'latitude': self.latitude,
            'longitude': self.longitude,
            'owner': self.owner.id
        }


    def add_review(self, review):
        """Add a review to the place."""
        self.reviews.append(review)

    def add_amenity(self, amenity):
        """Add an amenity to the place."""
        self.amenities.append(amenity)
