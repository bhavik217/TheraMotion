import { useState } from "react";
import { Link } from "react-router-dom";
import "./PersonInfo.css";

const PersonInfo = ({ name, speciality, interest, ser }) => {
    const [dis, setdis] = useState(false);
    const [icon, seticon] = useState("fa-solid fa-chevron-down");

    const change = () => {
        setdis((prevDis) => !prevDis);
        seticon(dis ? "fa-solid fa-chevron-down" : "fa-solid fa-chevron-up");
    };

    return (
        <div className="per">
            <div className="pracname">
                <div>
                    <h5>{name}</h5>
                    <h6>{speciality}</h6>
                </div>
                <div className="btnholder">
                    <button className="moreinfo" onClick={change}>
                        More info <i className={icon}></i>
                    </button>
                    <Link to="calendar" state={{ name, ser }} style={{ textDecoration: 'none' }}>
                        <button className="btn btn-success">
                            Select <i className="fa-solid fa-chevron-right"></i>
                        </button>
                    </Link>
                </div>
            </div>

            {dis && (
                <div className="hid">
                    <h6>Treating Interests:</h6>
                    <ol>
                        {interest.map((data, index) => (
                            <li key={index}>{data}</li>
                        ))}
                    </ol>
                </div>
            )}
        </div>
    );
};
export default PersonInfo;
