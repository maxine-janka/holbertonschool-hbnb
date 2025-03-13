from app import db
import re
from app.models.basemodel import BaseModel



class User(BaseModel):
    __tablename__ = 'users'

    first_name = db.Column(db.String(50), nullable=False)
    last_name = db.Column(db.String(50), nullable=False)
    email = db.Column(db.String(120), nullable=False, unique=True)
    password = db.Column(db.String(128), nullable=False)
    is_admin = db.Column(db.Boolean, default=False)

    @property
    def first_name(self):
        return self._first_name

    @first_name.setter
    def first_name(self, value):
        if isinstance(value, str) and len(value) in range(51):
            self._first_name = value
        else:
            raise ValueError("First name must be a maximum of 50 characters")

    @property
    def last_name(self):
        return self._last_name

    @last_name.setter
    def last_name(self, value):
        if isinstance(value, str) and len(value) in range(51):
            self._last_name = value
        else:
            raise ValueError("Last name must be a maximum of 50 characters")

    @property
    def email(self):
        return self._email

    @email.setter
    def email(self, value):
        # Email not empty
        if not value:
            raise ValueError("Email is required")
        # check email format
        pattern = (r"^(?!\.)(?!.*\.\.)[a-zA-Z0-9.!#$%&'*+/=?^_{|}~-]+"

                            r"@[a-zA-Z0-9-]+\.[a-zA-Z]{2,}$")

        if not re.fullmatch(pattern, value):
            raise ValueError("Required, must be unique,"
                             "and should follow standard email format validation.")
        self._email = value

    @property
    def is_admin(self):
        return self._is_admin

    @is_admin.setter
    def is_admin(self, value):
        if isinstance(value, bool):
            self._is_admin = value
        else:
            raise ValueError("Must be boolean value")

    def add_place(self, place):
        """User adds a place to list"""
        self.places.append(place)

    def add_review(self, review):
        """User can add a review"""
        self.reviews.append(review)
    
    def hash_password(self, password):
        """Hash the password before storing it."""
        self.password = bcrypt.generate_password_hash(password).decode('utf-8')

    def verify_password(self, password):
        """Verify the hashed password."""
        return bcrypt.check_password_hash(self.password, password)
