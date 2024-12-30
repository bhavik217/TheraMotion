import "./NeedForm.css";

function Needform() {
    return (
        <div className="needformo">
            <h4>Need Help with making an Appointment?</h4>
            <p>
                The Client Experience Team is here to assist you. If you are
                having trouble booking online or would prefer a different
                method, please reach out to us on any of the contact methods
                below:
            </p>
            <div className="call">
                <p>
                    <a href="tel:0019902543" className="contact-link">
                        <i className="fa-solid fa-mobile"></i>
                        &nbsp;&nbsp;&nbsp;0019&nbsp;902&nbsp;543
                    </a>
                </p>
            </div>
            <div className="email">
                <p>
                    <a href="mailto:admin@TheraMotion.com" className="contact-link">
                        <i className="fa-solid fa-envelope"></i>
                        &nbsp;&nbsp;&nbsp;admin@TheraMotion.com
                    </a>
                </p>
            </div>
        </div>
    );
}

export default Needform;
