# Stock Analyzer – Project Setup Guide

Welcome to the Stock Analyzer project! Follow the steps below to set up the project locally and start contributing or testing.

## Prerequisites

Make sure you have the following installed on your system:

- **Python 3.+**
- **Node.js and npm**
- **Git**

## Project Structure

```
Directory structure:
└── srigadaakshaykumar-stock/
    ├── README.md
    ├── SETUP.md
    ├── CONTRIBUTION.md
    ├── package.json
    ├── static.json
    ├── backend/
    │   ├── app.py
    │   ├── requirements.txt
    │   ├── stock-prediction.ipynb
    │   └── tf.keras
    ├── public/
    │   ├── index.html
    │   ├── manifest.json
    │   └── robots.txt
    └── src/
        ├── App.css
        ├── App.js
        ├── App.test.js
        ├── index.css
        ├── index.js
        ├── reportWebVitals.js
        ├── setupTests.js
        └── components/
            ├── AuthContext.js
            ├── firebase.js
            ├── Footer.jsx
            ├── Header.jsx
            ├── Login.js
            ├── Prediction.jsx
            ├── Signup.js
            ├── Stockdata.jsx
            ├── StockList.jsx
            └── data/
                └── stockData.json
```

1. **fork the repository**
   fork the project to your github

2. **Clone the repository**

```bash
git clone https://github.com/yourusername/stock.git
```

## Backend Setup (Flask)

Navigate to frontend folder

```bash
cd stock/backend
```

1. **Install dependencies**

```bash
pip install -r requirements.txt
```

2. **Start the backend server**

```bash
python app.py
```

The app will be available at http://x.x.x.x:10000. (you will find the correct url in the server console)
copy the server url to use in frontend
make sure the app in the testing during the code editing

change

```bash
app = Flask(__name__)
CORS(app, ....)
```

to

```bash
app = Flask(__name__)
CORS(app)
```

for testing environment

## Frontend Setup (React)

**Install dependencies**

```bash
npm install
```

add server url to frontend Stockdata.jsx and Predict.jsx page

from

```bash
${process.env.REACT_APP_API_URL}
```

to

```bash
http://x.x.x.x:10000
```

### start the project

```bash
npm start
```

The app will be available at http://localhost:3000.
