import { useState } from 'react';
import blogData from './data/BlogData';
import BlogBox from '../components/Blogbox';
import { Link } from 'react-router-dom';
import "./Blog.css"

function Blog() {
  const [filter, setFilter] = useState("Show All");

  const handleFilterChange = (value) => {
    setFilter(value);
  };

  return (
    <div className="blogo">
      {/* Section: Header */}
      <section className="section1">
        <div className="container">
          <div className="heading1"><span>Our Blog</span></div>
          <div className="buttons">
            <Link to="/"><span className="w-btn-label">Home <i className="fa-solid fa-chevron-right"></i></span></Link>
            <Link to="/meet-team"><span className="w-btn-label">Blog</span></Link>
          </div>
        </div>
      </section>

      <br /> <br />
      {/* Blog Filter Section */}
      <div className="blogofilter">
        <div className="container">
          <div className="row one">
            {/* Filter Dropdown */}
            <div className="col-4">
              <div className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" role="button" href="#" data-bs-toggle="dropdown">
                  <span className="full-text"><h5>Filter By Category <i className="fa-solid fa-chevron-down"></i></h5></span>
                  <span className="short-text"><h5>Filter &nbsp;<i className="fa-solid fa-chevron-down"></i></h5></span>
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
                    <li key={category} onClick={() => handleFilterChange(category)}>
                      <a className="dropdown-item" href="#">
                        {category}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Search Bar */}
            <div className="col-12 col-md-8">
              <div className="row">
                <div className="col-10">
                  <input
                    type="text"
                    placeholder="Search for a Post"
                    className="innp"
                  />
                </div>
                <div className="col-2">
                  <i className="fa-solid fa-magnifying-glass"></i>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Blog Posts */}
      <div className="container py-5">
        <div className="row">
          {blogData.map((data) => (
            (filter === "Show All" || filter === data.name) && (
              <BlogBox
                key={data.heading}
                head={data.heading}
                image={data.img}
                time={data.time}
                author={data.author}
                type={data.type}
              />
            )
          ))}
        </div>
      </div>

      {/* <Bookappoint /> */}
    </div>
  );
}
export default Blog;