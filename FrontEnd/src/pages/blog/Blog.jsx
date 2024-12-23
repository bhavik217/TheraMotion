import React, { useState, useMemo } from "react";
import blogData from "../data/BlogData";
import BlogBox from "../../components/Blogbox/Blogbox";
import { Link } from "react-router-dom";
import "./Blog.css";

function Blog() {
    const [filter, setFilter] = useState("Show All");
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedBlog, setSelectedBlog] = useState(null);

    // Memoized and filtered posts
    const filteredPosts = useMemo(() => {
        return blogData.filter(
            (data) =>
                (filter === "Show All" || filter === data.name) &&
                data.heading.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [filter, searchTerm]);

    const handleFilterChange = (value) => {
        setFilter(value);
    };

    const handleBlogClick = (blog) => {
        setSelectedBlog(blog);
    };

    const renderBlogContent = () => {
        if (!selectedBlog) return null;

        return (
            <div className="blog-details-container">
                <div className="blog-details-header">
                    <button
                        className="btn btn-secondary mb-3"
                        onClick={() => setSelectedBlog(null)}
                    >
                        Back to Blog List
                    </button>
                </div>
                <div className="row">
                    <div className="col-md-6">
                        <img
                            src={selectedBlog.img}
                            alt={selectedBlog.heading}
                            className="img-fluid rounded blog-detail-image"
                        />
                    </div>
                    <div className="col-md-6">
                        <h2 className="blog-detail-title">
                            {selectedBlog.heading}
                        </h2>
                        <div className="blog-detail-meta mb-3">
                            <span className="me-3">
                                <i className="fa-solid fa-calendar me-1"></i>{" "}
                                {selectedBlog.time}
                            </span>
                            <span className="me-3">
                                <i className="fa-solid fa-user me-1"></i>{" "}
                                {selectedBlog.author}
                            </span>
                            <span>
                                <i className="fa-solid fa-pen me-1"></i>{" "}
                                {selectedBlog.type}
                            </span>
                        </div>
                        <div className="blog-detail-content">
                            {selectedBlog.content.map((section, index) => {
                                if (section.type === "paragraph") {
                                    return <p key={index}>{section.text}</p>;
                                }
                                if (section.type === "list") {
                                    return (
                                        <div key={index}>
                                            <h4>{section.title}</h4>
                                            <ul>
                                                {section.items.map(
                                                    (item, itemIndex) => (
                                                        <li key={itemIndex}>
                                                            {item}
                                                        </li>
                                                    )
                                                )}
                                            </ul>
                                        </div>
                                    );
                                }
                                return null;
                            })}
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    const renderBlogList = () => {
        return (
            <div className="row blog-list-row">
                {filteredPosts.length > 0 ? (
                    filteredPosts.map((data) => (
                        <div
                            key={data.heading}
                            className="col-md-4 mb-4"
                            onClick={() => handleBlogClick(data)}
                            style={{ cursor: "pointer" }}
                        >
                            <BlogBox
                                head={data.heading}
                                image={data.img}
                                time={data.time}
                                author={data.author}
                                type={data.type}
                            />
                        </div>
                    ))
                ) : (
                    <div className="col-12 text-center">
                        <p>No posts found matching your search or filter.</p>
                    </div>
                )}
            </div>
        );
    };

    return (
        <div className="blogo">
            <section className="section1">
                <div className="container">
                    <div className="heading1">
                        <span>Blogs</span>
                    </div>
                    <div className="buttons">
                        <Link to="/">
                            <span className="w-btn-label">
                                Home{" "}
                                <i className="fa-solid fa-chevron-right"></i>
                            </span>
                        </Link>
                        <Link to="/blog">
                            <span className="w-btn-label">Blogs</span>
                        </Link>
                    </div>
                </div>
            </section>
            <br /> <br />
            <div className="blogofilter">
                {!selectedBlog && (
                    <div className="container">
                        <div className="row one">
                            <div className="col-4">
                                <div className="nav-item dropdown">
                                    <a
                                        className="nav-link dropdown-toggle"
                                        role="button"
                                        href="#"
                                        data-bs-toggle="dropdown"
                                    >
                                        <span className="full-text">
                                            <h5>Filter By Category</h5>
                                        </span>
                                    </a>
                                    <ul className="dropdown-menu">
                                        {[
                                            "Show All",
                                            "Physiology",
                                            "Pregnancy",
                                            "Basic Health",
                                            "Exercise",
                                            "Posture",
                                        ].map((category) => (
                                            <li
                                                key={category}
                                                onClick={() =>
                                                    handleFilterChange(category)
                                                }
                                            >
                                                <a
                                                    className="dropdown-item"
                                                    href="#"
                                                >
                                                    {category}
                                                </a>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>

                            <div className="col-12 col-md-8">
                                <div className="search-wrapper">
                                    <input
                                        type="text"
                                        placeholder="Search for a Post"
                                        className="innp search-input"
                                        value={searchTerm}
                                        onChange={(e) =>
                                            setSearchTerm(e.target.value)
                                        }
                                    />
                                    <i className="fa-solid fa-magnifying-glass search-icon"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
            <div className="container py-5">
                {selectedBlog ? renderBlogContent() : renderBlogList()}
            </div>
        </div>
    );
}

export default Blog;
