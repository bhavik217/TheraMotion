import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const authToken = localStorage.getItem("authToken");
        setIsAuthenticated(!!authToken);
    }, []);

    const handleAuthToggle = () => {
        if (isAuthenticated) {
            localStorage.removeItem("authToken");
            localStorage.removeItem("loggedInUserEmail");
            localStorage.removeItem("userDetails");
            setIsAuthenticated(false);
            navigate("/");
        } else {
            navigate("/signin");
        }
    };

    // Toggle menu visibility
    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    // Close menu
    const closeMenu = () => {
        setMenuOpen(false);
    };

    return (
        <div>
            <nav className="navbar navbar-light bg-light fixed-top">
                <div className="container d-flex justify-content-between align-items-center">
                    <Link to="/" className="navbar-brand">
                        <img
                            src="/path-to-logo.png"
                            alt="Site Logo"
                            style={{ width: "40px", height: "40px" }}
                        />
                    </Link>
                    <div className="d-flex align-items-center">
                        <button
                            className="btn btn-outline-dark me-2 d-none d-md-block"
                            onClick={handleAuthToggle}
                        >
                            {isAuthenticated ? "Sign Out" : "Sign In"}
                        </button>
                        <button className="menu-toggle" onClick={toggleMenu}>
                            <span className="navbar-toggler-icon"></span>
                        </button>
                    </div>
                </div>
            </nav>

            {/* Side Drawer Menu */}
            <div className={`side-drawer ${menuOpen ? "open" : ""}`}>
                <button className="close-btn" onClick={closeMenu}>
                    &times;
                </button>
                <ul className="menu-links">
                    <li>
                        <Link to="/" onClick={closeMenu}>
                            Home
                        </Link>
                    </li>
                    <li>
                        <Link to="/dashboard" onClick={closeMenu}>
                            Dashboard
                        </Link>
                    </li>
                    <li>
                        <Link to="/meet-team" onClick={closeMenu}>
                            Meet Our Team
                        </Link>
                    </li>
                    <li>
                        <Link to="/join-team" onClick={closeMenu}>
                            Join Our Team
                        </Link>
                    </li>
                    <li>
                        <Link to="/services" onClick={closeMenu}>
                            Services
                        </Link>
                    </li>
                    <li>
                        <Link to="/blog" onClick={closeMenu}>
                            Blog
                        </Link>
                    </li>
                    <li className="d-lg-none">
                        <button
                            className="btn btn-link auth-button"
                            onClick={handleAuthToggle}
                        >
                            {isAuthenticated ? "Sign Out" : "Sign In"}
                        </button>
                    </li>
                </ul>
            </div>

            {/* Backdrop */}
            {menuOpen && <div className="backdrop" onClick={closeMenu}></div>}
        </div>
    );
};

export default Navbar;
