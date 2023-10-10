#!/usr/bin/python3
# This is the shebang line, which tells the system that this file should be run using Python 3.

""" Starts a Flash Web Application """
# This is a module-level docstring, describing what the module does.

from models import storage
# Importing the 'storage' object from the 'models' module.

from models.state import State
# Importing the 'State' class from the 'models.state' module.

from models.city import City
# Importing the 'City' class from the 'models.city' module.

from models.amenity import Amenity
# Importing the 'Amenity' class from the 'models.amenity' module.

from models.place import Place
# Importing the 'Place' class from the 'models.place' module.

from os import environ
# Importing the 'environ' object from the 'os' module, which represents the environment variables.

from flask import Flask, render_template
# Importing the 'Flask' class and 'render_template' function from the 'flask' module.

import uuid
# Importing the 'uuid' module.

app = Flask(__name__)
# Creating an instance of the 'Flask' class, passing the module name as the argument.

@app.teardown_appcontext
def close_db(error):
    """ Remove the current SQLAlchemy Session """
    # This is a function-level docstring, describing what the function does.

    storage.close()
    # Closes the current SQLAlchemy session.

@app.route('/1-hbnb', strict_slashes=False)
# The route decorator, which maps the URL path '/1-hbnb' to the 'hbnb' function.

def hbnb():
    """ HBNB is alive! """
    # This is a function-level docstring, describing what the function does.

    states = storage.all(State).values()
    # Retrieves all the 'State' objects from the storage.

    states = sorted(states, key=lambda k: k.name)
    # Sorts the 'State' objects by their names.

    st_ct = []
    # Initializes an empty list.

    for state in states:
        st_ct.append([state, sorted(state.cities, key=lambda k: k.name)])
    # Loops through each state, and for each state, it sorts its cities by their names and then appends the state and its sorted cities as a list to 'st_ct'.

    amenities = storage.all(Amenity).values()
    # Retrieves all the 'Amenity' objects from the storage.

    amenities = sorted(amenities, key=lambda k: k.name)
    # Sorts the 'Amenity' objects by their names.

    places = storage.all(Place).values()
    # Retrieves all the 'Place' objects from the storage.

    places = sorted(places, key=lambda k: k.name)
    # Sorts the 'Place' objects by their names.

    return render_template('1-hbnb.html',
                           states=st_ct,
                           amenities=amenities,
                           places=places, cache_id=str(uuid.uuid4()))
    # Renders the '1-hbnb.html' template, passing the sorted 'states', 'amenities', 'places', and 'cache_id' as context.

if __name__ == "__main__":
    """ Main Function """
    # This is a function-level docstring, describing what the block of code does.

    app.run(host='0.0.0.0', port=5000)
    # Starts the Flask application, making it accessible from any host on port 5000.
