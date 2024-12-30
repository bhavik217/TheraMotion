import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { authEvent } from "../../routes";

export function SignIn() {
    const location = useLocation();
    const emailRef = useRef(null);
    const passwordRef = useRef(null);
    const [signInError, setSignInError] = useState(location.state?.message || "");
    const [signInSuccess, setSignInSuccess] = useState(false);
    const navigate = useNavigate();


    useEffect(() => {
        if (signInSuccess) {
            fetchUserDetails();
        }
    }, [signInSuccess]);

    const signInHandler = async (event) => {
        event.preventDefault();
        setSignInError("");

        const formValuesObject = {
            email: emailRef.current.value.trim(),
            password: passwordRef.current.value,
        };

        if (formValuesObject.email && formValuesObject.password) {
            try {
                const signInResponse = await fetch(
                    `${import.meta.env.VITE_BACKEND_URL}/user/signin`,
                    {
                        method: "POST",
                        body: JSON.stringify(formValuesObject),
                        headers: {
                            "Content-Type": "application/json",
                        },
                    }
                );

                if (signInResponse.ok) {
                    const signInResponseData = await signInResponse.json();
                    localStorage.setItem("authToken", signInResponseData?.token);
                    localStorage.setItem(
                        "loggedInUserEmail",
                        formValuesObject.email
                    );
                    setSignInSuccess(true);
                    authEvent.dispatchEvent(new Event('authStateChanged'));
                    // window.location.href = "/profile";
                    navigate("/profile");
                } else {
                    const errorData = await signInResponse.json();
                    setSignInError(errorData?.message || "Either email or password is incorrect.");
                }
            } catch (error) {
                console.error("Sign-in error:", error);
                setSignInError("An unexpected error occurred. Please try again.");
            }
        } else {
            setSignInError("Please fill in all fields.");
        }
    };

    const fetchUserDetails = async () => {
        let email = localStorage.getItem("loggedInUserEmail");

        try {
            const productsResponse = await fetch(
                `${import.meta.env.VITE_BACKEND_URL}/user/${email}`,
                {
                    method: "GET",
                    headers: {
                        Authorization: localStorage.getItem("authToken"),
                    },
                }
            );

            if (productsResponse.ok) {
                const userDetails = await productsResponse.json();
                console.log("The user details are: ", userDetails);
                localStorage.setItem("userDetails", JSON.stringify(userDetails));
            } else {
                console.log("Failed to fetch user details");
            }
        } catch (error) {
            console.error("Error fetching user details:", error);
        }
    };

    return (
        <div
            className="container d-flex justify-content-center align-items-center"
            style={{ minHeight: "90vh" }}
        >
            <div
                className="card p-4"
                style={{ width: "400px", borderRadius: "10px" }}
            >
                <h2 className="text-center mb-2">Sign In to TheraMotion</h2>
                <p className="text-center mb-3">Move Through Life</p>

                {signInError && (
                    <div className="alert alert-danger" role="alert">
                        {signInError}
                    </div>
                )}

                <form onSubmit={signInHandler}>
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
                        <label htmlFor="inputPassword4" className="form-label">
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
                            Sign In
                        </button>
                    </div>
                    <div className="text-center">
                        <p>
                            Don't have an account?{" "}
                            <Link to="/signup">Sign Up</Link>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default SignIn;
