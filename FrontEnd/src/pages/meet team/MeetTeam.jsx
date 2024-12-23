import "./MeetTeam.css";
import { useState } from "react";
import Card from "../../components/elements/Card/Card";
import meetData from "../data/meetTeamData";

function MeetTeam() {
    const [filter, setFilter] = useState("all");

    function filterCards(category) {
        setFilter(category);
    }

    return (
        <>
            <div className="meetteam-content">
                <section className="section2 text-center">
                    <div className="container">
                        <div className="heading">
                            <span>Select your Treatment Style</span>
                        </div>
                        <div className="dropdown">
                            <button
                                className="btn dropdown-toggle"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                            >
                                Treatment Style
                            </button>
                            <ul className="dropdown-menu">
                                <li
                                    className="dropdown-item"
                                    onClick={() => filterCards("all")}
                                >
                                    Show all
                                </li>
                                <li
                                    className="dropdown-item"
                                    onClick={() => filterCards("exercise")}
                                >
                                    Exercise Physiologist
                                </li>
                                <li
                                    className="dropdown-item"
                                    onClick={() => filterCards("physio")}
                                >
                                    Physiotherapy
                                </li>
                                <li
                                    className="dropdown-item"
                                    onClick={() => filterCards("osteo")}
                                >
                                    Osteopath
                                </li>
                                <li
                                    className="dropdown-item"
                                    onClick={() => filterCards("myoth")}
                                >
                                    Myotherapist
                                </li>
                            </ul>
                        </div>
                    </div>
                </section>

                <div className="container">
                    <section className="section3 row row-cols-2 row-cols-md-3 row-cols-lg-4">
                        {meetData.map((data, index) => {
                            if (filter === "all" || filter === data.category) {
                                return <Card key={index} data={data} />;
                            }
                            return null;
                        })}
                    </section>
                </div>
            </div>
        </>
    );
}
export default MeetTeam;
