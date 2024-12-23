import "./MainPage.css";
import { Link } from "react-router-dom";

import Carousel from "../../components/elements/Carousel/Carousel";
import Carousel2 from "../../components/elements/Carousel/Carousel2";
import IntroSection from "../../components/IntroSection/IntroSection";
// import Bookappoint from "../Components/Bookappoint";

function MainPage() {
    const carouselProps = {
        img1: "/Services-imgs/Car1-1.jpg",
        img2: "/Services-imgs/Car1-2.jpg",
        img3: "/Services-imgs/Car1-3.jpg",
        num: "1",
        h1: "Exercise Physiology",
        h2: "Myotherapy",
        h3: "Physiotherapy",
    };
    const carouselProps2 = {
        img1: "/Meet-team-imgs/Ashleigh.jpg",
        img2: "/Meet-team-imgs/Holly.jpg",
        img3: "/Meet-team-imgs/Lachlan.jpg",
        num: "2",
        h1: "Ashleigh Podolak",
        h2: "Holly Eckert",
        h3: "Lachlan White",
        p1: "Physiotherapist",
        p2: "Exercise Physiologist",
        p3: "Osteopath",
    };
    const carouselProps3 = {
        img1: "/Services-imgs/Car3-1.jpg",
        img2: "/Services-imgs/Car3-2.jpg",
        img3: "/Services-imgs/Car3-3.jpg",
        num: "3",
        h1: "Healthy Bones at Every Age",
        h2: "Arthritis of Lower Back",
        h3: "Back Pain Relief",
    };

    return (
        <div className="mainpage">
            <IntroSection
                hd1="Welcome To Theramotion"
                hd2="Helping You Move Through Life."
                links={["/book-appointment", "/meet-team", "/join-team"]}
                linksNames={[
                    "Book an Appointment",
                    "Meet the Team",
                    "Join our Team",
                ]}
                img="/Mainpage.jpg"
            />

            <section className="section2">
                <div className="container">
                    <div className="heading1">Our Services Help You</div>
                    <div className="heading2">Move Through Life.</div>
                    <div style={{ height: "3vh" }}></div>
                    <div className="buttons">
                        <div>
                            <Link to="/services">
                                <span className="w-btn-label">
                                    See Our Services
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

            <IntroSection
                content1="At Theramotion we believe in a patient focused care model, by offering a range of services under the one roof and a team approach we want to help you 'Move Through Life'."
                links={["/services"]}
                linksNames={["See our Services"]}
                carousel={<Carousel {...carouselProps} />}
            />

            <section className="section4">
                <div className="container">
                    <div className="heading1">
                        <span>Our Team Help You</span>
                    </div>
                    <div className="heading2">
                        <span>Move Through Life.</span>
                    </div>
                    <div style={{ height: "3vh" }}></div>
                    <div className="buttons">
                        <div className="btn1">
                            <Link title="Our Team" to="/meet-team">
                                <span className="w-btn-label">
                                    Meet The Team
                                </span>
                            </Link>
                        </div>
                        <div className="btn2">
                            <Link title="Book Online" to="/book-appointment">
                                <span className="w-btn-label">
                                    Book an Appointment
                                </span>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            <IntroSection
                content1="Our core mission at Theramotion is to help our team 'Move Through Life'. We have a dedicated part of our business that works on team recruitment and team development so that our team is full of like-minded allied health professionals committed to helping their clients achieve their health goals."
                links={["/meet-team", "/join-team"]}
                linksNames={["Meet the whole team", "Join the Theramotion team"]}
                carousel={<Carousel2 {...carouselProps2} />}
            />

            <section className="section6">
                <div className="container">
                    <div className="heading1">
                        <span>Our Services Help You</span>
                    </div>
                    <div className="heading2">
                        <span>Move Through Life.</span>
                    </div>
                    <div style={{ height: "3vh" }}></div>
                    <div className="buttons">
                        <div>
                            <Link title="Blog" to="/blog">
                                <span className="w-btn-label">
                                    View Our Resources
                                </span>
                            </Link>
                        </div>
                        <div>
                            <Link title="Book Online" to="/book-appointment">
                                <span className="w-btn-label">
                                    Book an Appointment
                                </span>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            <IntroSection
                content1="Feel free to dive deep into our back catalogue of blogs. We love providing relevant and easily digestible
                        blog posts to help educate our community. Feel free to use the search bar in our blog section to look for a
                        post that may interest you."
                links={["/blog"]}
                linksNames={["Search our Blog Posts & Resources"]}
                carousel={<Carousel {...carouselProps3} />}
            />
        </div>
    );
}
export default MainPage;
