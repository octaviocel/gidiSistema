import React, { useEffect, useState } from "react";

import { Header } from "./Header";
import Preloader from "./Preloader";
import Galleryervice from "../services/GalleryService";
import { useNavigate } from "react-router-dom";

import software4all from "/software4all.jpeg";

export const GalleryPage = () => {
  const [data, setData] = useState([]);
  const [load, setLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    traerGaleria();
  }, []);

  const traerGaleria = async () => {
    try {
      setLoading(true);

      const datos = await Galleryervice.getGalleryPublic();
      setData(datos);
    } catch (error) {
      notifyError(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      {load ? (
        <Preloader />
      ) : (
        <div>
          <Header />
          <section className="team section-padding secondary-bg">
            <div className="container">
              <div className="row justify-content-center">
                <div className="col-lg-6">
                  <div className="section-heading">
                    <h4 className="subheading">Galeria </h4>
                    <span className="subtitle">¿C&oacute;mo trabajamos?</span>
                    <h2>
                      Trabajando en el proceso
                      <span> de educacion ambiental</span>
                    </h2>
                  </div>
                </div>
              </div>

              <div className="row">
                {data.map((dato, i) => {
                  return (
                    <div className="col-lg-3 col-md-6" key={i}>
                      <button
                        onClick={() =>
                          navigate("/galleryDetail", { state: { dato } })
                        }
                      >
                        <div className="team-item">
                          <img
                            src={dato.photos[0]}
                            alt=""
                            className="img-fluid"
                          />

                          <div className="team-info">
                            <h4>{dato.title}</h4>
                            <p>
                              {dato.user.firstName} {dato.user.lastName}
                            </p>
                          </div>
                        </div>
                      </button>
                    </div>
                  );
                })}
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
                        Software4All es una empresa que se dedica al desarrollo
                        de aplicaciones web y móviles de alta calidad.
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
                          <i className="fa fa-map-marker"></i> Cam. a San
                          Agustín 407, 71230 Santa Cruz Xoxocotlán, Oax.
                        </li>
                        <li>
                          {" "}
                          <i className="fa fa-envelope"></i>
                          gidisupport@gmail.com
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
        </div>
      )}
    </>
  );
};
