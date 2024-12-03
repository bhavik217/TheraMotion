import { useRef, useState } from "react";
import { Link } from "react-router-dom"

function SignIn() {
    const emailRef = useRef(null);
    const passwordRef = useRef(null);

    const signInHandler = async (event) => {
        event.preventDefault();

        var formValuesObject = {
            email: emailRef.current.value,
            password: passwordRef.current.value,
        };

        if (formValuesObject.email && formValuesObject.password) {
            try {
                const signInResponse = await fetch("http://localhost:8081/user/signin", {
                    method: "POST",
                    body: JSON.stringify(formValuesObject),
                    headers: {
                        "Content-Type": "application/json",
                    },
                });

                const signInResponseData = await signInResponse.json();

                if (signInResponse.ok) {
                    alert("Signin success");
                } else {
                    alert(signInResponseData.message || "Signin failed");
                }
            } catch (error) {
                alert("Network error");
            }
        } else {
            alert("Form is invalid");
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