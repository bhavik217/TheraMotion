import "./Needform.css";

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
                    &nbsp;&nbsp;&nbsp;admin@movemend.com
                </p>
            </div>
            <form>
                <div className="inp1">
                    <div className="namee">
                        <h5>Name</h5>
                        <input type="text" className="inp" required />
                        <br />
                        <p className="reqd">This is the required field</p>
                    </div>
                    <div className="phone">
                        <h5>Phone</h5>
                        <input type="text" className="inp" required />
                        <br />
                        <p className="reqd">This is the required field</p>
                    </div>
                </div>
                <div className="emai">
                    <h5>Email</h5>
                    <input type="email" className="inp" required />
                    <br />
                    <p className="reqd">This is the required field</p>
                </div>
                <div className="mess">
                    <h5>Message</h5>
                    <textarea className="inp" required />
                    <br />
                    <p className="reqd">This is the required field</p>
                </div>
                <div className="submit">
                    <button className="bsub" type="submit">
                        SUBMIT
                    </button>
                    <br />
                    <p className="psub">
                        Please Enter Correct Information before Submitting form
                    </p>
                </div>
            </form>
        </div>
    );
}
export default Needform;
