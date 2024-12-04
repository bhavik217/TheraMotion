import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

export function SignIn() {
    const emailRef = useRef(null);
    const passwordRef = useRef(null);
    const [signInSuccess, setSignInSuccess] = useState(false);

    useEffect(() => {
        if (signInSuccess) {
            fetchUserDetails();
        }
    }, [signInSuccess]);

    const signInHandler = async (event) => {
        event.preventDefault();

        var formValuesObject = {
            email: emailRef.current.value,
            password: passwordRef.current.value,
        };

        console.log("The event is: ", event);
        console.log("The form values are: ", formValuesObject);

        if (formValuesObject.email && formValuesObject.password) {
            console.log("Submit this form");
            const signInResponse = await fetch("http://localhost:8081/user/signin", {
                method: "POST",
                body: JSON.stringify(formValuesObject),
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (signInResponse.ok && signInResponse.status == "200") {
                const signInResponseData = await signInResponse.json();
                localStorage.setItem("authToken", signInResponseData?.token);
                localStorage.setItem("loggedInUserEmail", formValuesObject.email);
                setSignInSuccess(true);
                alert("Signin success");
                window.location.href = '/dashboard';
            } else {
                alert("Signin failed");
            }
        } else {
            alert("Form is invalid");
        }
    };

    const fetchUserDetails = async () => {
        let email = localStorage.getItem("loggedInUserEmail");
        var productsResponse = await fetch(`http://localhost:8081/user/${email}`, {
            method: "GET",
            headers: {
                Authorization: localStorage.getItem("authToken"),
            },
        });
        var userDetails = await productsResponse.json();
        console.log("The user details are: ", userDetails);
        if (productsResponse.ok && productsResponse.status == "200") {
            localStorage.setItem("userDetails", JSON.stringify(userDetails));
            // window.location.href = '/dashboard';
        } else {
            console.log("Failed to fetch user details");
        }
    };

    return (
        <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: "90vh" }}>
            <div className="card p-4" style={{ width: "400px", borderRadius: "10px" }}>
                <h2 className="text-center mb-2">Sign In to TheraMotion</h2>
                <p className="text-center mb-3">Move Through Life</p>

                <form onSubmit={signInHandler}>
                    <div className="mb-3">
                        <label htmlFor="inputEmail4" className="form-label">Email</label>
                        <input
                            type="email"
                            className="form-control"
                            id="inputEmail4"
                            ref={emailRef}
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="inputPassword4" className="form-label">Password</label>
                        <input
                            type="password"
                            className="form-control"
                            id="inputPassword4"
                            ref={passwordRef}
                            required
                        />
                    </div>
                    <div className="d-grid gap-2 mb-3">
                        <button type="submit" className="btn btn-dark">Sign In</button>
                    </div>
                    <div className="text-center">
                        <p>Don't have an account? <Link to="/signup">Sign Up</Link></p>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default SignIn;