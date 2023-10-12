#!/usr/bin/python3
""" Flask Application """

# Import necessary modules and functions
from models import storage
from api.v1.views import app_views
from os import environ
from flask import Flask, render_template, make_response, jsonify
from flask_cors import CORS
from flasgger import Swagger
from flasgger.utils import swag_from

# Create a Flask application instance
app = Flask(__name__)

# Enable pretty-printing for JSON responses
app.config['JSONIFY_PRETTYPRINT_REGULAR'] = True

# Register the app_views blueprint to the app
app.register_blueprint(app_views)

# Set up Cross-Origin Resource Sharing (CORS)
cors = CORS(app, resources={r"/api/v1/*": {"origins": "*"}})

# Define a teardown function to close the storage after the app context is destroyed
@app.teardown_appcontext
def close_db(error):
    """ Close Storage """
    storage.close()

# Define a custom error handler for 404 errors
@app.errorhandler(404)
def not_found(error):
    """ 404 Error
    ---
    responses:
      404:
        description: a resource was not found
    """
    return make_response(jsonify({'error': "Not found"}), 404)

# Set up Swagger API documentation configuration
app.config['SWAGGER'] = {
    'title': 'AirBnB clone Restful API',
    'uiversion': 3
}

# Initialize Swagger
Swagger(app)

# Check if the script is run directly (not imported)
if __name__ == "__main__":
    """ Main Function """
    # Get host and port from environment variables
    host = environ.get('HBNB_API_HOST')
    port = environ.get('HBNB_API_PORT')
    if not host:
        host = '0.0.0.0'  # default to '0.0.0.0' if host not set
    if not port:
        port = '5000'  # default to '5000' if port not set
    # Run the Flask app
    app.run(host=host, port=port, threaded=True)
