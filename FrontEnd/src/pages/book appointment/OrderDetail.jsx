import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import "./OrderDetail.css";

const OrderDetail = () => {
    const location = useLocation();
    const {
        practitioner = "N/A",
        service = "N/A",
        date = "N/A",
        time = "N/A",
        formData = {},
    } = location.state || {};

    // Trigger Razorpay payment
    const handlePayment = () => {
        const options = {
            key: "rzp_test_ZQmsCkWeX6PsgX", // Your Razorpay key_id
            amount: 1 * 100, // Amount in paise (Rs 105)
            currency: "INR",
            name: "TheraMotion",
            description: "Test Transaction",
            image: "/TheraMotionLogo.png",
            prefill: {
                name: formData.firstName || "Guest",
                email: formData.email || "example@mail.com",
                contact: formData.phone || "0000000000",
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
                            <strong>Amount:</strong> Rs 1
                        </p>
                        <p>
                            <strong>Tax:</strong> Rs 0
                        </p>
                        <p>
                            <strong>Discount:</strong> Rs 0
                        </p>
                        <hr />
                        <p className="grand-total">
                            <strong>Grand Total:</strong> Rs 1
                        </p>
                    </div>
                
                    <button type="button" className="submit-btn" onClick={handlePayment}>
                        Pay Rs 1
                    </button>
                </div>
            </div>
        </div>
    );
};

export default OrderDetail;
