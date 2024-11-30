import "./Persons.css";

// import Bookappoint from "../../Components/Bookappoint";
function Person1() {
    function hideshow(num) {
        for (let i = 1; i <= 3; i++) {
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
    return (
        <div className="persons bookoapp">
            <div style={{ height: "10.4vh" }}></div>
            <section className="row mx-0 section1">
                <div className="col-md-6 p-0 sub-container1">
                    <img style={{ width: "100%" }} src="/About-team-imgs/holly.jpg" alt="" />
                </div>
                <div className="col-md-6 sub-container2">
                    <h3><span className="heading">About Holly</span></h3>
                    <p className="para">Holly believes that to live a healthy and happy life, you should aim to have fun in everything you
                        do,
                        especially exercise! Using her holistic approach of mind and body, together you will develop a greater
                        understanding of you and your body's needs to achieve all your goals, in a fun and creative environment.</p>
                    <div className="buttons">
                        <button id="first" className="btn" onClick={() => hideshow('1')}>Clinical Interests</button>
                        <button className="btn" onClick={() => hideshow('2')}>Qualifications</button>
                        <button className="btn" onClick={() => hideshow('3')}>Locations</button>
                    </div>
                    <div style={{ margin: "0vw 5.5vw" }}>
                        <hr />
                    </div>
                    <div className="content" id="content1">
                        <p>Paediatrics</p>
                        <p>Pre & Post Natal & Return to Exercise</p>
                        <p>Chronic Hip and Knee Conditions & Disability</p>
                    </div>
                    <div className="content" id="content2">
                        <p>Masters of Clinical Exercise Physiology</p>
                        <p>Bachelor of Exercise Sport Science</p>
                    </div>
                    <div className="content" id="content3">
                        <p>Blackburn</p>
                        <p>East Melbourne</p>
                    </div>
                </div>
            </section>
            {/* <Bookappoint /> */}
        </div>
    );
}
export default Person1;