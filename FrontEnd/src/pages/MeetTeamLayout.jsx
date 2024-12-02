import { Outlet } from "react-router-dom";
import { Link } from "react-router-dom";
import "./MeetTeamLayout.css";

const MeetTeamLayout = () => {
    return (
        <div className="meetteam-layout">
            <section className="section1">
                <div className="container">
                    <div className="heading1"><span>Our Team</span></div>
                    <div className="buttons">
                        <Link to="/"><span className="w-btn-label">Home <i className="fa-solid fa-chevron-right"></i></span></Link>
                        <Link to="/meet-team"><span className="w-btn-label"> Our Team</span></Link>
                    </div>
                </div>
            </section>

            <Outlet />

            <section className="section4">
                <div>
                    <h5>Looking to Book an Appointment?</h5>
                </div>
                <div>
                    <p>Site is here to help you Move through life! Booking an appointment online is the most convenient way to
                        lock in the location, practitioner &amp; time you want.</p>
                </div>
                <div title="Book Online" className="btn1">
                    <Link to="/book-appointment"><span>Book an Appointment</span></Link>
                </div>
            </section>
        </div>
    );
};

export default MeetTeamLayout;