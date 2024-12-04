import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

function Navbar({ logo }) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
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

    const handleNavItemClick = () => {
        try {
            const offcanvasElement = document.getElementById("offcanvasNavbar");
    
            if (offcanvasElement && typeof bootstrap !== "undefined") {
                const offcanvasInstance = bootstrap.Offcanvas.getInstance(offcanvasElement);
                if (offcanvasInstance) {
                    offcanvasInstance.hide();
                }
            }
    
            const backdrop = document.querySelector(".offcanvas-backdrop");
            if (backdrop) backdrop.remove();
    
            document.body.classList.remove("offcanvas-backdrop", "modal-open", "show", "offcanvas-open");
        } catch (error) {
            console.error("Error closing offcanvas:", error);
        }
    };
    

    return (
        <nav className="navbar bg-body-tertiary border-bottom fixed-top">
            <div className="container-sm">
                <Link className="navbar-brand" to="/">
                    <img
                        width="180"
                        height="50"
                        src={logo}
                        alt="Site Logo"
                        style={{ objectFit: 'contain' }}
                    />
                </Link>

                <div className="d-flex align-items-center">
                    <button
                        className="btn btn-outline-dark me-2 d-none d-md-block"
                        onClick={handleAuthToggle}
                    >
                        {isAuthenticated ? "Logout" : "Sign In"}
                    </button>
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="offcanvas"
                        data-bs-target="#offcanvasNavbar"
                        aria-controls="offcanvasNavbar"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>
                </div>

                <div
                    className="offcanvas offcanvas-end"
                    tabIndex="-1"
                    id="offcanvasNavbar"
                    aria-labelledby="offcanvasNavbarLabel"
                >
                    <div className="offcanvas-header">
                        <h5 className="offcanvas-title" id="offcanvasNavbarLabel">
                            Menu
                        </h5>
                        <button
                            type="button"
                            className="btn-close"
                            data-bs-dismiss="offcanvas"
                            aria-label="Close"
                        ></button>
                    </div>
                    <div className="offcanvas-body">
                        <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
                            {[
                                { path: "/", text: "Home", current: true },
                                { path: "/meet-team", text: "Meet Our Team" },
                                { path: "/join-team", text: "Join Our Team" },
                                { path: "/services", text: "Services" },
                                { path: "/blog", text: "Blog" }
                            ].map((item) => (
                                <li key={item.path} className="nav-item">
                                    <Link
                                        to={item.path}
                                        className={`nav-link ${item.current ? 'active' : ''}`}
                                        aria-current={item.current ? "page" : undefined}
                                        onClick={() => {
                                            handleNavItemClick();
                                        }}
                                    >
                                        {item.text}
                                    </Link>
                                </li>
                            ))}
                            <li className="nav-item d-md-none">
                                <button
                                    className="btn btn-link nav-link"
                                    onClick={() => {
                                        handleNavItemClick();
                                        handleAuthToggle();
                                    }}
                                >
                                    {isAuthenticated ? "Logout" : "Sign In"}
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;