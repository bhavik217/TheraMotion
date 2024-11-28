import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './MainPage.css';

function SignUpLoginPage({ initialMode = 'login' }) {
    const navigate = useNavigate();
    const [loginData, setLoginData] = useState({
        email: '',
        password: ''
    });

    const [signupData, setSignupData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: ''
    });

    const isLogin = initialMode === 'login';

    const handleLoginChange = (e) => {
        const { name, value } = e.target;
        setLoginData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSignupChange = (e) => {
        const { name, value } = e.target;
        setSignupData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleLoginSubmit = (e) => {
        e.preventDefault();
        //Login logic
        console.log('Login Data:', loginData);
    };

    const handleSignupSubmit = (e) => {
        e.preventDefault();
        // Signup logic
        console.log('Signup Data:', signupData);
    };

    const handleModeSwitch = () => {
        // Reset data when switching modes
        setLoginData({ email: '', password: '' });
        setSignupData({ firstName: '', lastName: '', email: '', password: '' });
        
        // Navigate to the opposite route
        navigate(isLogin ? '/signup' : '/login');
    };

    return (
        <div className="mainpage">
            <div style={{height: "10.4vh"}}></div>
            
            <section className="section4">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-md-6">
                            <div className="card">
                                <div className="card-header">
                                    <div className="heading1">
                                        <span>{isLogin ? 'Login to' : 'Sign Up for'} MoveMend</span>
                                    </div>
                                    <div className="heading2">
                                        <span>Move Through Life</span>
                                    </div>
                                </div>
                                <div className="card-body">
                                    <form onSubmit={isLogin ? handleLoginSubmit : handleSignupSubmit}>
                                        {!isLogin && (
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
                                                value={isLogin ? loginData.email : signupData.email}
                                                onChange={isLogin ? handleLoginChange : handleSignupChange}
                                                required
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <input 
                                                type="password" 
                                                className="form-control" 
                                                name="password"
                                                placeholder="Password"
                                                value={isLogin ? loginData.password : signupData.password}
                                                onChange={isLogin ? handleLoginChange : handleSignupChange}
                                                required
                                            />
                                        </div>
                                        <div className="buttons mb-3">
                                            <button 
                                                type="submit" 
                                                className="btn w-100"
                                                style={{
                                                    backgroundColor: '#2b2e34',
                                                    color: 'white',
                                                    padding: '10px 20px'
                                                }}
                                            >
                                                {isLogin ? 'Log In' : 'Sign Up'}
                                            </button>
                                        </div>
                                        <div className="text-center">
                                            <p>
                                                {isLogin 
                                                    ? "Don't have an account? " 
                                                    : "Already have an account? "}
                                                <a 
                                                    href="#" 
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        handleModeSwitch();
                                                    }}
                                                >
                                                    {isLogin ? 'Sign Up' : 'Log In'}
                                                </a>
                                            </p>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default SignUpLoginPage;