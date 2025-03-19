from app import db
from app.models.basemodel import BaseModel
from app.models.place import Place
from app.models.user import User
from sqlalchemy.ext.hybrid import hybrid_property

class Review(BaseModel):
    __tablename__ = 'reviews'

    _text = db.Column(db.String(100), nullable=False)
    _rating = db.Column(db.String(2), nullable=False)
    _place_id = db.Column(db.String(100), nullable=False)
    _user = db.Column(db.String(100), nullable=False)

    def __init__(self, text, rating, place_id, user):
        super().__init__()
        self.text = text
        self.rating = rating
        self.place_id = place_id
        self.user = user

    @hybrid_property
    def text(self):
        return self._text

    @text.setter
    def text(self, value):
        if value:
            self._text = value
        else:
            raise ValueError("Text required")

    @hybrid_property
    def rating(self):
        return self._rating

    @rating.setter
    def rating(self, value):
        if isinstance(value, int) and value in range(1, 6):
           self._rating = value
        else:
            raise ValueError("Ratings must be between 1 and 5") 

    @hybrid_property
    def place_id(self):
        return self._place_id

    @place_id.setter
    def place_id(self, value):
        if isinstance(value, Place):
            self._place_id = value
        else:
            raise ValueError("Review: Place does not exist")

    @hybrid_property
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
            'text': self.text,
            'rating' : self.rating,
            'place_id' : self.place_id,
            'user' : self.user
        }
