import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function SignUp() {
    const navigate = useNavigate();
    const firstNameRef = useRef(null);
    const lastNameRef = useRef(null);
    const emailRef = useRef(null);
    const passwordRef = useRef(null);

    const [showSuccessAlert, setShowSuccessAlert] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);

    const signUpHandler = async (event) => {
        event.preventDefault();

        const formValuesObject = {
            firstName: firstNameRef.current.value,
            lastName: lastNameRef.current.value,
            email: emailRef.current.value,
            password: passwordRef.current.value,
        };

        if (
            formValuesObject.firstName &&
            formValuesObject.lastName &&
            formValuesObject.email &&
            formValuesObject.password
        ) {
            try {
                const response = await fetch(
                    `${import.meta.env.VITE_BACKEND_URL}/user`,
                    {
                        method: "POST",
                        body: JSON.stringify(formValuesObject),
                        headers: { "Content-Type": "application/json" },
                    });

                const responseData = await response.json();

                if (response.ok) {
                    setShowSuccessAlert(true);
                    setErrorMessage(null);
                    setTimeout(() => navigate("/signin"), 2000);
                } else {
                    setShowSuccessAlert(false);
                    setErrorMessage(responseData.error || "Error creating user");
                }
            } catch (error) {
                setShowSuccessAlert(false);
                setErrorMessage("Network error occurred. Please try again.");
            }
        } else {
            setErrorMessage("All fields are required.");
        }
    };


    return (
        <>
            {showSuccessAlert && (
                <div className="alert alert-success" role="alert">
                    User created successfully! Redirecting to Sign In...
                </div>
            )}

            {errorMessage && (
                <div className="alert alert-danger" role="alert">
                    {errorMessage}
                </div>
            )}

            <div
                className="container d-flex justify-content-center align-items-center"
                style={{ minHeight: "90vh" }}
            >
                <div
                    className="card p-4"
                    style={{ width: "400px", borderRadius: "10px" }}
                >
                    <h2 className="text-center mb-2">SignUp to TheraMotion</h2>
                    <p className="text-center mb-3">Move Through Life</p>

                    <form onSubmit={signUpHandler}>
                        <div className="mb-3">
                            <label htmlFor="firstName" className="form-label">
                                First Name
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                id="firstName"
                                ref={firstNameRef}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="lastName" className="form-label">
                                Last Name
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                id="lastName"
                                ref={lastNameRef}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="inputEmail4" className="form-label">
                                Email
                            </label>
                            <input
                                type="email"
                                className="form-control"
                                id="inputEmail4"
                                ref={emailRef}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label
                                htmlFor="inputPassword4"
                                className="form-label"
                            >
                                Password
                            </label>
                            <input
                                type="password"
                                className="form-control"
                                id="inputPassword4"
                                ref={passwordRef}
                                required
                            />
                        </div>

                        <div className="d-grid gap-2 mb-3">
                            <button type="submit" className="btn btn-dark">
                                Sign Up
                            </button>
                        </div>

                        <div className="text-center">
                            <p>
                                Already have an account?{" "}
                                <Link to="/signin">Sign In</Link>
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}

export default SignUp;
