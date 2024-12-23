import "./JoinTeam.css";
import joinTeamData from "../data/JoinTeamData";
import { Link } from "react-router-dom";
import IntroSection from "../../components/IntroSection/IntroSection";

function JoinTeam() {
    const scrollFactor = window.innerWidth < 768 ? 3 : 2.25;
    const buttonProps = {
        text: "Get in contact with us",
        onClick: () => window.scrollBy(0, window.innerHeight * scrollFactor),
        color: "btn-dark",
    };
    function showhide(num) {
        for (let i = 1; i <= joinTeamData.length; i++) {
            let which = "content" + i;
            let content = document.getElementById(which);
            content.style.display = "none";
            if (i === parseInt(num)) {
                content.style.display = "block";
            }
        }
    }
    return (
        <div className="jointeam">
            <section className="section1">
                <div className="container">
                    <div className="heading1">
                        <span>Our Team</span>
                    </div>
                    <div className="buttons">
                        <Link to="/">
                            <span className="w-btn-label">
                                Home{" "}
                                <i className="fa-solid fa-chevron-right"></i>
                            </span>
                        </Link>
                        <Link to="/meet-team">
                            <span className="w-btn-label"> Our Team</span>
                        </Link>
                    </div>
                </div>
            </section>

            <IntroSection
                hd2="Hi! Can we help you Move Through Life?"
                content1="Are you looking for a career and not just a job? If you are then TheraMotion could provide you with the perfect opportunity. Just by landing on this page you have taken the first step, but let us tell you a bit about ourselves so we can make sure we're right for each other, We're always on the lookout for smart, talented people, so if you like what you see here, reach out for a chat. We love going for a coffee."
                img="/Join-team-imgs/Sec1.jpg"
                buttonProps={buttonProps}
            />

            <IntroSection
                hd3="We redefine the modern healthcare experience whilst empowering our team and supporting our community to move through life."
                content1="What does that mean? It means the latest technology in the clinic, including VALD force measurement systems for our team members to have objective measures to demonstrate success with clients. It also means pathways and career progressions (see below). It means we have an all inclusive, non gendered Paid Parental Leave Policy, which supports parents to both go on leave and return to work."
                content2="Our team includes: Physiotherapists, Pelvic Health Physiotherapists, Exercise Physiologists, Osteopaths, Podiatrists, Dieticians, Myotherapists and Remedial Massage Therapists! We Go TheraMotion, We are Good People, We Level up & We have fun!"
                img="/Join-team-imgs/Sec2.jpg"
                toReverse="flex-sm-row-reverse"
            />
            <section className="section4">
                <div>
                    <span className="heading1">
                        What does the interview process look like at
                        TheraMotion?
                    </span>
                </div>
                <div style={{ margin: "1vw 35vw" }}>
                    <hr />
                </div>
                <div className="buttons">
                    <button className="btn" onClick={() => showhide("1")}>
                        Step 1
                    </button>
                    <button className="btn" onClick={() => showhide("2")}>
                        Step 2
                    </button>
                    <button className="btn" onClick={() => showhide("3")}>
                        Step 3
                    </button>
                    <button className="btn" onClick={() => showhide("4")}>
                        Step 4
                    </button>
                    <button className="btn" onClick={() => showhide("5")}>
                        Step 5
                    </button>
                </div>
                <div style={{ marginTop: "7vh" }}>
                    {joinTeamData.map((data, index) => {
                        return (
                            <div key={data.key} id={`content${data.key}`}>
                                <div style={{ marginTop: "5vh" }}>
                                    <span className="heading2">{data.h}</span>
                                </div>
                                <p style={{ marginTop: "2vh" }}>{data.p}</p>
                            </div>
                        );
                    })}
                </div>
            </section>

            <section className="section5">
                <span>
                    If you have any questions about joining the team please
                    email:{" "}
                </span>
                <span>
                    <a href="mailto:admin@TheraMotion.com">
                        admin@TheraMotion.com
                    </a>
                </span>
            </section>
            <hr />
        </div>
    );
}
export default JoinTeam;
