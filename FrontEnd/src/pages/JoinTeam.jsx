import './JoinTeam.css'
// import joinData from '../Data/JoinData'
// import Content from "../Components/Content";
import { Link } from "react-router-dom"; 

function JoinTeam(){
    function showhide(num) {
        for (let i = 1; i <= 5; i++) {
            var which = "content" + i;
            var content = document.getElementById(which);
            if (i === parseInt(num)) {
                content.style.display = "block";
            }
            else {
                content.style.display = "none";
            }
        }
    }
    return(
        <div className="jointeam">
            <section className="section1">
                <div className="container">
                    <div className="heading1"><span>Our Team</span></div>
                    <div className="buttons">
                        <Link to="/"><span className="w-btn-label">Home <i class="fa-solid fa-chevron-right"></i></span></Link>
                        <Link to="/meet-team"><span className="w-btn-label"> Our Team</span></Link>
                    </div>
                </div>
            </section>

            <section className="row mx-0 section2">
                <div className="col-md-6 sub-container1">
                    <span className="heading">Hi! Can we help you Move Through Life?</span>
                    <p>Are you looking for a career and not just a job? If you are then MoveMend could provide you with the
                        perfect opportunity. Just by landing on this page you have taken the first step, but let us tell you a
                        bit about ourselves so we can make sure we're right for each other!</p>
                    <p>We're always on the lookout for smart, talented people, so if you like what you see here, reach out for a
                        chat. We love going for a coffee.</p>
                    <button className="btn btn-dark" onClick={() => window.scrollBy(0, 1400)}>Get in contact with us</button>
                </div>
                <div className="col-md-6 p-0 sub-container2">
                    <img src="/Join-team-imgs/Sec1.jpg" alt=""/>
                </div>
            </section>

            <section className="row mx-0 flex-sm-row-reverse section3">
                <div className="col-md-6 sub-container2">
                    <span className="heading">"We redefine the modern healthcare experience whilst empowering our team and
                        supporting
                        our community to move through life."</span>
                    <div style={{height: "1.5vh"}}></div>
                    <p>What does that mean? It means the latest technology in the clinic, including VALD force measurement
                        systems for our team members to have objective measures to demonstrate success with clients. It also
                        means pathways and career progressions (see below). It means we have an all inclusive, non gendered Paid
                        Parental Leave Policy, which supports parents to both go on leave and return to work.</p>
                    <p>Our team includes: Physiotherapists, Pelvic Health Physiotherapists, Exercise Physiologists, Osteopaths,
                        Podiatrists, Dieticians, Myotherapists and Remedial Massage Therapists!</p>
                    <span className="heading">"We Go MoveMend, We are Good People, We Level up & We have fun!"</span>
                </div>
                <div className="col-md-6 p-0 sub-container1">
                    <img src="/Join-team-imgs/Sec2.jpg" alt=""/>
                </div>
            </section>

            <section className="section4">
                <div>
                    <span className="heading1">What does the interview process look like at MoveMend?</span>
                </div>
                <div style={{margin: "1vw 35vw"}}>
                    <hr/>
                </div>
                <div className="buttons">
                    <button className="btn" onClick={() => showhide('1')}>Step 1</button>
                    <button className="btn" onClick={() => showhide('2')}>Step 2</button>
                    <button className="btn" onClick={() => showhide('3')}>Step 3</button>
                    <button className="btn" onClick={() => showhide('4')}>Step 4</button>
                    <button className="btn" onClick={() => showhide('5')}>Step 5</button>
                </div>
                <div style={{marginTop: "7vh"}}>
                    {
                        joinData.map((data, index) => {
                            return <Content h={data.h} p={data.p} index={index+1} key={index}/>
                        })
                    }
                </div>
            </section>

            <section className="section5">
                <span>If you have any questions about joining the team please email: <Link to="/meet-team">adminmovemend@gmail.com</Link></span>
            </section>
            <hr/>

            <section className="section7">
                <div>
                    <h5>Looking to Book an Appointment?</h5>
                </div>
                <div>
                    <p>MoveMend is here to help you Move through life! Booking an appointment online is the most convenient way
                        to
                        lock in the location, practitioner &amp; time you want.</p>
                </div>
                <div className="btn">
                    <Link to="/book-appointment"><span>Book an Appointment</span></Link>
                </div>
            </section>

            <Footer/>
        </div>
    );
}
export default JoinTeam;