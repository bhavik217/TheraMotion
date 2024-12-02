import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SignUpSignInPage.css';

function SignUpSigninPage({ initialMode = 'Signin' }) {
    const navigate = useNavigate();
    const [SigninData, setSigninData] = useState({
        email: '',
        password: ''
    });

    const [signupData, setSignupData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: ''
    });

    const isSignin = initialMode === 'Signin';

    const handleSigninChange = (e) => {
        const { name, value } = e.target;
        setSigninData((prevState) => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSignupChange = (e) => {
        const { name, value } = e.target;
        setSignupData((prevState) => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSigninSubmit = (e) => {
        e.preventDefault();
        console.log('Signin Data:', SigninData);
    };

    const handleSignupSubmit = (e) => {
        e.preventDefault();
        console.log('Signup Data:', signupData);
    };

    const handleModeSwitch = () => {
        setSigninData({ email: '', password: '' });
        setSignupData({ firstName: '', lastName: '', email: '', password: '' });
        navigate(isSignin ? '/signup' : '/Signin');
    };

    return (
        <div className="signup-Signin-page">
            <div style={{ height: "10.4vh" }}></div>

            <section className="signup-Signin-section">
                <div className="container">
                    <div className="signup-Signin-card">
                        <div className="card-header">
                            <div className="heading-primary">
                                <span>{isSignin ? 'Signin to' : 'Sign Up for'} MoveMend</span>
                            </div>
                            <div className="heading-secondary">
                                <span>Move Through Life</span>
                            </div>
                        </div>
                        <div className="card-body">
                            <form onSubmit={isSignin ? handleSigninSubmit : handleSignupSubmit}>
                                {!isSignin && (
                                    <div className="row">
                                        <div className="col-md-6 mb-3">
                                            <input
                                                type="text"
                                                className="form-control"
                                                name="firstName"
                                                placeholder="First Name"
                                                value={signupData.firstName}
                                                onChange={handleSignupChange}
                                                required
                                            />
                                        </div>
                                        <div className="col-md-6 mb-3">
                                            <input
                                                type="text"
                                                className="form-control"
                                                name="lastName"
                                                placeholder="Last Name"
                                                value={signupData.lastName}
                                                onChange={handleSignupChange}
                                                required
                                            />
                                        </div>
                                    </div>
                                )}
                                <div className="mb-3">
                                    <input
                                        type="email"
                                        className="form-control"
                                        name="email"
                                        placeholder="Email Address"
                                        value={isSignin ? SigninData.email : signupData.email}
                                        onChange={isSignin ? handleSigninChange : handleSignupChange}
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <input
                                        type="password"
                                        className="form-control"
                                        name="password"
                                        placeholder="Password"
                                        value={isSignin ? SigninData.password : signupData.password}
                                        onChange={isSignin ? handleSigninChange : handleSignupChange}
                                        required
                                    />
                                </div>
                                <div className="buttons mb-3">
                                    <button
                                        type="submit"
                                        className="btn"
                                    >
                                        {isSignin ? 'Log In' : 'Sign Up'}
                                    </button>
                                </div>
                                <div className="text-center">
                                    <p>
                                        {isSignin
                                            ? "Don't have an account? "
                                            : "Already have an account? "}
                                        <a
                                            href="#"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                handleModeSwitch();
                                            }}
                                        >
                                            {isSignin ? 'Sign Up' : 'Sign In'}
                                        </a>
                                    </p>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );

}

export default SignUpSigninPage;
