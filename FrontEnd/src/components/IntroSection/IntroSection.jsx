import "./IntroSection.css";
import { Link } from "react-router-dom";

function IntroSection({
    hd1 = null,
    hd2 = null,
    hd3 = null,
    content1 = null,
    content2 = null,
    links = [],
    linksNames = [],
    toReverse = null,
    img = null,
    carousel = null,
    buttonProps = null,
}) {
    return (
        <section className={`row mx-0 ${toReverse} intro-section`}>
            <div className="col-sm-6 first-container">
                {hd1 && <h1 className="heading1">{hd1}</h1>}
                {hd2 && <div className="heading2">{hd2}</div>}
                {hd3 && <div className="heading3">{hd3}</div>}
                {content1 && (
                    <div className="content1">
                        <p>{content1}</p>
                    </div>
                )}
                {content2 && (
                    <div className="content1">
                        <p>{content2}</p>
                    </div>
                )}
                <div style={{ height: "3vh" }}></div>
                {links.length > 0 && (
                    <div className="links">
                        {links.map((link, index) => (
                            <div key={index}>
                                <Link to={link}>{linksNames[index]} &gt;</Link>
                            </div>
                        ))}
                    </div>
                )}
                {buttonProps && (
                    <button
                        className={`btn ${buttonProps.color}`}
                        onClick={buttonProps.onClick}
                    >
                        {buttonProps.text}
                    </button>
                )}
            </div>
            <div className="col-sm-6 p-0 second-container">
                {img && <img src={img} alt="" />}
                {carousel && (
                    <div className="carousel-container">{carousel}</div>
                )}
            </div>
        </section>
    );
}
export default IntroSection;
