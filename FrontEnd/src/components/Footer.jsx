function Footer() {
    return (
        <footer
            className="row row-cols-1 row-cols-sm-2 row-cols-md-5 py-5 mx-0 border-top"
            style={{ background: "#2b2e34", color: "#ffffff" }}
        >
            <div className="container-fluid col-lg-4 mb-3">
                <div>
                    <span>Theramotion</span>
                </div>
                <div>
                    <span>Our Commitment:</span>
                    <p>
                        Theramotion acknowledges the Traditional Owners of country
                        throughout Australia, in particular the Wathaurong &
                        Wurundjeri land in which we work. We pay our respect to
                        their Elders past, present and emerging.
                    </p>
                    <p>
                        Theramotion is an allied health clinic that provides quality
                        healthcare in an environment that is safe and inclusive
                        for people of all genders.
                    </p>
                    <p>
                        Our team is committed to a patient focused care model,
                        we work as a team to get the best health outcomes for
                        you.
                    </p>
                </div>
            </div>

            <div className="container-fluid col mb-3">
                <h5 className="px-3">Contact Us</h5>
                <ul className="nav flex-column list1">
                    <li className="nav-item">
                        <a
                            href="/"
                            className="nav-link"
                            style={{ color: "#ffffff" }}
                        >
                            Send an Email
                        </a>
                    </li>
                    <li className="nav-item">
                        <a
                            href="/"
                            className="nav-link"
                            style={{ color: "#ffffff" }}
                        >
                            1300 181 035
                        </a>
                    </li>
                    <li className="nav-item">
                        <a
                            href="/"
                            className="nav-link"
                            style={{ color: "#ffffff" }}
                        >
                            See Our Locations
                        </a>
                    </li>
                </ul>
            </div>

            <div className="container-fluid col mb-3">
                <h5>Our Hours</h5>
                <ul className="nav flex-column list2">
                    <li className="nav-item">Mon: 7am - 7pm</li>
                    <li className="nav-item">Tues: 7am - 7pm</li>
                    <li className="nav-item">Wed: 7am - 7pm</li>
                    <li className="nav-item">Thurs: 7am - 7pm</li>
                    <li className="nav-item">Fri: 7am - 6:30pm</li>
                    <li className="nav-item">Sat: 8am - 1pm</li>
                </ul>
            </div>
        </footer>
    );
}
export default Footer;
