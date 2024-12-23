import { Link } from "react-router-dom";
import "./BookLink.css";

function BookLink() {
    return (
        <section className="section7">
            <div>
                <h5>Looking to Book an Appointment?</h5>
            </div>
            <div>
                <p>
                    TheraMotion is here to help you Move through life! Booking an
                    appointment online is the most convenient way to lock in the
                    location, practitioner &amp; time you want.
                </p>
            </div>
            <div className="btn">
                <Link to="/book-appointment">
                    <span>Book an Appointment</span>
                </Link>
            </div>
        </section>
    );
}
export default BookLink;
