import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import "./assets/css/bootstrap.css";
import "./assets/vendors/fontawesome/css/all.css";
import "./assets/vendors/themify/themify-icons.css";
import "./assets/vendors/animate-css/animate.css";
import "./assets/vendors/slick/slick.css";
import "./assets/vendors/slick/slick-theme.css";
import "./assets/vendors/owl/assets/owl.carousel.min.css";
import "./assets/vendors/owl/assets/owl.theme.default.css";

import "./assets/css/style.css";
import "./assets/css/responsive.css";

import mapboxgl, { Map, Marker, Popup } from "mapbox-gl";
import BlogService from "../services/BlogService";
import { useNavigate } from "react-router-dom";
import { Header } from "./Header";
import { _keyMapBox } from "../utils/constants";

import imgUrl from "/EIA.jpg";
import software4all from "/software4all.jpeg";

mapboxgl.accessToken = _keyMapBox;

function HomePage() {
  const navigate = useNavigate();
  const mapRef = useRef();

  const [isLoading, setIsLoading] = useState(false);
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    getBlogs();
  }, []);

  const getBlogs = async () => {
    try {
      const datos = await BlogService.getPrincipales();
      if (datos) {
        setBlogs(datos);
        //console.log(datos)
      }
    } catch (error) {
      console.log(error);
    }
  };

  useLayoutEffect(() => {
    if (!isLoading) {
      const map = new Map({
        container: mapRef.current,
        // Choose from Mapbox's core styles, or make your own style with Mapbox Studio
        style: "mapbox://styles/mapbox/streets-v12",
        center: [-96.72132753773425, 17.02216955109365],
        zoom: 18,
        pitch: 65,
        bearing: 15,
        antialias: true,
      });

      map.on("style.load", () => {
        const layers = map.getStyle().layers;
        const labelLayerId = layers.find(
          (layer) => layer.type === "symbol" && layer.layout["text-field"]
        ).id;

        // The 'building' layer in the Mapbox Streets
        // vector tileset contains building height data
        // from OpenStreetMap.
        map.addLayer(
          {
            id: "add-3d-buildings",
            source: "composite",
            "source-layer": "building",
            filter: ["==", "extrude", "true"],
            type: "fill-extrusion",
            minzoom: 15,
            paint: {
              "fill-extrusion-color": "#aaa",

              // Use an 'interpolate' expression to
              // add a smooth transition effect to
              // the buildings as the user zooms in.
              "fill-extrusion-height": [
                "interpolate",
                ["linear"],
                ["zoom"],
                15,
                0,
                15.05,
                ["get", "height"],
              ],
              "fill-extrusion-base": [
                "interpolate",
                ["linear"],
                ["zoom"],
                15,
                0,
                15.05,
                ["get", "min_height"],
              ],
              "fill-extrusion-opacity": 0.6,
            },
          },
          labelLayerId
        );
      });
      const im = new Popup().setLngLat(map.getCenter()).setHTML(`
      <h2 style="align-selft: 'center';">Aqui esta la EIA</h2>
      <img src='${imgUrl}' width='250px' height='200px' />`);

      new Marker().setLngLat(map.getCenter()).setPopup(im).addTo(map);
    }
  }, [isLoading]);

  return (
    <>
      <div id="top-header">
        <Header />
        <section className="banner section-padding banner-2">
          <div className="container">
            <div className="row align-items-center justify-content-center">
              <div className="col-md-12 col-lg-8">
                <div className="banner-content text-center pt-0">
                  {/* <span className="subheading">La Salle Oaxaca</span> */}
                  <h1 className="text-left">
                    La Vida Lasallista con Sustentabilidad
                  </h1>
                  <p className="text-justify">
                    En esta universidad, la sostenibilidad es una prioridad, y
                    uno de los aspectos clave es la gestión de residuos. Desde
                    el primer día, se anima a reducir su huella de carbono y a
                    minimizar la cantidad de residuos que generan.
                  </p>
                  <div className="banner-btn">
                    <a href="/blogs" className="btn btn-main">
                      Ver Blog<i className="ti-angle-right"></i>
                    </a>
                    <a href="/gallery" className="btn btn-border">
                      Ver Fotos<i className="ti-angle-right"></i>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="blog-section section-padding">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-lg-6">
                <div className="section-heading">
                  <h4 className="subheading">Blog </h4>
                  <span className="subtitle">Actividades</span>
                  <h2>
                    Blog <span> La Salle</span>
                  </h2>
                </div>
              </div>
            </div>
            <div className="row">
              {blogs.map((blog, i) => {
                const opciones = {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                };
                //console.log()
                return (
                  <div key={i} className="col-lg-4 col-md-6">
                    <div className="blog-post">
                      <div className="post-media">
                        <span className="post-meta-date">
                          {new Date(blog?.createdAt).toLocaleDateString(
                            "en-us",
                            opciones
                          )}
                        </span>
                        <img
                          src={blog?.photos[0]}
                          alt=""
                          className="img-fluid"
                        />
                      </div>

                      <div className="post-content">
                        <div className="post-meta">
                          <span className="post-author">
                            <i className="ti-user"></i>
                            {blog?.user?.firstName}
                            {blog.user.lastName
                              ? " " + blog?.user?.lastName
                              : ""}
                          </span>
                        </div>
                        <h2 className="post-title">
                          <a>{blog?.title}</a>
                        </h2>
                        <p>{blog?.resume}</p>
                        <button
                          onClick={() =>
                            navigate("verBlog", { state: { blog } })
                          }
                          className="btn btn-main2"
                        >
                          LEER M&Aacute;S<i className="ti-angle-right"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <section className="blog-section section-padding">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-lg-6">
                <div className="section-heading">
                  <h4 className="subheading">Blog News</h4>
                  <span className="subtitle">Mapa La Salle Oaxaca</span>
                  <h2>
                    Donde Encontrar <span> Contenedores</span>
                  </h2>
                </div>
              </div>
            </div>
            <div>
              <div ref={mapRef} style={{ width: "100%", height: "500px" }} />
            </div>
          </div>
        </section>

        <section className="footer">
          <div className="footer-top">
            <div className="container">
              <div className="row">
                <div className="col-lg-4 mr-auto col-sm-6 col-md-6">
                  <div className="footer-widget footer-about mb-5 mb-lg-0">
                    <img
                      src={software4all}
                      alt="Software4All"
                      className="img-fluid"
                      width={"80px"}
                      height={"80px"}
                    />
                    <p className="mt-3">
                      Software4All es una empresa que se dedica al desarrollo de
                      aplicaciones web y móviles de alta calidad.
                    </p>
                    <ul className="list-inline footer-socials">
                      <li className="list-inline-item">
                        <a href="#">
                          <i className="fab fa-facebook-f"></i>
                        </a>
                      </li>
                      <li className="list-inline-item">
                        {" "}
                        <a href="#">
                          <i className="fab fa-twitter"></i>
                        </a>
                      </li>
                      <li className="list-inline-item">
                        <a href="#">
                          <i className="fab fa-linkedin"></i>
                        </a>
                      </li>
                      <li className="list-inline-item">
                        <a href="#">
                          <i className="fab fa-pinterest"></i>
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>

                {/* <div className="col-lg-2 col-sm-6 col-md-6">
                  <div className="footer-widget footer-contact mb-5 mb-lg-0">
                    <h5 className="widget-title">Services</h5>
                    <ul className="list-unstyled">
                      <li>
                        {" "}
                        <a href="#">Our Gallery</a>
                      </li>
                      <li>
                        {" "}
                        <a href="#">Solutions</a>
                      </li>
                      <li>
                        {" "}
                        <a href="#">Our Farmers</a>
                      </li>
                      <li>
                        {" "}
                        <a href="#">Privacy Policy</a>
                      </li>
                    </ul>
                  </div>
                </div> */}

                <div className="col-lg-3 col-sm-6 col-md-6">
                  <div className="footer-widget footer-contact mb-5 mb-lg-0">
                    <h5 className="widget-title">Contacto</h5>
                    <ul className="list-unstyled">
                      <li>
                        {" "}
                        <i className="fa fa-map-marker"></i> Cam. a San Agustín
                        407, 71230 Santa Cruz Xoxocotlán, Oax.
                      </li>
                      <li>
                        {" "}
                        <i className="fa fa-envelope"></i>gidisupport@gmail.com
                      </li>
                      <li>
                        <i className="fa fa-phone"></i>+52 951 256 58 95
                      </li>
                      <li>
                        <i className="fa fa-globe"></i>www.ulsaoaxaca.com.mx
                      </li>
                    </ul>
                  </div>
                </div>

                {/* <div className="col-lg-3 col-sm-6 col-md-6">
                  <div className="footer-widget footer-contact mb-5 mb-lg-0">
                    <h5 className="widget-title">Gallery</h5>
                    <div className="footer-gallery">
                      <ul>
                        <li>
                          <img
                            src="assets/images/gallery/g1.jpg"
                            alt=""
                            className="img-fluid"
                          />
                        </li>
                        <li>
                          <img
                            src="assets/images/gallery/g2.jpg"
                            alt=""
                            className="img-fluid"
                          />
                        </li>
                        <li>
                          <img
                            src="assets/images/gallery/g3.jpg"
                            alt=""
                            className="img-fluid"
                          />
                        </li>
                        <li>
                          <img
                            src="assets/images/gallery/g2.jpg"
                            alt=""
                            className="img-fluid"
                          />
                        </li>
                        <li>
                          <img
                            src="assets/images/gallery/g3.jpg"
                            alt=""
                            className="img-fluid"
                          />
                        </li>
                        <li>
                          <img
                            src="assets/images/gallery/g1.jpg"
                            alt=""
                            className="img-fluid"
                          />
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>*/}
              </div>
            </div>
          </div>

          <div className="footer-btm">
            <div className="container">
              <div className="row copyright-bg">
                <div className="col-lg-6">
                  <div className="copyright text-lg-left text-center">
                    <p>
                      &copy; Copyright reserved to{" "}
                      <a href="themeturn.com">Octavio Celaya</a> - 2023
                    </p>
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="footer-btm-menu text-lg-right text-center">
                    <a href="#">Privacy Policy</a>
                    <a href="#">Term & conditions</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="fixed-btm-top">
          <a href="#top-header" className="js-scroll-trigger scroll-to-top">
            <i className="ti-angle-up"></i>
          </a>
        </div>

        <script src="assets/vendors/jquery/jquery.js"></script>

        <script src="assets/js/bootstrap.js"></script>

        <script src="assets/vendors/counterup/waypoint.js"></script>
        <script src="assets/vendors/counterup/jquery.counterup.min.js"></script>

        <script src="assets/vendors/slick/slick.min.js"></script>
        <script src="assets/vendors/owl/owl.carousel.min.js"></script>
        <script src="assets/js/contact.js"></script>
        <script src="assets/js/script.js"></script>

        <script src="https://api.mapbox.com/mapbox-gl-js/v2.13.0/mapbox-gl.js"></script>
        <link
          href="https://api.mapbox.com/mapbox-gl-js/v2.13.0/mapbox-gl.css"
          rel="stylesheet"
        />
      </div>
    </>
  );
}

export default HomePage;
