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
                    <i className="fa-solid fa-mobile"></i>
                    &nbsp;&nbsp;&nbsp;0019&nbsp;902&nbsp;543
                </p>
            </div>
            <div className="email">
                <p>
                    <i className="fa-solid fa-envelope"></i>
                    &nbsp;&nbsp;&nbsp;admin@TheraMotion.com
                </p>
            </div>
            <form>
                <div className="inp1">
                    <div className="namee">
                        <h5>Name</h5>
                        <input type="text" className="inp" placeholder="Your name" />
                    </div>
                    <div className="phone">
                        <h5>Phone</h5>
                        <input type="text" className="inp" placeholder="Your phone number" />
                    </div>
                </div>
                <div className="emai">
                    <h5>Email</h5>
                    <input type="email" className="inp" placeholder="Your email address" />
                </div>
                <div className="mess">
                    <h5>Message</h5>
                    <textarea className="inp" placeholder="How can we help you?" />
                </div>
                <div className="submit">
                    <button className="bsub" type="submit">
                        SUBMIT
                    </button>
                </div>
            </form>
        </div>
    );
}

export default Needform;