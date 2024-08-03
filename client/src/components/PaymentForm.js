import React, { useState } from 'react';
import axios from 'axios';
import './PaymentForm.css';

function PaymentForm() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const response = await axios.post('http://localhost:5000/api/initiate-payment', { phoneNumber, amount }); // Ensure the full URL is used
      setMessage('Payment initiated. Please check your phone for the STK push.');
      console.log(response.data);
    } catch (error) {
      setMessage('An error occurred. Please try again.');
      console.error(error);
    }

    setLoading(false);
  };

  return (
    <div className="PaymentForm">
      <h2>Make a Payment</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="phoneNumber">Phone Number:</label>
          <input
            type="text"
            id="phoneNumber"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            placeholder="e.g., 254712345678"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="amount">Amount (KES):</label>
          <input
            type="number"
            id="amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter amount"
            required
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? 'Processing...' : 'Pay with M-PESA'}
        </button>
      </form>
      {message && <p className="message">{message}</p>}
    </div>
  );
}

export default PaymentForm;
