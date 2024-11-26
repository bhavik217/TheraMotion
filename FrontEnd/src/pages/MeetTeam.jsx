import './MeetTeam.css'
import { Link } from "react-router-dom";
import { useState } from 'react';
import Card from '../components/elements/Card'
import meetData from '../pages/data/meetData';

function MeetTeam(){
    const [filter, setFilter] = useState('all');

    function filterCards(category) {
        setFilter(category);
    }

    return(
        <div className="meetteam">
            <section className="section1">
                <div className="container">
                <div className="heading1"><span>Our Team</span></div>
                    <div className="buttons">
                        <Link to="/"><span className="w-btn-label">Home <i class="fa-solid fa-chevron-right"></i></span></Link>
                        <Link to="/meet-team"><span className="w-btn-label"> Our Team</span></Link>
                    </div>
                </div>
            </section>

            <section className="section2 text-center">
                <div className="container">
                    <div className="heading">
                        <span>Select your Treatment Style</span>
                    </div>
                    <div className="dropdown">
                        <button className="btn dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">Treatment Style</button>
                        <ul className="dropdown-menu">
                            <li className="dropdown-item" onClick={() => filterCards('all')}>Show all</li>
                            <li className="dropdown-item" onClick={() => filterCards('exercise')}>Exercise Physiologist</li>
                            <li className="dropdown-item" onClick={() => filterCards('physio')}>Physiotherapy</li>
                            <li className="dropdown-item" onClick={() => filterCards('osteo')}>Osteopath</li>
                            <li className="dropdown-item" onClick={() => filterCards('myoth')}>Myotherapist</li>
                        </ul>
                    </div>
                </div>
            </section>

            <div className="container">
                <section className="section3 row row-cols-2 row-cols-md-3 row-cols-lg-4">
                {
                    meetData.map((data, index) => {
                        if(filter === 'all' || filter === data.category){
                            return <Card key={index} data={data}/>
                        }
                        return null;
                    })
                }
                </section>
            </div>

            <section className="section4">
                <div>
                    <h5>Looking to Book an Appointment?</h5>
                </div>
                <div>
                    <p>Site is here to help you Move through life! Booking an appointment online is the most convenient way to
                    lock in the location, practitioner &amp; time you want.</p>
                </div>
                <div title="Book Online" className="btn1">
                    <Link to="/book-appointment"><span>Book an Appointment</span></Link>
                </div>
            </section>
        </div>
    );
}
export default MeetTeam;