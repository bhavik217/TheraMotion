import { Link } from "react-router-dom";

function Navbar({ logo }) {
    return (
        <nav className="navbar bg-body-tertiary border-bottom fixed-top">
            <div className="container-sm">
                <Link className="navbar-brand" to="/">
                    <img width="180" height="50" src={logo} alt="" />
                </Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar"
                    aria-controls="offcanvasNavbar" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="offcanvas offcanvas-end" tabIndex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
                    <div className="offcanvas-header">
                        <h5 className="offcanvas-title" id="offcanvasNavbarLabel">Site</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                    </div>
                    <div className="offcanvas-body">
                        <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
                            <li className="nav-item">
                                <Link to="/" className="nav-link active" aria-current="page" >Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/meet-team">Meet Our Team</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/join-team">Join Our Team</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/services">Service</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/blog">Blog</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </nav>
    );
}
export default Navbar;