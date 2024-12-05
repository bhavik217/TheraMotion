import { useState } from 'react';
import {useLocation} from "react-router-dom"; 
import "./OrderDetail.css"

// import { FaUser, FaCalendarAlt, FaClock, FaMoneyCheckAlt, FaCashRegister } from 'react-icons/fa';

const OrderDetail = () => {
  const [paymentMethod, setPaymentMethod] = useState('cod');
  const location = useLocation();
	const {practitioner,service,date,time, formData} = location.state || {};

  console.log(formData);
  const handlePaymentMethodChange = (event) => {
    setPaymentMethod(event.target.value);
  };
  const handlePayment = () => {
    const options = {
      key: "rzp_test_bAStVbQXXg0Jx1", // Replace with your Razorpay key ID
      amount: 200000, // Amount in paise (50000 paise = INR 500)
      currency: "INR",
      name: "MoveMend",
      description: "Test Transaction",
      image: "/MovemendLogo.png",
      handler: function (response) {
        alert(`Payment successful! ID: ${response.razorpay_payment_id}`);
        // Add further logic to handle the payment response if needed
      },
      prefill: {
        name: formData.firstName,
        email: formData.email,
        contact: formData.phone
      },
      notes: {
        address: "Razorpay Corporate Office"
      },
      theme: {
        color: "#3399cc"
      }
    };

    const rzp1 = new window.Razorpay(options);
    rzp1.open();
  };

  return (
    <div class="order">
    <div className="order-detail-container">
      <div className="order-summary">
        <div className="person-details">
          <h2><i className="fas fa-user"></i>Customer Details</h2>
          <p><strong>Name:</strong>{formData.firstName}</p>
          <p><strong>Email:</strong>{formData.email}</p>
          <p><strong>Phone:</strong>{formData.phone}</p>
        </div>
        <div className="booking-details">
          <h2><i className="fas fa-calendar-alt"></i> Booking Summary</h2>
          <p><strong>Service:</strong>{service}</p>
          <p><strong>Practitioner:</strong>{practitioner}</p>
          <p><strong>Date:</strong>{date}</p>
          <p><strong>Time:</strong>{time}</p>
        </div>
      </div>
      <div className="payment-details">
        <h2> <i className="fas fa-money-check-alt"></i>   Payment Details</h2>
        <div className="payment-info">
          <p><strong>Amount:</strong> Rs 2000</p>
          <p><strong>Tax:</strong>Rs 0</p>
          <p><strong>Discount:</strong>Rs 0</p>
          <hr />
          <p className="grand-total"><strong>Grand Total:</strong> $105</p>
        </div>
        <div className="payment-options">
          <div className="payment-option">
            <input 
              type="radio" 
              id="cod" 
              name="paymentMethod" 
              value="cod" 
              checked={paymentMethod === 'cod'} 
              onChange={handlePaymentMethodChange} 
            />
            <label htmlFor="cod"> Cash on Delivery</label>
          </div>
          <div className="payment-option">
            <input 
              type="radio" 
              id="card" 
              name="paymentMethod" 
              value="card" 
              checked={paymentMethod === 'card'} 
              onChange={handlePaymentMethodChange} 
            />
            <label htmlFor="card">Credit/Debit Card</label>
          </div>
          {paymentMethod === 'card' && (
            <div className="card-details">
              <input type="text" placeholder="Card Number" />
              <input type="text" placeholder="Card Holder Name" />
              <input type="text" placeholder="Expiry Date" />
              <input type="text" placeholder="CVV" />
            </div>
          )}
        </div>
        <button type="submit" className="submit-btn" onClick={handlePayment}>Pay $105</button>
      </div>
    </div>
    <Footer />
    </div>
  );
};
export default OrderDetail;