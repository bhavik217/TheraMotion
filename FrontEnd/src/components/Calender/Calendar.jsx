import { useState } from "react";
import "./Calendar.css";
import { Link, useLocation } from "react-router-dom";
import Needform from "../NeedForm/NeedForm";
import Time from "../Time/Time";

const Calendar = () => {
    const location = useLocation();
    const { name, ser } = location.state || {};

    const currentDate = new Date();
    const [currentMonth, setCurrentMonth] = useState(currentDate.getMonth());
    const [currentYear, setCurrentYear] = useState(currentDate.getFullYear());
    const [selecteddate, setselecteddate] = useState("");
    const [dis, setdisplay] = useState(true);

    const monthNames = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    const generateCalendar = () => {
        const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
        const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

        const dates = [];
        for (let i = 0; i < firstDayOfMonth; i++) {
            dates.push(
                <li key={`empty-${i}`} className="calendar-date inactive-date"></li>
            );
        }

        for (let i = 1; i <= daysInMonth; i++) {
            const date = new Date(currentYear, currentMonth, i);
            const isPastDate = currentDate > date;
            const isToday =
                currentDate.toDateString() === date.toDateString();

            dates.push(
                <li
                    key={i}
                    className={`calendar-date ${isPastDate ? "inactive-date" : ""} ${
                        isToday ? "today-date" : ""
                    }`}
                    onClick={() => !isPastDate && selectDate(i)}
                >
                    <div className="date-number">{i}</div>
                    <div className="shape-container">
                        <i className="far fa-circle shape-icon"></i>
                        <i className="far fa-square shape-icon"></i>
                        <i className="far fa-lightbulb shape-icon"></i>
                    </div>
                </li>
            );
        }
        return dates;
    };

    const selectDate = (day) => {
        const selectedDate = new Date(currentYear, currentMonth, day);
        const formattedDate = selectedDate.toLocaleDateString("en-US", {
            day: "numeric",
            month: "long",
            year: "numeric",
        });
        setselecteddate(formattedDate);
        setdisplay(false);
    };

    const prevMonth = () => {
        const today = new Date();
        if (
            currentYear > today.getFullYear() ||
            (currentYear === today.getFullYear() && currentMonth > today.getMonth())
        ) {
            if (currentMonth === 0) {
                setCurrentMonth(11);
                setCurrentYear(currentYear - 1);
            } else {
                setCurrentMonth(currentMonth - 1);
            }
        }
    };

    const nextMonth = () => {
        if (currentMonth === 11) {
            setCurrentMonth(0);
            setCurrentYear(currentYear + 1);
        } else {
            setCurrentMonth(currentMonth + 1);
        }
    };

    return (
        <div className="cal">
            <div style={{ height: "15vh" }}></div>
            <div className="container">
                <div className="row">
                    {dis && (
                        <div className="col-md-7 div1">
                            <br />
                            <br />
                            <h4>Select a date for your Session</h4>
                            <br />
                            <br />
                            <div className="calendar-container">
                                <header className="calendar-header">
                                    <span className="chevron-icons" onClick={prevMonth}>
                                        &lt;
                                    </span>
                                    <h2 className="calendar-month">
                                        {monthNames[currentMonth]} {currentYear}
                                    </h2>
                                    <span className="chevron-icons" onClick={nextMonth}>
                                        &gt;
                                    </span>
                                </header>
                                <div className="calendar-body">
                                    <ul className="calendar-weekdays">
                                        <li>Sun</li>
                                        <li>Mon</li>
                                        <li>Tue</li>
                                        <li>Wed</li>
                                        <li>Thu</li>
                                        <li>Fri</li>
                                        <li>Sat</li>
                                    </ul>
                                    <ul className="calendar-dates">
                                        {generateCalendar()}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    )}

                    {!dis && (
                        <Time
                            date={selecteddate}
                            setdisplay={setdisplay}
                            practitioner={name}
                            service={ser}
                        />
                    )}

                    <div className="col-md-4">
                        <Needform />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Calendar;