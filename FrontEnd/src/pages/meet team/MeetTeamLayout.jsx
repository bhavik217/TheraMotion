import { Outlet } from "react-router-dom";
import { Link } from "react-router-dom";
import "./MeetTeamLayout.css";

const MeetTeamLayout = () => {
    return (
        <div className="meetteam-layout">
            <section className="section1">
                <div className="container">
                    <div className="heading1">
                        <span>Our Team</span>
                    </div>
                    <div className="buttons">
                        <Link to="/">
                            <span className="w-btn-label">
                                Home{" "}
                                <i className="fa-solid fa-chevron-right"></i>
                            </span>
                        </Link>
                        <Link to="/meet-team">
                            <span className="w-btn-label"> Our Team</span>
                        </Link>
                    </div>
                </div>
            </section>

            <Outlet />
        </div>
    );
};
export default MeetTeamLayout;
