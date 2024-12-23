import React, { useState } from "react";
import { useParams } from "react-router-dom";
import MeetTeamData from "../../pages/data/meetTeamData";
import "./Persons.css";

function PersonDetail() {
    const { personId } = useParams();
    const [activeTab, setActiveTab] = useState("about");

    const person = MeetTeamData.find(
        (p) => p.person.toLowerCase().replace(/\s+/g, "-") === personId
    );

    if (!person) {
        return <div>Person not found</div>;
    }

    return (
        <div className="persons bookoapp">
            <section className="row mx-0 section1">
                <div className="col-md-6 p-0 sub-container1">
                    <img src={person.img} alt={person.person} />
                </div>
                <div className="col-md-6 sub-container2">
                    <h3>
                        <span className="heading">About {person.person}</span>
                    </h3>
                    <p className="para">{person.about}</p>

                    <div className="buttons">
                        <button
                            className={`btn ${activeTab === "about" ? "active" : ""
                                }`}
                            onClick={() => setActiveTab("about")}
                        >
                            About
                        </button>
                        <button
                            className={`btn ${activeTab === "clinicalInterests"
                                    ? "active"
                                    : ""
                                }`}
                            onClick={() => setActiveTab("clinicalInterests")}
                        >
                            Clinical Interests
                        </button>
                        <button
                            className={`btn ${activeTab === "qualifications" ? "active" : ""
                                }`}
                            onClick={() => setActiveTab("qualifications")}
                        >
                            Qualifications
                        </button>
                        <button
                            className={`btn ${activeTab === "locations" ? "active" : ""
                                }`}
                            onClick={() => setActiveTab("locations")}
                        >
                            Locations
                        </button>
                    </div>

                    <div style={{ margin: "0vw 5.5vw" }}>
                        <hr />
                    </div>

                    <div className="content">
                        {activeTab === "about" && <p>{person.about}</p>}

                        {activeTab === "clinicalInterests" && (
                            <div>
                                {person.clinicalInterests.map(
                                    (interest, index) => (
                                        <p key={index}>{interest}</p>
                                    )
                                )}
                            </div>
                        )}

                        {activeTab === "qualifications" && (
                            <div>
                                {person.qualifications.map((qual, index) => (
                                    <p key={index}>{qual}</p>
                                ))}
                            </div>
                        )}

                        {activeTab === "locations" && (
                            <div>
                                {person.locations.map((location, index) => (
                                    <p key={index}>{location}</p>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </section>
        </div>
    );
}

export default PersonDetail;
