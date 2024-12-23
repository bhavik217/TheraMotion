import { useState, useEffect } from "react";
import "./UserProfile.css";

function UserProfile() {
    const [activeTab, setActiveTab] = useState("profile");
    const [userProfile, setUserProfile] = useState({
        firstName: "",
        lastName: "",
        photo: "",
        email: "",
    });

    const [isEditing, setIsEditing] = useState({
        firstName: false,
        lastName: false,
        email: false,
    });

    const [editedProfile, setEditedProfile] = useState({
        firstName: "",
        lastName: "",
        email: "",
    });

    useEffect(() => {
        fetchUserData();
        fetchBookings();
    }, []);

    const fetchUserData = async () => {
        const email = localStorage.getItem("loggedInUserEmail");
        try {
            const response = await fetch(
                `http://localhost:8081/user/${email}/`,
                {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem(
                            "authToken"
                        )}`,
                    },
                }
            );
            console.log(response);

            if (response.ok) {
                const userDetails = await response.json();
                setUserProfile({
                    firstName: userDetails.firstName,
                    lastName: userDetails.lastName,
                    photo: userDetails.photo || "/DefaultAvatar.png",
                    email: userDetails.email,
                });
                setEditedProfile({
                    firstName: userDetails.firstName,
                    lastName: userDetails.lastName,
                    email: userDetails.email,
                });
            } else {
                console.error(
                    "Failed to fetch user details:",
                    response.statusText
                );
            }
        } catch (err) {
            console.error("Error fetching user details:", err);
        }
    };

    const updateUserProfile = async () => {
        const email = localStorage.getItem("loggedInUserEmail");
        const updatedData = {
            firstName: editedProfile.firstName,
            lastName: editedProfile.lastName,
            email: editedProfile.email,
        };

        try {
            const response = await fetch(
                `http://localhost:8081/user/${email}/`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${localStorage.getItem(
                            "authToken"
                        )}`,
                    },
                    body: JSON.stringify(updatedData),
                }
            );

            if (response.ok) {
                const updatedUser = await response.json();
                setUserProfile({
                    firstName: updatedUser.firstName,
                    lastName: updatedUser.lastName,
                    photo: updatedUser.photo || "/DefaultAvatar.png",
                    email: updatedUser.email,
                });

                // Optionally reset edit mode after successful save
                setIsEditing({
                    firstName: false,
                    lastName: false,
                    email: false,
                });

                alert("Profile updated successfully!");
            } else {
                console.error("Failed to update profile:", response.statusText);
                alert("Failed to update profile. Please try again.");
            }
        } catch (err) {
            console.error("Error updating profile:", err);
            alert("An error occurred while updating your profile.");
        }
    };

    const handleEdit = (field) => {
        setIsEditing((prev) => ({
            ...prev,
            [field]: true,
        }));
    };

    const handleSave = (field) => {
        setUserProfile((prev) => ({
            ...prev,
            [field]: editedProfile[field],
        }));
        setIsEditing((prev) => ({
            ...prev,
            [field]: false,
        }));

        // Call the update function to save changes to the backend
        updateUserProfile();
    };

    const [bookings, setBookings] = useState({ current: [], previous: [] });

    console.log(bookings["current"][0]);

    const fetchBookings = async function () {
        try {
            const email = localStorage.getItem("loggedInUserEmail");
            const currentResponse = await fetch(
                `http://localhost:8081/appointment/${email}/current`,
                {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem(
                            "authToken"
                        )}`,
                    },
                }
            );

            const previousResponse = await fetch(
                `http://localhost:8081/appointment/${email}/previous`,
                {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem(
                            "authToken"
                        )}`,
                    },
                }
            );

            const currentBookings = currentResponse.ok
                ? await currentResponse.json()
                : [];
            const previousBookings = previousResponse.ok
                ? await previousResponse.json()
                : [];

            setBookings({
                current: currentBookings || [],
                previous: previousBookings || [],
            });
        } catch (err) {
            console.error("Error fetching bookings:", err);
            setBookings({ current: [], previous: [] });
        }
    };

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
                                        {isEditing.firstName ? (
                                            <>
                                                <input
                                                    type="text"
                                                    value={
                                                        editedProfile.firstName
                                                    }
                                                    onChange={(e) =>
                                                        setEditedProfile(
                                                            (prev) => ({
                                                                ...prev,
                                                                firstName:
                                                                    e.target
                                                                        .value,
                                                            })
                                                        )
                                                    }
                                                />
                                                <button
                                                    className="save-btn"
                                                    onClick={() =>
                                                        handleSave("firstName")
                                                    }
                                                >
                                                    Save
                                                </button>
                                            </>
                                        ) : (
                                            <>
                                                <span>
                                                    {userProfile.firstName}
                                                </span>
                                                <button
                                                    className="edit-btn"
                                                    onClick={() =>
                                                        handleEdit("firstName")
                                                    }
                                                >
                                                    <i className="fa-solid fa-pencil"></i>
                                                </button>
                                            </>
                                        )}
                                    </div>
                                </div>
                                <div className="info-row">
                                    <div className="info-label">Last Name</div>
                                    <div className="info-value">
                                        {isEditing.lastName ? (
                                            <>
                                                <input
                                                    type="text"
                                                    value={
                                                        editedProfile.lastName
                                                    }
                                                    onChange={(e) =>
                                                        setEditedProfile(
                                                            (prev) => ({
                                                                ...prev,
                                                                lastName:
                                                                    e.target
                                                                        .value,
                                                            })
                                                        )
                                                    }
                                                />
                                                <button
                                                    className="save-btn"
                                                    onClick={() =>
                                                        handleSave("lastName")
                                                    }
                                                >
                                                    Save
                                                </button>
                                            </>
                                        ) : (
                                            <>
                                                <span>
                                                    {userProfile.lastName}
                                                </span>
                                                <button
                                                    className="edit-btn"
                                                    onClick={() =>
                                                        handleEdit("lastName")
                                                    }
                                                >
                                                    <i className="fa-solid fa-pencil"></i>
                                                </button>
                                            </>
                                        )}
                                    </div>
                                </div>
                                <div className="info-row">
                                    <div className="info-label">Email</div>
                                    <div className="info-value">
                                        {isEditing.email ? (
                                            <>
                                                <input
                                                    type="email"
                                                    value={editedProfile.email}
                                                    onChange={(e) =>
                                                        setEditedProfile(
                                                            (prev) => ({
                                                                ...prev,
                                                                email: e.target
                                                                    .value,
                                                            })
                                                        )
                                                    }
                                                />
                                                <button
                                                    className="save-btn"
                                                    onClick={() =>
                                                        handleSave("email")
                                                    }
                                                >
                                                    Save
                                                </button>
                                            </>
                                        ) : (
                                            <>
                                                <span>{userProfile.email}</span>
                                                <button
                                                    className="edit-btn"
                                                    onClick={() =>
                                                        handleEdit("email")
                                                    }
                                                >
                                                    <i className="fa-solid fa-pencil"></i>
                                                </button>
                                            </>
                                        )}
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === "bookings" && (
                            <div className="bookings-section">
                                <div className="current-bookings">
                                    <h3>Current Bookings</h3>
                                    {bookings.current &&
                                    bookings.current.length > 0 ? (
                                        bookings.current.map((booking) => (
                                            <div
                                                key={booking.bookingId}
                                                className="booking-card"
                                            >
                                                <div className="booking-info">
                                                    <div className="service">
                                                        {
                                                            booking
                                                                .appointmentDetails
                                                                .service
                                                        }
                                                    </div>
                                                    <div className="date-time">
                                                        {new Date(
                                                            booking.appointmentDetails.date
                                                        ).toLocaleDateString()}{" "}
                                                        at{" "}
                                                        {
                                                            booking
                                                                .appointmentDetails
                                                                .time
                                                        }
                                                    </div>
                                                    <div className="status">
                                                        {booking.status ||
                                                            "Pending"}
                                                    </div>
                                                </div>
                                                <button
                                                    className="edit-booking"
                                                    onClick={() =>
                                                        updateBookingDetails(
                                                            booking.bookingId,
                                                            {
                                                                service:
                                                                    "Updated Service", // Example
                                                            }
                                                        )
                                                    }
                                                >
                                                    Edit Details
                                                </button>
                                            </div>
                                        ))
                                    ) : (
                                        <p>No current bookings available.</p>
                                    )}
                                </div>
                                <div className="previous-bookings">
                                    <h3>Previous Bookings</h3>
                                    {bookings.previous.length > 0 ? (
                                        bookings.previous.map((booking) => (
                                            <div
                                                key={booking.bookingId}
                                                className="booking-card faded"
                                            >
                                                <div className="booking-info">
                                                    <div className="service">
                                                        {
                                                            booking
                                                                .appointmentDetails
                                                                .service
                                                        }
                                                    </div>
                                                    <div className="date-time">
                                                        {new Date(
                                                            booking.appointmentDetails.date
                                                        ).toLocaleDateString()}{" "}
                                                        at{" "}
                                                        {
                                                            booking
                                                                .appointmentDetails
                                                                .time
                                                        }
                                                    </div>
                                                    <div className="status">
                                                        {booking.status ||
                                                            "Completed"}
                                                    </div>
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <p>No previous bookings available.</p>
                                    )}
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
