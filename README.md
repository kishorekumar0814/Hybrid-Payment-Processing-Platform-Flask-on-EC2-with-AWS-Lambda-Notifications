# Hybrid Payment Processing Platform: Flask on EC2 with AWS Lambda Notifications

## Project Overview

This project is a **Hybrid Payment Processing Platform** that combines a **Flask backend hosted on AWS EC2** with **AWS Lambda serverless functions** for real-time payment logging and notifications. Payments submitted via the frontend trigger a Lambda function which publishes an **SNS notification email** confirming the transaction.

**Key Features:**

* Frontend: HTML, CSS, JS for payment form
* Backend: Flask API hosted on EC2
* AWS Lambda: Processes payment data and triggers SNS email notifications
* AWS SNS: Sends email notifications to users
* API Gateway: Serves as the trigger for Lambda from backend

## Architecture Diagram

```
Frontend (HTML/CSS/JS) ---> EC2 Backend (Flask) ---> API Gateway ---> AWS Lambda ---> SNS Email Notification
```

## Folder Structure

```
serverless-payment-logger/
├── backend/
│   ├── app.py             # Flask backend code
│   ├── config.py          # API Gateway URL configuration
│   └── requirements.txt   # Python dependencies
├── frontend/
│   ├── index.html         # Payment form
│   ├── style.css          # Frontend styles
│   └── script.js          # JS to call backend
└── README.md              # Project documentation
```

## Setup Instructions

### 1. Clone the repository

```bash
git clone https://github.com/kishorekumar0814/Hybrid-Payment-Processing-Platform-Flask-on-EC2-with-AWS-Lambda-Notifications.git
cd Hybrid-Payment-Processing-Platform-Flask-on-EC2-with-AWS-Lambda-Notifications
```

### 2. Launch EC2 Instance(s)

* OS: Ubuntu 22.04 LTS
* Instance type: t2.micro (Free Tier)
* Security Group:

  * SSH: 22 (Your IP)
  * HTTP: 80 (Anywhere)
  * Custom TCP: 5000 (for Flask testing)

### 3. Setup Backend (Flask)

```bash
ssh -i "your-key.pem" ubuntu@<BACKEND_EC2_PUBLIC_IP>
sudo apt update
sudo apt install python3-pip git -y
pip3 install virtualenv
cd ~
git clone <repo-url>
cd Hybrid-Payment-Processing-Platform-Flask-on-EC2-with-AWS-Lambda-Notifications/backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
```

* Update `config.py` with your API Gateway URL

```python
API_GATEWAY_URL = "https://<api-id>.execute-api.<region>.amazonaws.com/prod/payment"
```

* Run Flask backend

```bash
python app.py
```

### 4. Setup Frontend

```bash
ssh -i "your-key.pem" ubuntu@<FRONTEND_EC2_PUBLIC_IP>
sudo apt update
sudo apt install git python3 -y
cd ~
git clone <repo-url>
cd Hybrid-Payment-Processing-Platform-Flask-on-EC2-with-AWS-Lambda-Notifications/frontend
python3 -m http.server 80
```

* Update `script.js` fetch URL to point to **backend EC2 IP**

```javascript
fetch('http://<BACKEND_EC2_PUBLIC_IP>:5000/process-payment', {
```

### 5. AWS Lambda Setup

1. Create Lambda function (Python 3.13)
2. Paste the Lambda code (handles payment & SNS)
3. Add **execution role** with `AmazonSNSFullAccess` or minimal SNS publish permissions
4. Test Lambda using a sample JSON payload

### 6. AWS SNS Setup

1. Create SNS topic: `payment-confirmation-topic`
2. Subscribe your email (confirm subscription)
3. Lambda publishes payment notifications to this topic

### 7. Test Full Flow

1. Open frontend in browser: `http://<FRONTEND_EC2_PUBLIC_IP>`
2. Submit payment
3. Backend calls API Gateway → Lambda → SNS
4. Email confirmation received
5. Frontend displays success message

## Frontend UI

**Payment Form Fields:**

* User Name
* Amount
* Payment Method (UPI, Card, etc.)
* Submit Payment

**Response Message:** Shows success or error messages from backend/Lambda

## Tech Stack

* **Frontend:** HTML, CSS, JavaScript
* **Backend:** Python, Flask
* **Cloud Services:** AWS EC2, AWS Lambda, AWS SNS, API Gateway

## License

This project is licensed under the MIT License.
