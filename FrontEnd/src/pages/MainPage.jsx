import "./MainPage.css";
import { Link } from "react-router-dom";

import Carousel from '../components/elements/Carousel';
import Carousel2 from "../components/elements/Carousel2";
// import Bookappoint from "../Components/Bookappoint";

function MainPage(){
    return(
        <div className="mainpage">
            <section className="row mx-0 section1">
                <div style={{height: "10.4vh"}}></div>
                <div className="col-sm-6 first-container">
                    <h1 className="heading1">Welcome To MoveMend</h1>
                    <div className="heading2">Helping You Move Through Life.</div>
                    <div style={{height:"3vh"}}></div>
                    <div className="links">
                        <p>
                            <Link to="/book-appointment">Book an Appointment &gt;</Link><br/>
                            <Link to="/meet-team">Meet the Team &gt;</Link><br/>
                            <Link to="/join-team">Join our Team &gt;</Link>
                        </p>
                    </div>
                </div>
                <div className="col-sm-6 p-0 second-container">
                    <img src="/Mainpage.jpg" alt=""/>
                </div>
            </section>

            <section className="section2">
                <div className="container">
                    <div className="heading1">Our Services Help You</div>
                    <div className="heading2">Move Through Life.</div>
                    <div style={{height:"3vh"}}></div>
                    <div className="buttons">
                        <div>
                            <Link to="/services"><span className="w-btn-label">See Our Services</span></Link>
                        </div>
                        <div>
                            <Link to="/book-appointment"><span className="w-btn-label">Book an Appointment</span></Link>
                        </div>
                    </div>
                </div>
            </section>

            <section className="row mx-0 section3">
                <div className="col-sm-6 sub-container1">
                    <div className="content1">
                    <p>At MoveMend we believe in a patient focused care model, by offering a range of services under the one roof
                        and a team approach we want to help you 'Move Through Life'.
                    </p>
                    </div>
                    <div className="content2">
                        <Link to="/services"><span>See all of our Services</span></Link>
                    </div>
                </div>
                <div className="col-sm-6 p-0 sub-container2">
                    <Carousel img1="/Services-imgs/Car1-1.jpg" img2="/Services-imgs/Car1-2.jpg" img3="/Services-imgs/Car1-3.jpg" num={"1"} h1={"Exercise physiology"} h2={"Myotherapy"} h3={"Physiotherapy"}/>
                </div>
            </section>

            <section className="section4">
                <div className="container">
                    <div className="heading1"><span>Our Team Help You</span></div>
                    <div className="heading2"><span>Move Through Life.</span></div>
                    <div style={{height:"3vh"}}></div>
                    <div className="buttons">
                    <div className="btn1">
                        <Link title="Our Team" to="/meet-team"><span className="w-btn-label">Meet The Team</span></Link>
                    </div>
                    <div className="btn2">
                        <Link title="Book Online" to="/book-appointment"><span className="w-btn-label">Book an Appointment</span></Link>
                    </div>
                    </div>
                </div>
            </section>

            <section className="row mx-0 section5">
                <div className="col-sm-6 sub-container1">
                    <div className="content1">
                    <p>Our core mission at MoveMend is to help our team 'Move Through Life'. We have a dedicated part of our
                        business that works on team recruitment and team development so that our team is full of like-minded allied
                        health professionals committed to helping their clients achieve their health goals.
                    </p>
                    </div>
                    <div className="content2">
                    <Link to="/meet-team"><span>Meet the whole team</span></Link>
                    </div>
                    <div className="content2">
                    <Link to="/join-team"><span>Join the MoveMend team</span></Link>
                    </div>
                </div>
                <div className="col-sm-6 p-0 sub-container2">
                    <Carousel2 img1="/Meet-team-imgs/Ashleigh.jpg" img2="/Meet-team-imgs/Holly.jpg" img3="/Meet-team-imgs/Lachlan.jpg" num={"2"} h1={"Ashleigh Podolak"} h2={"Holly Eckert"} h3={"Lachlan White"} p1={"Physiotherapist"} p2={"Exercise Physiologist"} p3={"Osteopath"}/>
                </div>
            </section>

            <section className="section6">
                <div className="container">
                    <div className="heading1"><span>Our Services Help You</span></div>
                    <div className="heading2"><span>Move Through Life.</span></div>
                    <div style={{height:"3vh"}}></div>
                    <div className="buttons">
                    <div>
                        <Link title="Blog" to="/blog"><span className="w-btn-label">View Our Resources</span></Link>
                    </div>
                    <div>
                        <Link title="Book Online" to="/book-appointment"><span className="w-btn-label">Book an Appointment</span></Link>
                    </div>
                    </div>
                </div>
            </section>

            <section className="row mx-0 section7">
                <div className="col-sm-6 sub-container1">
                    <div className="content1">
                    <p>Feel free to dive deep into our back catalogue of blogs. We love providing relevant and easily digestible
                        blog posts to help educate our community. Feel free to use the search bar in our blog section to look for a
                        post that may interest you.
                    </p>
                    </div>
                    <div className="content2">
                    <Link to="/blog"><span>Search our Blog Posts & Resources</span></Link>
                    </div>
                </div>
                <div className="col-sm-6 p-0 sub-container2">
                    {/* <Carousel img1="/Services-imgs/Car3-1.jpg" img2="/Services-imgs/Car3-2.jpg" img3="/Services-imgs/Car3-3.jpg" num={"3"} h1={"Healthy Bones at Every Age"} h2={"Arthritis of Lower Back"} h3={"Back Pain Relief"}/> */}
                </div>
            </section>
           
            {/* <Bookappoint /> */}
        </div>
    );
}
export default MainPage;