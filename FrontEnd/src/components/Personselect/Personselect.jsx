import { Link, useLocation } from "react-router-dom";
import Needform from "../NeedForm/NeedForm";
import pdata from "../../pages/data/personData";
import PersonInfo from "../PersonInfo/PersonInfo";
import "./Personselect.css";

function Personselect() {
    const location = useLocation();
    const { name } = location.state || {};

    return (
        <div className="perselect">
            <div className="container">
                <div className="row">
                    <div className="col-md-7">
                        <h4>Select a practitioner</h4>
                        <div className="pracc">
                            <h5>Any practitioner</h5>
                            <Link
                                to="/person/calendar"
                                className="btn btn-success btno"
                            >
                                Select{" "}
                                <i className="fa-solid fa-chevron-right"></i>
                            </Link>
                        </div>

                        <div className="names">
                            {pdata.map((data, index) => (
                                <PersonInfo
                                    key={index}
                                    name={data.name}
                                    speciality={data.speciality}
                                    interest={data.interest}
                                    ser={name}
                                />
                            ))}
                        </div>
                    </div>
                    <div className="col-md-4">
                        <Needform />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Personselect;