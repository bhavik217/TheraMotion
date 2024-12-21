import "./RoutingButton.css";
import { Link } from "react-router-dom";

const RoutingButton = ({ name, time }) => {
    return (
        <div className="bookoserhid">
            <div className="hid1">
                <h5>{name}</h5>
                <div className="btnbox">
                    <div className="time">{time}</div>
                    <Link to="/person" state={{ name }}>
                        <button className="btn btn-success" aria-label={`Select ${name}`}>
                            Select
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
};
export default RoutingButton;