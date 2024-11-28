import './IntroSection.css'
import { Link } from "react-router-dom";

function IntroSection({hd1=null, hd2=null, hd3=null, content=null, links=[], linksNames=[], img=null, carousel=null }) {
    return (
        <section className="row mx-0 section1">
            <div className="col-sm-6 first-container">
                {hd1 && <h1 className="heading1">{hd1}</h1>}
                {hd2 && <div className="heading2">{hd2}</div>}
                {hd3 && <div className="heading3">{hd3}</div>}
                {content && <div className="content1">
                    <p>{content}</p>
                </div>}
                <div style={{ height: "3vh" }}></div>
                {links.length > 0 && <div className="links">
                    <p>
                        {links.map((link, index) =>
                            <>
                                <Link to={link}>{linksNames[index]} &gt;</Link><br />
                            </>
                        )}
                    </p>
                </div>}
            </div>
            <div className="col-sm-6 p-0 second-container">
                {img && <img src={img} alt="" />}
                {carousel && <div className="carousel-container">{carousel}</div>}
            </div>
        </section>
    )
}
export default IntroSection;