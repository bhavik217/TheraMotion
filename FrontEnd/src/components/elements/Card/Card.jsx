import { Link } from "react-router-dom";

// data - img, key, person, service, category, p
function Card({ data }) {
    const personSlug = data.person.toLowerCase().replace(/\s+/g, "-");
    return (
        <div className={`card-container`}>
            <div className="col p-0 card text-center">
                <Link to={`/meet-team/${personSlug}`}>
                    <img
                        className="card-img-top"
                        src={data.img}
                        alt="Image not found"
                    />
                </Link>
                <div className="card-body p-0 mt-2">
                    <span className="card-title" style={{ fontSize: "1.3rem" }}>
                        {data.person}
                    </span>
                    <hr />
                    <span>
                        <strong>{data.service}</strong>
                    </span>
                    <p className="card-text">{data.p}</p>
                    <Link to={`/meet-team/${personSlug}`} className="btn">
                        See Profile
                    </Link>
                </div>
            </div>
        </div>
    );
}
export default Card;
