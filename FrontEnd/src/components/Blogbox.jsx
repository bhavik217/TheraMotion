import "./Blogbox.css";

function BlogBox({ head, image, time, author, type }) {
    return (
        <div className="card blog-card shadow-sm border-0">
            <div
                className="card-img-top blog-card-image"
                style={{ backgroundImage: `url(${image})` }}
            ></div>
            <div className="card-body text-white p-3 blog-card-overlay">
                <h5 className="card-title fw-bold">{head}</h5>
                <div className="d-flex justify-content-between small">
                    <p>
                        <i className="fa-solid fa-calendar me-1"></i> {time}
                    </p>
                    <p>
                        <i className="fa-solid fa-user me-1"></i> {author}
                    </p>
                    <p>
                        <i className="fa-solid fa-pen me-1"></i> {type}
                    </p>
                </div>
            </div>
        </div>
    );
}
export default BlogBox;
