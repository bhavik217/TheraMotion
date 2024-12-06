import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import "./OrderDetail.css";

const OrderDetail = () => {
    const [paymentMethod, setPaymentMethod] = useState("cod");
    const location = useLocation();
    const {
        practitioner = "",
        service = "",
        date = "",
        time = "",
        formData = {},
    } = location.state || {};

    // Handle payment method change
    const handlePaymentMethodChange = (event) => {
        setPaymentMethod(event.target.value);
    };

    // Trigger Razorpay payment
    const handlePayment = () => {
        const options = {
            key: "rzp_test_bAStVbQXXg0Jx1", // Your Razorpay key_id
            amount: 100 * 100, // Amount in paise (Rs 105)
            currency: "INR",
            name: "TheraMotion",
            description: "Test Transaction",
            image: "/TheraMotionLogo.png",
            handler: function (response) {
                alert(
                    `Payment successful! Payment ID: ${response.razorpay_payment_id}`
                );
            },
            prefill: {
                name: formData.firstName || "Guest",
                email: formData.email || "example@mail.com",
                contact: formData.phone || "0000000000",
            },
            notes: {
                address: "Razorpay Corporate Office",
            },
            theme: {
                color: "#3399cc",
            },
        };

        // Initialize Razorpay checkout
        const rzp1 = new window.Razorpay(options);
        rzp1.open();
    };

    // Guard clause for missing state
    if (!location.state) {
        return <div>Error: Missing order details.</div>;
    }

    return (
        <div className="order">
            <div className="order-detail-container">
                {/* Order Summary */}
                <div className="order-summary">
                    <div className="person-details">
                        <h2>Customer Details</h2>
                        <p>
                            <strong>Name:</strong> {formData.firstName}
                        </p>
                        <p>
                            <strong>Email:</strong> {formData.email}
                        </p>
                        <p>
                            <strong>Phone:</strong> {formData.phone}
                        </p>
                    </div>
                    <div className="booking-details">
                        <h2>Booking Summary</h2>
                        <p>
                            <strong>Service:</strong> {service}
                        </p>
                        <p>
                            <strong>Practitioner:</strong> {practitioner}
                        </p>
                        <p>
                            <strong>Date:</strong> {date}
                        </p>
                        <p>
                            <strong>Time:</strong> {time}
                        </p>
                    </div>
                </div>

                {/* Payment Details */}
                <div className="payment-details">
                    <h2>Payment Details</h2>
                    <div className="payment-info">
                        <p>
                            <strong>Amount:</strong> Rs 2000
                        </p>
                        <p>
                            <strong>Tax:</strong> Rs 0
                        </p>
                        <p>
                            <strong>Discount:</strong> Rs 0
                        </p>
                        <hr />
                        <p className="grand-total">
                            <strong>Grand Total:</strong> Rs 105
                        </p>
                    </div>
                    <div className="payment-options">
                        {/* Payment Method Options */}
                        <div className="payment-option">
                            <input
                                type="radio"
                                id="cod"
                                name="paymentMethod"
                                value="cod"
                                checked={paymentMethod === "cod"}
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
                                checked={paymentMethod === "card"}
                                onChange={handlePaymentMethodChange}
                            />
                            <label htmlFor="card">Credit/Debit Card</label>
                        </div>
                    </div>
                    {paymentMethod === "card" && (
                        <div className="card-details">
                            <input type="text" placeholder="Card Number" />
                            <input type="text" placeholder="Card Holder Name" />
                            <input type="text" placeholder="Expiry Date" />
                            <input type="text" placeholder="CVV" />
                        </div>
                    )}
                    <button
                        type="button"
                        className="submit-btn"
                        onClick={handlePayment}
                    >
                        Pay Rs 105
                    </button>
                </div>
            </div>
        </div>
    );
};
export default OrderDetail;
