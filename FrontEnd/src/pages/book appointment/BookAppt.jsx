import { useState } from "react";
import Dropdown from "../../components/elements/Dropdown/Dropdown";
import Needform from "../../components/NeedForm/NeedForm";
import { BookApptData1, BookApptData2 } from "../../pages/data/BookApptData";
import "./BookAppt.css";

const BookAppt = () => {
    const [btn, setbtn] = useState(true);

    const changebtnapp = () => {
        setbtn(true);
    };
    const changebtngrp = () => {
        setbtn(false);
    };

    return (
        <div className="booko">
            <div style={{ height: "15vh" }}></div>
            <div className="container">
                <div className="row">
                    <div className="col-md-7">
                        <h5>Select a Service</h5>
                        <p>Prices are inclusive of tax, if applicable</p>
                        <div className="btn-group" role="group">
                            <button
                                className={`btn11 ${btn ? 'active' : ''} appo1`}
                                onClick={changebtnapp}
                            >
                                Appointments
                            </button>
                            <button
                                className={`btn11 ${!btn ? 'active' : ''} group1`}
                                onClick={changebtngrp}
                            >
                                Group Sessions
                            </button>
                        </div>
                        {btn
                            ? BookApptData1.map((data, index) => (
                                <Dropdown
                                    key={index}
                                    name={data.name}
                                    arr={data.arr}
                                />
                            ))
                            : BookApptData2.map((data, index) => (
                                <Dropdown
                                    key={index}
                                    name={data.name}
                                    arr={data.arr}
                                />
                            ))}
                    </div>

                    <div className="col-md-4">
                        <Needform />
                    </div>
                </div>
            </div>
            <br />
        </div>
    );
};

export default BookAppt;
