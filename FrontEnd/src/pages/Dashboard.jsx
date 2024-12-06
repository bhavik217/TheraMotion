import "./Dashboard.css";
import { Link } from "react-router-dom";

function Dashboard() {
    return (
        <div className="dashboard">
            <section className="section1">
                <div className="container">
                    <div className="heading1">
                        <span>Dashboard</span>
                    </div>
                    <div className="buttons">
                        <Link to="/">
                            <span className="w-btn-label">
                                Home{" "}
                                <i className="fa-solid fa-chevron-right"></i>
                            </span>
                        </Link>
                        <Link to="/dashboard">
                            <span className="w-btn-label">Dahboard</span>
                        </Link>
                    </div>
                </div>
            </section>

            <section className="section2">
                <div className="container">
                    <div className="heading1">Welcome to Your Dashboard</div>
                    <div className="heading2">Manage Your Services</div>
                    <div style={{ height: "3vh" }}></div>
                    <div className="buttons">
                        <div>
                            <Link to="/services">
                                <span className="w-btn-label">
                                    View Services
                                </span>
                            </Link>
                        </div>
                        <div>
                            <Link to="/book-appointment">
                                <span className="w-btn-label">
                                    Book an Appointment
                                </span>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Dashboard;
