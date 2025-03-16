#!/usr/bin/python3
""" Unittests for HBnB Evolution v2 Part 3 """

import unittest
from app.models.user import User
from app.api.v1.auth import Login

class TestUser(unittest.TestCase):
    """Test that the User model works as expected
    """

    def test_create_user(self):
        """Tests creation of User instances """
        user = User(first_name="Peter", last_name="Parker", email="iluvspiderman@dailybugle.com")

        assert user.first_name == "Peter"
        assert user.last_name == "Parker"
        assert user.email == "iluvspiderman@dailybugle.com"
        assert user.password == "123"
        assert user.is_admin is False  # Default value
        print("User creation test passed!")

    def test_user_login(self):
        login = Login(email="iluvspiderman@dailybugle.com", password="123")

        assert login.email == "iluvspiderman@dailybugle.com"
        assert login.password == "123"

if __name__ == '__main__':
    unittest.main()
