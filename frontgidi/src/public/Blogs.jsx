import React, { useEffect, useState } from "react";
import { notifyError } from "../utils/Toats";
import BlogService from "../services/BlogService";
import { Header } from "./Header";
import ImagesService from "../services/ImagesService";
import { useNavigate } from "react-router-dom";

export const Blogs = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState();

  const [data, setData] = useState([]);
  const [lasted, setLasted] = useState([]);

  const [first, setFirst] = useState(true);

  const [loading, setLoading] = useState(false);
  const [totalPage, setTotalPage] = useState([]);

  //   const totalPage=[];

  useEffect(() => {
    getBlog();
  }, [currentPage]);

  const getBlog = async () => {
    try {
      setLoading(true);
      //console.log(currentPage)
      const datos = await BlogService.getPagination(currentPage);
      if (datos) {
        for (const da of datos.results) {
          for (let index = 0; index < da.photos.length; index++) {
            da.photos[index] = await ImagesService.get(da.photos[index]);
          }
        }
      }
      setData(datos);
      if (first) {
        setLasted(datos?.results.slice(0, 2));
        setFirst(false);
      }

      setCurrentPage(datos.pagination.currentPage);
    } catch (error) {
      notifyError(error);
    } finally {
      setLoading(false);
    }
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
                <h1 style={{ fontSize: 46 }}>Blogs</h1>
                <ul className="list-inline mb-0">
                  <li className="list-inline-item">
                    <a href="/">Home</a>
                  </li>
                  <li className="list-inline-item">/</li>
                  <li className="list-inline-item">Blog</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="blog-page main-content-area">
        <div className="container">
          <div className="row">
            <div className="col-md-8">
              {data?.results?.map((blog, i) => {
                const opciones = {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                };
                return (
                  <article key={i} className="blog-post post-bg">
                    <div className="post-media">
                      <img src={blog?.photos[0]} alt="" className="img-fluid" />
                    </div>

                    <div className="post-content">
                      <div className="post-meta entry-meta">
                        <span className="post-date">
                          <i className="fa fa-calendar-alt"></i>
                          {new Date(blog?.createdAt).toLocaleDateString(
                            "es-MX",
                            opciones
                          )}
                        </span>
                        <span className="post-author">
                          <i className="fa fa-user"></i>
                          {blog?.user?.firstName}
                          {blog.user.lastName ? " " + blog?.user?.lastName : ""}
                        </span>
                      </div>
                      <h2 className="post-title">
                        <a href="blog-single.html">{blog?.title}</a>
                      </h2>
                      <p>{blog?.resume}</p>
                      <button
                        onClick={() =>
                          navigate("/verBlog", { state: { blog } })
                        }
                        className="btn btn-main2"
                      >
                        M&aacute;s Detalles{" "}
                        <i className="fa fa-angle-right"></i>
                      </button>
                    </div>
                  </article>
                );
              })}

              <nav className="blog-pagination">
                <ul>
                  {Array(data?.pagination?.totalPages)
                    .fill(0)
                    .map((val, i) => {
                      //console.log(val);
                      return (
                        <li
                          key={i + 1}
                          className={`page-num ${
                            data?.pagination?.currentPage === i + 1
                              ? "active"
                              : ""
                          }`}
                        >
                          <a onClick={() => setCurrentPage(i + 1)}>{i + 1}</a>
                        </li>
                      );
                    })}
                  {/* <li className="page-num active">
                    <a href="#">2</a>
                  </li> */}
                </ul>
              </nav>
            </div>
            <div className="col-md-4">
              <div className="blog-sidebar mt-5 mt-lg-0">
                <div className="widget widget_news">
                  <h4 className="widget-title">Ultimos Blogs</h4>
                  <ul className="recent-posts">
                    {lasted?.map((last, i) => {
                      //console.log(lasted);
                      return (
                        <li key={i}>
                          <div className="widget-post-thumb">
                            <button
                              onClick={() =>
                                navigate("/verBlog", {
                                  state: { blog: last, ultimos: lasted },
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
                  {lasted?.map((item, i) => {
                    //console.log(item.keywords)
                    return(
                      <div key={i}>
                      {
                        item.keywords.map((it,j)=>{
                          return <a key={j}>{it}</a>;
                        })
                      }
                      </div>
                    );
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
