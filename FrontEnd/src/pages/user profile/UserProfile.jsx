import { useState, useEffect } from "react";
import "./UserProfile.css";
import CustomDeleteModal from "../../components/CustomDelete/CustomDeleteModal";

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
    });
    const [editedProfile, setEditedProfile] = useState({
        firstName: "",
        lastName: "",
    });
    const [isEditingPhoto, setIsEditingPhoto] = useState(false);
    const [selectedPhoto, setSelectedPhoto] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [uploadError, setUploadError] = useState("");
    const [bookings, setBookings] = useState({ current: [], previous: [] });
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

    useEffect(() => {
        fetchUserData();
        fetchBookings();
    }, []);

    // Your existing fetch functions
    const fetchUserData = async () => {
        const email = localStorage.getItem("loggedInUserEmail");
        try {
            const response = await fetch(`http://localhost:8081/user/${email}/`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("authToken")}`,
                },
            });

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
                console.error("Failed to fetch user details:", response.statusText);
            }
        } catch (err) {
            console.error("Error fetching user details:", err);
        }
    };

    const fetchBookings = async () => {
        try {
            const email = localStorage.getItem("loggedInUserEmail");
            const currentResponse = await fetch(
                `http://localhost:8081/appointment/${email}/current`,
                {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
                    },
                }
            );

            const previousResponse = await fetch(
                `http://localhost:8081/appointment/${email}/previous`,
                {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
                    },
                }
            );

            const currentBookings = currentResponse.ok ? await currentResponse.json() : [];
            const previousBookings = previousResponse.ok ? await previousResponse.json() : [];

            setBookings({
                current: currentBookings || [],
                previous: previousBookings || [],
            });
        } catch (err) {
            console.error("Error fetching bookings:", err);
            setBookings({ current: [], previous: [] });
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
            const response = await fetch(`http://localhost:8081/user/${email}/`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("authToken")}`,
                },
                body: JSON.stringify(updatedData),
            });

            if (response.ok) {
                const updatedUser = await response.json();
                setUserProfile({
                    firstName: updatedUser.firstName,
                    lastName: updatedUser.lastName,
                    photo: updatedUser.photo || "/DefaultAvatar.png",
                    email: updatedUser.email,
                });

                setIsEditing({
                    firstName: false,
                    lastName: false,
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

    // Updated file handling functions
    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
            if (!allowedTypes.includes(file.type)) {
                setUploadError("Only .jpeg, .jpg, and .png files are allowed");
                event.target.value = '';
                return;
            }

            const maxSize = 10 * 1024 * 1024; // 10MB
            if (file.size > maxSize) {
                setUploadError("File size must be less than 10MB");
                event.target.value = '';
                return;
            }

            setSelectedPhoto(file);
            setUploadError("");
        }
    };

    const handleUploadPhoto = async () => {
        if (!selectedPhoto) {
            setUploadError("Please select a photo to upload.");
            return;
        }

        setIsLoading(true);
        setUploadError("");

        const formData = new FormData();
        formData.append("photo", selectedPhoto);

        try {
            const response = await fetch(`http://localhost:8081/user/upload-photo`, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("authToken")}`,
                },
                body: formData,
            });

            const data = await response.json();

            if (response.ok) {
                setUserProfile((prev) => ({
                    ...prev,
                    photo: data.photoPath,
                }));
                setIsEditingPhoto(false);
                setSelectedPhoto(null);
                alert("Profile photo updated successfully!");
            } else {
                setUploadError(data.message || "Failed to upload photo. Please try again.");
            }
        } catch (err) {
            console.error("Error uploading photo:", err);
            setUploadError("An error occurred while uploading your photo.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleCancelUpload = () => {
        setIsEditingPhoto(false);
        setSelectedPhoto(null);
        setUploadError("");
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
        updateUserProfile();
    };

    const handleDeleteAccount = async () => {
        try {
            const email = localStorage.getItem("loggedInUserEmail");
            const response = await fetch(`http://localhost:8081/user/${email}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("authToken")}`,
                },
            });
    
            if (response.ok) {
                localStorage.removeItem("authToken");
                localStorage.removeItem("loggedInUserEmail");
                window.location.href = "/";
            } else {
                const data = await response.json();
                console.error("Failed to delete account:", data.message);
            }
        } catch (err) {
            console.error("Error deleting account:", err);
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
                                <img
                                    src={userProfile.photo}
                                    alt="Profile"
                                    onError={(e) => {
                                        e.target.src = "/DefaultAvatar.png";
                                    }}
                                />
                                <button
                                    className="edit-photo-btn"
                                    onClick={() => {
                                        setIsEditingPhoto(true);
                                        setUploadError("");
                                    }}
                                >
                                    <i className="fa-solid fa-camera"></i>
                                </button>
                            </div>

                            {isEditingPhoto && (
                                <div className="upload-photo-modal">
                                    <div className="upload-content">
                                        <div className="file-input-container">
                                            <input
                                                type="file"
                                                accept=".jpg,.jpeg,.png"
                                                onChange={handleFileChange}
                                                disabled={isLoading}
                                            />
                                            {selectedPhoto && (
                                                <div className="selected-file">
                                                    Selected: {selectedPhoto.name}
                                                </div>
                                            )}
                                        </div>

                                        {uploadError && (
                                            <div className="error-message">
                                                {uploadError}
                                            </div>
                                        )}

                                        <div className="upload-buttons">
                                            <button
                                                onClick={handleCancelUpload}
                                                disabled={isLoading}
                                                className="cancel-btn"
                                            >
                                                Cancel
                                            </button>
                                            <button
                                                onClick={handleUploadPhoto}
                                                disabled={isLoading || !selectedPhoto}
                                                className="upload-btn"
                                            >
                                                {isLoading ? "Uploading..." : "Upload"}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="profile-name">
                            {`${userProfile.firstName} ${userProfile.lastName}`}
                        </div>

                        <div className="navigation-tabs">
                            <button
                                className={`tab-btn ${activeTab === "profile" ? "active" : ""}`}
                                onClick={() => setActiveTab("profile")}
                            >
                                Profile
                            </button>
                            <button
                                className={`tab-btn ${activeTab === "bookings" ? "active" : ""}`}
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
                                                    value={editedProfile.firstName}
                                                    onChange={(e) =>
                                                        setEditedProfile((prev) => ({
                                                            ...prev,
                                                            firstName: e.target.value,
                                                        }))
                                                    }
                                                />
                                                <button
                                                    className="save-btn"
                                                    onClick={() => handleSave("firstName")}
                                                >
                                                    Save
                                                </button>
                                            </>
                                        ) : (
                                            <>
                                                <span>{userProfile.firstName}</span>
                                                <button
                                                    className="edit-btn"
                                                    onClick={() => handleEdit("firstName")}
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
                                                    value={editedProfile.lastName}
                                                    onChange={(e) =>
                                                        setEditedProfile((prev) => ({
                                                            ...prev,
                                                            lastName: e.target.value,
                                                        }))
                                                    }
                                                />
                                                <button
                                                    className="save-btn"
                                                    onClick={() => handleSave("lastName")}
                                                >
                                                    Save
                                                </button>
                                            </>
                                        ) : (
                                            <>
                                                <span>{userProfile.lastName}</span>
                                                <button
                                                    className="edit-btn"
                                                    onClick={() => handleEdit("lastName")}
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
                                        <span>{userProfile.email}</span>
                                        <button className="info-btn" disabled>
                                            <i className="fa-solid fa-info-circle"></i>
                                            <span className="tooltip">
                                                Email is permanent and can't be changed
                                            </span>
                                        </button>
                                    </div>
                                </div>
                                <div className="delete-account-section">
                                    <h3>Delete Account</h3>
                                    <p className="warning-text">
                                        <i className="fa-solid fa-triangle-exclamation"></i>
                                        Once you delete your account, there is no going back. Please be certain.
                                    </p>
                                    <button
                                        className="delete-account-btn"
                                        onClick={() => setIsDeleteModalOpen(true)}
                                    >
                                        <i className="fa-solid fa-trash-can"></i>
                                        Delete Account
                                    </button>

                                    <CustomDeleteModal
                                        isOpen={isDeleteModalOpen}
                                        onClose={() => setIsDeleteModalOpen(false)}
                                        onConfirm={handleDeleteAccount}
                                    />
                                </div>
                            </div>
                        )}

                        {activeTab === "bookings" && (
                            <div className="bookings-section">
                                <div className="current-bookings">
                                    <h3>Current Bookings</h3>
                                    {bookings.current && bookings.current.length > 0 ? (
                                        bookings.current.map((booking) => (
                                            <div key={booking.bookingId} className="booking-card">
                                                <div className="booking-info">
                                                    <div className="service">
                                                        {booking.appointmentDetails.service}
                                                    </div>
                                                    <div className="date-time">
                                                        {new Date(booking.appointmentDetails.date).toLocaleDateString()}{" "}
                                                        at {booking.appointmentDetails.time}
                                                    </div>
                                                    <div className="status">
                                                        {booking.status || "Pending"}
                                                    </div>
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <p>No current bookings available.</p>
                                    )}
                                </div>

                                <div className="previous-bookings">
                                    <h3>Previous Bookings</h3>
                                    {bookings.previous && bookings.previous.length > 0 ? (
                                        bookings.previous.map((booking) => (
                                            <div key={booking.bookingId} className="booking-card faded">
                                                <div className="booking-info">
                                                    <div className="service">
                                                        {booking.appointmentDetails.service}
                                                    </div>
                                                    <div className="date-time">
                                                        {new Date(booking.appointmentDetails.date).toLocaleDateString()}{" "}
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
