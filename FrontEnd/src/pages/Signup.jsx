import { useRef, useState } from "react";

function SignUp() {
    const firstNameRef = useRef(null);
    const lastNameRef = useRef(null);
    const emailRef = useRef(null);
    const passwordRef = useRef(null);

    const [showSuccessAlert, setShowSuccessAlert] = useState(false);
    const [showFailureAlert, setShowFailureAlert] = useState(false);

    const signUpHandler = async (event) => {
        event.preventDefault();

        var formValuesObject = {
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
        )
        {
            // Make an API/web service call to submit the user details
            var response = await fetch("http://localhost:8080/user", {
                method: "POST",
                body: JSON.stringify({ ...formValuesObject }),
                headers: {
                    "Content-Type": "application/json"
                }
            });

            if (response.ok && (response.status == 201 || response.status == 200)) {
                setShowFailureAlert(false);
                setShowSuccessAlert(true);
            } else {
                setShowSuccessAlert(false);
                setShowFailureAlert(true);
            }
        }
        else {
            setShowFailureAlert(true);
        }
    };

    const updateFirstName = () => {
        console.log("on change called: ", firstNameRef);
    };

    return (
        <>
            {showSuccessAlert && (
                window.alert("User created successfully")
            )}

            {showFailureAlert && (
                window.alert("Error Creating User")
            )}

            {/* Centered container with adjusted form layout */}
            <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: "90vh" }}>
                <div className="card p-4" style={{ width: "400px", borderRadius: "10px" }}>
                    <h2 className="text-center mb-2">SignUp to TheraMotion</h2>
                    <p className="text-center mb-3">Move Through Life</p>

                    <form onSubmit={signUpHandler}>
                        <div className="mb-3">
                            <label htmlFor="firstName" className="form-label">First Name</label>
                            <input
                                type="text"
                                className="form-control"
                                id="firstName"
                                ref={firstNameRef}
                                onChange={updateFirstName}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="lastName" className="form-label">Last Name</label>
                            <input
                                type="text"
                                className="form-control"
                                id="lastName"
                                ref={lastNameRef}
                                required
                            />
                        </div>
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
                            <button type="submit" className="btn btn-dark">Sign Up</button>
                        </div>

                        <div className="text-center">
                            <p>Already have an account? <a href="/login">Sign In</a></p>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}

export default SignUp;