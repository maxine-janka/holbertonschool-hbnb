from app.models.basemodel import BaseModel

class Review(BaseModel):
    def __init__(self, text, rating, place, user):
        super().__init__()
        self.text = text
        self.rating = rating
        self.place = place
        self.user = user

    @property
    def text(self):
    
    @text.setter
    def text(self, value):


    @property
    def rating(self):
        pass

    @rating.setter
    def rating(self, value):
        pass

    @property
    def place(self):
        pass

    @place.setter
    def place(self, value):
        pass

    @property
    def user(self):
        pass

    @user.setter
    def user(self, value):
        pass
