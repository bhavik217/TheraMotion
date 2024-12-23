import "./Servicebox.css";

const ServiceBox = ({ heading, image }) => {
    return (
        <div className="col-md-3 mb-4">
            <div
                className="d-flex align-items-center justify-content-center transition-bg-color"
                style={{ backgroundImage: `url(${image})` }}
            >
                <h4 className="fw-bold z-10">{heading}</h4>
            </div>
        </div>
    );
};
export default ServiceBox;
