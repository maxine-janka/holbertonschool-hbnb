
from app.models.basemodel import BaseModel

class Amenity(BaseModel):
    def __init__(self, name):
        super().__init__()
        self.name = name

    @property
    def name(self):
        return self._name

    @name.setter
    def name(self, value):
        if value and len(value) <= 50:
            self._name = value
        else:
            raise ValueError("Maximum length of 50 characters.")
