# from app.models.basemodel import BaseModel
from app import db, bcrypt
from .basemodel import BaseModel
from sqlalchemy.ext.hybrid import hybrid_property

class Amenity(BaseModel):
    __tablename__ = 'amenities'
        
    _name = db.Column(db.String(50), nullable=False)
   
    def __init__(self, name):
        super().__init__()
        self.name = name

    @hybrid_property
    def name(self):
        return self._name

    @name.setter
    def name(self, value):
        if value and len(value) <= 50:
            self._name = value
        else:
            raise ValueError("Maximum length of 50 characters.")
