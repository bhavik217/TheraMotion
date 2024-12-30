import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Needform from "../../components/NeedForm/NeedForm";
import "./Finalform.css";

const Finalform = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { practitioner, service, date, time } = location.state || {};

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        dob: "",
        email: "",
        phone: "",
        comments: "",
    });

    useEffect(() => {
        // Get email from localStorage and update formData
        const storedEmail = localStorage.getItem("loggedInUserEmail") || "";
        setFormData((prevData) => ({
            ...prevData,
            email: storedEmail,
        }));
    }, []);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === "checkbox" ? checked : value,
        });
    };

    const validatePhone = (phone) => {
        const phoneRegex = /^\d{10}$/; // Allows exactly 10 digits
        return phoneRegex.test(phone);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const form = e.target;

        if (!validatePhone(formData.phone)) {
            alert("Please enter a valid 10-digit mobile number.");
            return;
        }

        if (form.checkValidity()) {
            try {
                // Make request to server to send Form-Data
                const response = await fetch(
                    `${import.meta.env.VITE_BACKEND_URL}/appointment`,
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            ...formData,
                            appointmentDetails: {
                                practitioner,
                                service,
                                date,
                                time,
                            },
                        }),
                    }
                );
                if (response.ok) {
                    const result = await response.json();
                    navigate("/order", {
                        state: { practitioner, service, date, time, formData },
                    });
                } else {
                    console.error(
                        "Error creating appointment:",
                        await response.text()
                    );
                }
            } catch (error) {
                console.error("Error connecting to the backend:", error);
            }
        } else {
            form.reportValidity();
        }
    };
    return (
        <div className="fform">
            <div style={{ height: "15vh" }}></div>
            <div className="container">
                <div className="row">
                    <div className="col-md-7 div3">
                        <h4>Tell us your details</h4>
                        <div className="info">
                            <form onSubmit={handleSubmit}>
                                <div className="your">
                                    <h5>Your Information</h5>
                                    <p>
                                        <i>
                                            We need this information to identify
                                            you
                                        </i>
                                    </p>
                                    <p>First Name</p>
                                    <input
                                        type="text"
                                        className="in"
                                        name="firstName"
                                        value={formData.firstName}
                                        onChange={handleChange}
                                        required
                                    />
                                    <br />
                                    <br />
                                    <p>Last Name</p>
                                    <input
                                        type="text"
                                        className="in"
                                        name="lastName"
                                        value={formData.lastName}
                                        onChange={handleChange}
                                    />
                                    <br />
                                    <br />
                                    <label>Date of Birth</label>
                                    <input
                                        type="date"
                                        className="dt"
                                        name="dob"
                                        value={formData.dob}
                                        onChange={handleChange}
                                        required
                                    />
                                    <br />
                                    <br />
                                </div>
                                <br />
                                <div className="cont">
                                    <h5>Your Contact Details</h5>
                                    <p>
                                        <i>
                                            We need this information to confirm
                                            your booking
                                        </i>
                                    </p>
                                    <p>Email Address</p>
                                    <div className="email-box">
                                        {localStorage.getItem("loggedInUserEmail")}
                                    </div>

                                    <br />
                                    <p>Mobile phone</p>
                                    <input
                                        type="tel"
                                        className="in"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        required
                                    />
                                    <br />
                                    <br />
                                </div>
                                <br />
                                <h5>Extra Information</h5>
                                <p>Comments (Optional)</p>
                                <input
                                    type="text"
                                    className="in"
                                    name="comments"
                                    value={formData.comments}
                                    onChange={handleChange}
                                    style={{ height: "150px" }}
                                />
                                <br />
                                <br />
                                <button
                                    type="submit"
                                    className="btn btn-success"
                                >
                                    Complete Information{" "}
                                    <i className="fa-solid fa-chevron-right"></i>
                                </button>
                                <br />
                                <br />
                            </form>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <Needform />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Finalform;