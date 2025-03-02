from app.models.basemodel import BaseModel
from app.models.place import Place
from app.models.user import User

class Review(BaseModel):
    def __init__(self, text, rating, place, user):
        super().__init__()
        self.text = text
        self.rating = rating
        self.place = place
        self.user = user

    @property
    def text(self):
        return self._text

    @text.setter
    def text(self, value):
        if value:
            self._text = value
        else:
            raise ValueError("Text required")

    @property
    def rating(self):
        return self._rating

    @rating.setter
    def rating(self, value):
        if isinstance(value, int) and value in range(1, 6):
           self._rating = value
        else:
            raise ValueError("Ratings must be between 1 and 5") 

    @property
    def place(self):
        return self._place

    @place.setter
    def place(self, value):
        if isinstance(value, Place):
            self._place = value
        else:
            raise ValueError("Review: Place does not exist")

    @property
    def user(self):
        return self._user

    @user.setter
    def user(self, value):
        if isinstance(value, User):
            self._user = value
        else:
            raise ValueError("Review: Owner must be validated")

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
