import "./Carousel2.css";

function Carousel2({ img1, img2, img3, num, h1, h2, h3, p1, p2, p3 }) {
    return (
        <div
            id={`carousel${num}`}
            className="carousel slide newclass carousel2"
            data-bs-ride="carousel"
            data-bs-interval="3000"
        >
            <div className="carousel-indicators">
                <button
                    type="button"
                    data-bs-target={`#carousel${num}`}
                    data-bs-slide-to="0"
                    className="active"
                    aria-current="true"
                    aria-label="Slide 1"
                ></button>
                <button
                    type="button"
                    data-bs-target={`#carousel${num}`}
                    data-bs-slide-to="1"
                    aria-label="Slide 2"
                ></button>
                <button
                    type="button"
                    data-bs-target={`#carousel${num}`}
                    data-bs-slide-to="2"
                    aria-label="Slide 3"
                ></button>
            </div>
            <div className="carousel-inner">
                <div className="carousel-item active">
                    <a href="/Team/ashleigh.html" target="_blank">
                        <img src={img1} className="d-block w-100" alt="..." />
                    </a>
                    <div className="carousel-caption d-none d-md-block">
                        <h2>{h1}</h2>
                        <p>{p1}</p>
                    </div>
                </div>
                <div className="carousel-item">
                    <a href="/Team/holly.html" target="_blank">
                        <img src={img2} className="d-block w-100" alt="..." />
                    </a>
                    <div className="carousel-caption d-none d-md-block">
                        <h2>{h2}</h2>
                        <p>{p2}</p>
                    </div>
                </div>
                <div className="carousel-item">
                    <a href="/Team/lachlan.html" target="_blank">
                        <img src={img3} className="d-block w-100" alt="..." />
                    </a>
                    <div className="carousel-caption d-none d-md-block">
                        <h2>{h3}</h2>
                        <p>{p3}</p>
                    </div>
                </div>
            </div>
            <button
                className="carousel-control-prev"
                type="button"
                data-bs-target={`#carousel${num}`}
                data-bs-slide="prev"
            >
                <span
                    className="carousel-control-prev-icon"
                    aria-hidden="true"
                ></span>
                <span className="visually-hidden">Previous</span>
            </button>
            <button
                className="carousel-control-next"
                type="button"
                data-bs-target={`#carousel${num}`}
                data-bs-slide="next"
            >
                <span
                    className="carousel-control-next-icon"
                    aria-hidden="true"
                ></span>
                <span className="visually-hidden">Next</span>
            </button>
        </div>
    );
}

export default Carousel2;
