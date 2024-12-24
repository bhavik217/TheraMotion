import "./Footer.css";

function Footer() {
    return (
        <footer className="footer">
            {/* About Section */}
            <div className="footer-col footer-col-lg">
                <div>
                    <span>Theramotion</span>
                </div>
                <div>
                    <span>Our Commitment:</span>
                    <p>
                        Theramotion acknowledges the Traditional Owners of country
                        throughout Australia, in particular the Wathaurong & Wurundjeri land
                        in which we work. We pay our respect to their Elders past, present, and emerging.
                    </p>
                    <p>
                        Theramotion is an allied health clinic that provides quality healthcare
                        in an environment that is safe and inclusive for people of all genders.
                    </p>
                    <p>
                        Our team is committed to a patient-focused care model. We work as a team
                        to get the best health outcomes for you.
                    </p>
                </div>
            </div>

            {/* Contact Section */}
            <div className="footer-col footer-col-sm">
                <h5>Contact Us</h5>
                <ul>
                    <li>
                        <a href="mailto:info@theramotion.com">Send an Email</a>
                    </li>
                    <li>
                        <a href="tel:1300181035">1300 181 035</a>
                    </li>
                </ul>
            </div>

            {/* Quick Links Section */}
            <div className="footer-col footer-col-sm">
                <h5>Quick Links</h5>
                <ul>
                    <li>
                        <a href="/">Home</a>
                    </li>
                    <li>
                        <a href="/services">Services</a>
                    </li>
                    <li>
                        <a href="/blog">Blogs</a>
                    </li>
                    <li>
                        <a href="/join-team">Join Our team</a>
                    </li>
                </ul>
            </div>

            {/* Copyright Section */}
            <div className="footer-bottom">
                <p>
                    © {new Date().getFullYear()} Theramotion. All rights reserved.
                </p>
            </div>
        </footer>
    );
}

export default Footer;
