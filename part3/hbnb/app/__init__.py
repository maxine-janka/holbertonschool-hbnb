from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_restx import Api

import config

# from app.services.facade import HBnBFacade

# facade = HBnBFacade()

db = SQLAlchemy()

def create_app(config_class=config.DevelopmentConfig):
    app = Flask(__name__)
    api = Api(app, version='1.0', title='HBnB API', description='HBnB Application API', doc='/api/v1/')
    app.config.from_object(config_class)
    db.init_app(app)

    from app.api.v1.users import api as users_ns
    from app.api.v1.amenities import api as amenities_ns
    from app.api.v1.places import api as places_ns
    from app.api.v1.reviews import api as reviews_ns
    
    # Register the users namespace
    api.add_namespace(users_ns, path='/api/v1/users')
    api.add_namespace(amenities_ns, path='/api/v1/amenities')
    api.add_namespace(places_ns, path='/api/v1/places')
    api.add_namespace(reviews_ns, path='/api/v1/reviews')

    return app
