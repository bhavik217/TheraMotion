import { useState } from "react";
import "./Dropdown.css";
import RoutingButton from "../RoutingButton/RoutingButton";

const Dropdown = ({ name, arr }) => {
    const [showServices, setShowServices] = useState(false);
    const cser = () => setShowServices(!showServices);

    return (
        <div className="bookoserv">
            <div className="d11" onClick={cser}>
                <div className="d111">
                    <h5>{name}</h5>
                    <i className="fa-solid fa-chevron-down"></i>
                </div>
            </div>
            {showServices &&
                arr.map((data, index) => (
                    <RoutingButton
                        key={index}
                        name={data.hdata}
                        time={data.time}
                    />
                ))}
        </div>
    );
};
export default Dropdown;
