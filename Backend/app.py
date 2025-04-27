import os
import sys
from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import pandas as pd

# Add parent directory to sys.path so Python can find the model module
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

# Ensure the 'model.features_extract' module can be found
try:
    from model.feature_extract.features import extract_features
except ImportError as e:
    print("Error importing extract_features:", e)
    sys.exit(1)

app = Flask(__name__)
CORS(app)

# Correct path to load the model
MODEL_PATH = os.path.join(os.path.dirname(__file__), '..', 'model', 'model', 'reputation_model.pkl')

# Try loading the model
try:
    print(f"Loading model from: {MODEL_PATH}")
    model = joblib.load(MODEL_PATH)
    print("Model loaded successfully")
except Exception as e:
    print(f"Error loading model: {e}")
    model = None

@app.route("/score", methods=["POST"])
def score_wallet():
    # Check if model is loaded properly
    if not model:
        return jsonify({"error": "Model not loaded"}), 500

    try:
        # Get JSON data from the POST request
        data = request.get_json()
        
        # Log the incoming data for debugging
        print(f"Received data: {data}")

        # Extract features using the extract_features function
        features = extract_features(data)

        # Ensure features are being extracted correctly
        print(f"Extracted features: {features}")
        
        # Convert features into a dataframe for model prediction
        df = pd.DataFrame([features])
        
        # Get the prediction (probability of being "good")
        score = model.predict_proba(df)[0][1]  # Probability of being "good"
        
        # Return the score in the response
        return jsonify({"wallet": data.get("wallet", "unknown"), "score": score})

    except Exception as e:
        # If something goes wrong, return an error message
        print(f"Error in score_wallet: {str(e)}")  # Log the error
        return jsonify({"error": str(e)}), 400

if __name__ == "__main__":
    # Run the Flask app
    app.run(debug=True)
