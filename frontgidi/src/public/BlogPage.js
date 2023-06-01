import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { Header } from "./Header";
import Viewer from "../utils/Viewer";
import { htmlToMarkdown } from "../utils/Parser";

export const BlogPage = () => {
  const location = useLocation();

  const { blog, ultimos } = location.state;

  const [mark, setMark] = useState("");

  useEffect(() => {
    //console.log(blog);
    parseToHtml(blog?.content);
  }, []);

  const parseToHtml = (string) => {
    setMark(htmlToMarkdown(string));
    //console.log(htmlToMarkdown(string))
  };

  const opciones = {
    weekday: "long",
    year: "numeric",
    month: "short",
    day: "numeric",
  };
  return (
    <>
      <Header />
      <section className="page-header">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <div className="block">
                <h1 style={{ fontSize: 46 }}>{blog?.title}</h1>
                <br />
                <ul className="list-inline mb-0">
                  <li className="list-inline-item">
                    <a href="/">Home</a>
                  </li>
                  <li className="list-inline-item">/</li>
                  <li className="list-inline-item">{blog?.subtitle}</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="page-wrapper">
        <div className="container">
          <div className="row">
            <div className="col-md-8">
              <div className="post-single">
                <div className="post-thumb">
                  <img src={blog?.photos[0]} alt="" className="img-fluid" />
                </div>

                <div className="single-post-content">
                  <div className="post-meta mt-4">
                    <span className="post-date">
                      <i className="fa fa-calendar-alt mr-2"></i>
                      {new Date(blog?.createdAt).toLocaleDateString(
                        "es-MX",
                        opciones
                      )}
                    </span>
                    <span>
                      <a href="#" className="post-author">
                        <i className="fa fa-user mr-2"></i>
                        {blog?.user?.firstName}
                        {blog.user.lastName ? " " + blog?.user?.lastName : ""}
                      </a>
                    </span>
                  </div>

                  <blockquote>{blog?.resume}</blockquote>

                  <div className="row mt-5 mb-4">
                    <div className="col-lg-6">
                      <img src={blog?.photos[1]} alt="" className="img-fluid" />
                    </div>
                    <div className="col-lg-6">
                      <img src={blog?.photos[2]} alt="" className="img-fluid" />
                    </div>
                  </div>

                  <Viewer value={htmlToMarkdown(blog?.content).toString()} />
                </div>

                {/* <div className="blog-footer d-lg-flex align-items-center justify-content-between">
                  <div className="single-tags">
                    <a href="#">#Marketing</a>
                    <a href="#">#Design </a>
                    <a href="#">#Development</a>
                  </div>

                  <div className="post-share">
                    <a href="#">
                      <i className="ti-facebook"></i>
                    </a>
                    <a href="#">
                      <i className="ti-twitter"></i>
                    </a>
                    <a href="#">
                      <i className="ti-linkedin"></i>
                    </a>
                    <a href="#">
                      <i className="ti-pinterest"></i>
                    </a>
                  </div>
                </div> */}
              </div>
            </div>
            <div className="col-md-4">
              <div className="blog-sidebar mt-5 mt-lg-0">
                {/* <div className="widget widget_search">
                  <h4 className="widget-title">Search</h4>
                  <form role="search" className="search-form">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Search"
                    />
                    <button type="submit" className="search-submit">
                      <i className="fa fa-search"></i>
                    </button>
                  </form>
                </div>
                      */}
                <div className="widget widget_news">
                  <h4 className="widget-title">Latest Posts</h4>
                  <ul className="recent-posts">
                    {ultimos?.map((last, i) => {
                      //console.log(lasted);
                      return (
                        <li key={i}>
                          <div className="widget-post-thumb">
                            <button
                              onClick={() =>
                                navigate("/verBlog", {
                                  state: { blog: last, ultimos: ultimos },
                                })
                              }
                            >
                              <img
                                src={last?.photos[0]}
                                alt=""
                                className="img-fluid"
                              />
                            </button>
                          </div>
                          <div className="widget-post-body">
                            <span>
                              {new Date(last?.createdAt).toLocaleDateString(
                                "es-MX",
                                opciones
                              )}
                            </span>
                            <h6>
                              <button
                                onClick={() =>
                                  navigate("/verBlog", {
                                    state: { blog: last },
                                  })
                                }
                              >
                                {last?.title}
                              </button>
                            </h6>
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                </div>

                <div className="widget widget_tag_cloud">
                  <h4 className="widget-title">Tags</h4>
                  {blog?.keywords.map((word, i) => {
                    return <a key={i}>{word}</a>;
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
