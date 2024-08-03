import React, { useState } from 'react';
import axios from 'axios';
import './GenerateQR.css'; // Ensure the CSS file is correctly imported

function GenerateQR() {
  const [amount, setAmount] = useState('');
  const [accountReference, setAccountReference] = useState('');
  const [transactionDesc, setTransactionDesc] = useState('');
  const [qrCode, setQrCode] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setQrCode('');

    try {
      const response = await axios.post('http://localhost:5000/api/generate-qr', {
        amount,
        accountReference,
        transactionDesc,
      });

      setQrCode(response.data.QRCode);
      setMessage('QR code generated successfully.');
    } catch (error) {
      console.error(error);
      setMessage('An error occurred. Please try again.');
    }
  };

  return (
    <div className="GenerateQR">
      <h2>Generate M-PESA QR Code</h2>
      <form onSubmit={handleSubmit}>
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
        <div className="form-group">
          <label htmlFor="accountReference">Account Reference:</label>
          <input
            type="text"
            id="accountReference"
            value={accountReference}
            onChange={(e) => setAccountReference(e.target.value)}
            placeholder="Enter account reference"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="transactionDesc">Transaction Description:</label>
          <input
            type="text"
            id="transactionDesc"
            value={transactionDesc}
            onChange={(e) => setTransactionDesc(e.target.value)}
            placeholder="Enter transaction description"
            required
          />
        </div>
        <button type="submit">Generate QR Code</button>
      </form>
      {message && <p className="message">{message}</p>}
      {qrCode && <img src={`data:image/png;base64,${qrCode}`} alt="M-PESA QR Code" />}
    </div>
  );
}

export default GenerateQR;
