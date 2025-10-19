from flask import Flask, request, jsonify
import requests
from flask_cors import CORS
from config import API_GATEWAY_URL

app = Flask(__name__)
CORS(app)  # Enable CORS so frontend can call backend

# Health check route
@app.route('/')
def home():
    return "Payment Logger Backend Running ✅"

# Payment processing route
@app.route('/process-payment', methods=['POST'])
def process_payment():
    data = request.get_json()

    # Basic validation
    if not data.get('userName') or not data.get('amount') or not data.get('paymentMethod'):
        return jsonify({'message': 'Missing fields'}), 400

    # Send data to API Gateway (triggering Lambda)
    try:
        response = requests.post(API_GATEWAY_URL, json=data)
        # If API Gateway returns JSON, forward it
        try:
            result = response.json()
        except:
            result = {'message': response.text}

        if response.status_code == 200:
            return jsonify(result)
        else:
            return jsonify({'message': 'Failed to process payment', 'details': result}), 500
    except Exception as e:
        return jsonify({'message': f'Error: {str(e)}'}), 500

if __name__ == '__main__':
    # Run backend on all interfaces, port 5000
    app.run(host='0.0.0.0', port=5000)
