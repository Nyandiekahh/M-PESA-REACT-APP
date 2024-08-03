import React from 'react';
import Header from './components/Header';
import PaymentForm from './components/PaymentForm';
import './App.css';

function App() {
  return (
    <div className="App">
      <Header />
      <main>
        <PaymentForm />
      </main>
    </div>
  );
}

export default App;