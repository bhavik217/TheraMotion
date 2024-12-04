import { useEffect, useState } from 'react';
import Bookservice from "../components/BookService";
import Needform from '../components/NeedForm';
import data from "./data/service";
import serdata from './data/service2';
import "./BookAppt.css";

const BookAppt = () => {
  useEffect(() => {
    console.log("Component Loaded BookAppt.jsx");
  }, []);

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
              <button className="btn11 appo1" onClick={changebtnapp}>Appointments</button>
              <button className="btn11 group1" onClick={changebtngrp}>Group Sessions</button>
            </div>
            {
              // Render Bookservice components based on the value of btn
              btn
                ? serdata.map((data, index) => (
                    <Bookservice key={index} name={data.name} arr={data.arr} />
                  ))
                : data.map((data, index) => (
                    <Bookservice key={index} name={data.name} arr={data.arr} />
                  ))
            }
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