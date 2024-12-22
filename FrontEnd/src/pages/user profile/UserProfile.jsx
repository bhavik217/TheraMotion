import { useState, useEffect } from "react";
import "./UserProfile.css";

function UserProfile() {
    const [activeTab, setActiveTab] = useState("profile");
    const [userProfile, setUserProfile] = useState({
        firstName: "",
        lastName: "",
        photo: "/default-avatar.jpg",
        email: "",
    });

    useEffect(() => {
        fetchUserData();
    }, []);

    const fetchUserData = async () => {
        const email = localStorage.getItem("loggedInUserEmail");
        try {
            const response = await fetch(`http://localhost:8081/user/${email}/`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("authToken")}`,
                },
            });
            console.log(response);

            if (response.ok) {
                const userDetails = await response.json();
                setUserProfile({
                    firstName: userDetails.firstName,
                    lastName: userDetails.lastName,
                    photo: userDetails.photo || "/default-avatar.jpg",
                    email: userDetails.email,
                });
            } else {
                console.error("Failed to fetch user details:", response.statusText);
            }
        } catch (err) {
            console.error("Error fetching user details:", err);
        }
    };

    const [bookings, setBookings] = useState({
        current: [
            {
                id: 1,
                date: "2024-12-23",
                time: "10:00 AM",
                service: "Regular Checkup",
                status: "Confirmed",
            },
        ],
        previous: [
            {
                id: 2,
                date: "2024-12-10",
                time: "2:30 PM",
                service: "Consultation",
                status: "Completed",
            },
            {
                id: 3,
                date: "2024-11-25",
                time: "11:00 AM",
                service: "Follow-up",
                status: "Completed",
            },
        ],
    });

    return (
        <div className="userprofile">
            <section className="section1">
                <div className="container">
                    <div className="heading1">
                        <span>Profile</span>
                    </div>
                    <div className="buttons">
                        <a href="/" className="w-btn-label">
                            Home <i className="fa-solid fa-chevron-right"></i>
                        </a>
                        <a href="/profile" className="w-btn-label">
                            Profile
                        </a>
                    </div>
                </div>
            </section>

            <section className="profile-content">
                <div className="profile-layout">
                    {/* Left Sidebar */}
                    <div className="profile-sidebar">
                        <div className="photo-section">
                            <div className="profile-photo">
                                <img src={userProfile.photo} alt="Profile" />
                                <button className="edit-photo-btn">
                                    <i className="fa-solid fa-camera"></i>
                                </button>
                            </div>
                            <div className="profile-name">
                                {`${userProfile.firstName} ${userProfile.lastName}`}
                            </div>
                        </div>

                        <div className="navigation-tabs">
                            <button
                                className={`tab-btn ${
                                    activeTab === "profile" ? "active" : ""
                                }`}
                                onClick={() => setActiveTab("profile")}
                            >
                                Profile
                            </button>
                            <button
                                className={`tab-btn ${
                                    activeTab === "bookings" ? "active" : ""
                                }`}
                                onClick={() => setActiveTab("bookings")}
                            >
                                Bookings
                            </button>
                        </div>
                    </div>

                    {/* Main Content Area */}
                    <div className="main-content">
                        {activeTab === "profile" && (
                            <div className="profile-info">
                                <div className="info-row">
                                    <div className="info-label">First Name</div>
                                    <div className="info-value">
                                        <span>{userProfile.firstName}</span>
                                        <button className="edit-btn">
                                            <i className="fa-solid fa-pencil"></i>
                                        </button>
                                    </div>
                                </div>
                                <div className="info-row">
                                    <div className="info-label">Last Name</div>
                                    <div className="info-value">
                                        <span>{userProfile.lastName}</span>
                                        <button className="edit-btn">
                                            <i className="fa-solid fa-pencil"></i>
                                        </button>
                                    </div>
                                </div>
                                <div className="info-row">
                                    <div className="info-label">Email</div>
                                    <div className="info-value">
                                        <span>{userProfile.email}</span>
                                        <button className="edit-btn">
                                            <i className="fa-solid fa-pencil"></i>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === "bookings" && (
                            <div className="bookings-section">
                                <div className="current-bookings">
                                    <h3>Current Bookings</h3>
                                    {bookings.current.map((booking) => (
                                        <div
                                            key={booking.id}
                                            className="booking-card"
                                        >
                                            <div className="booking-info">
                                                <div className="service">
                                                    {booking.service}
                                                </div>
                                                <div className="date-time">
                                                    {booking.date} at {booking.time}
                                                </div>
                                                <div className="status">
                                                    {booking.status}
                                                </div>
                                            </div>
                                            <button className="edit-booking">
                                                Edit Details
                                            </button>
                                        </div>
                                    ))}
                                </div>

                                <div className="previous-bookings">
                                    <h3>Previous Bookings</h3>
                                    {bookings.previous.map((booking) => (
                                        <div
                                            key={booking.id}
                                            className="booking-card faded"
                                        >
                                            <div className="booking-info">
                                                <div className="service">
                                                    {booking.service}
                                                </div>
                                                <div className="date-time">
                                                    {booking.date} at {booking.time}
                                                </div>
                                                <div className="status">
                                                    {booking.status}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </section>
        </div>
    );
}
export default UserProfile;