import { Link } from "react-router-dom";
import "./Time.css";

const Time = ({ date, setdisplay, practitioner, service }) => {
    console.log(practitioner, service, date);
    const changedis = () => {
        setdisplay(true);
    };
    return (
        <div className="timee col-md-7 div2">
            <h4>Select a time for your session</h4>
            <br />

            <div className="timings">
                <div className="date">
                    <div className="d">{date}</div>
                    <div className="c" onClick={changedis}>
                        <i className="fa-solid fa-xmark"></i>
                    </div>
                </div>
                <div className="time">
                    <div className="t">
                        <h5>Morning</h5>
                        <br />
                        <Link
                            to="/form"
                            state={{
                                practitioner,
                                service,
                                date,
                                time: "9:00 am",
                            }}
                        >
                            <button className="ti">9:00 am </button>
                            <br />
                            <br />
                        </Link>
                        <Link
                            to="/form"
                            state={{
                                practitioner,
                                service,
                                date,
                                time: "10:00 am",
                            }}
                        >
                            <button className="ti">10:00 am </button>
                            <br />
                            <br />
                        </Link>
                        <Link
                            to="/form"
                            state={{
                                practitioner,
                                service,
                                date,
                                time: "11:00 am",
                            }}
                        >
                            <button className="ti">11:00 am </button>
                        </Link>
                    </div>
                    <div className="t">
                        <h5>Afternoon</h5>
                        <br />
                        <Link
                            to="/form"
                            state={{
                                practitioner,
                                service,
                                date,
                                time: "1:00 pm",
                            }}
                        >
                            <button className="ti">1:00 pm </button>
                            <br />
                            <br />
                        </Link>
                        <Link
                            to="/form"
                            state={{
                                practitioner,
                                service,
                                date,
                                time: "2:00 pm",
                            }}
                        >
                            <button className="ti">2:00 pm </button>
                        </Link>
                    </div>
                    <div className="t">
                        <h5>Evening</h5>
                        <br />
                        <Link
                            to="/form"
                            state={{
                                practitioner,
                                service,
                                date,
                                time: "5:30 am",
                            }}
                        >
                            <button className="ti">5:30 pm </button>
                            <br />
                            <br />
                        </Link>
                        <Link
                            to="/form"
                            state={{
                                practitioner,
                                service,
                                date,
                                time: "6:30 am",
                            }}
                        >
                            <button className="ti">6:30 pm </button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Time;
