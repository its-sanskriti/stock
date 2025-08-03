"""
Service module to handle stock price predictions.

Uses yfinance to fetch historical stock data and applies a linear regression model
to forecast closing prices for the next 10 years.
"""

import yfinance as yf
import numpy as np
from sklearn.linear_model import LinearRegression
from datetime import datetime, timedelta
from flask import jsonify

def predict_stock_handler(request):
    """
    Handles prediction request based on historical stock data.

    Args:
        request: Flask request containing 'ticker' as a query parameter.

    Returns:
        JSON response with:
            - predicted closing prices for the next 10 years
            - actual historical closing prices
            - return projections for stock purchases
    """
    ticker = request.args.get('ticker')
    if not ticker:
        return jsonify({'error': 'Ticker symbol is required'}), 400

    try:
        # Fetch 5 years of historical data
        data = yf.download(ticker, period='5y')
        if data.empty:
            return jsonify({'error': 'No data found for the given ticker'}), 404

        # Prepare features and target
        data['Date'] = data.index
        data['Date'] = data['Date'].map(datetime.toordinal)
        X = data['Date'].values.reshape(-1, 1)
        y = data['Close'].values.flatten()
        actual_dates = data.index.strftime('%Y-%m-%d').tolist()

        # Train linear regression model
        model = LinearRegression()
        model.fit(X, y)

        # Generate future dates (1 to 10 years ahead)
        future_dates = [datetime.now() + timedelta(days=365 * i) for i in range(1, 11)]
        future_dates_ordinal = [date.toordinal() for date in future_dates]
        predictions = model.predict(np.array(future_dates_ordinal).reshape(-1, 1))
        predicted_dates = [date.strftime('%Y-%m-%d') for date in future_dates]

        # Project return values for selected stock quantities
        stocks = [10, 20, 50, 100]
        current_price = y[-1]
        returns = [
            {
                'stocks_bought': stock,
                'current_price': round(current_price * stock, 2),
                'after_1_year': round(predictions[0] * stock, 0),
                'after_5_years': round(predictions[4] * stock, 0),
                'after_10_years': round(predictions[9] * stock, 0)
            }
            for stock in stocks
        ]

        # Return predictions, actual data, and return projection
        return jsonify({
            'predictions': predictions.tolist(),
            'predicted_dates': predicted_dates,
            'actual': y.tolist(),
            'actual_dates': actual_dates,
            'returns': returns
        })

    except Exception as e:
        return jsonify({'error': f'Internal Server Error: {str(e)}'}), 500