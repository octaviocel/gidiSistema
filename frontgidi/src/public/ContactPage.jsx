import React, { useEffect, useState } from "react";
import { notifyError } from "../utils/Toats";
import BlogService from "../services/BlogService";
import { Header } from "./Header";
import ImagesService from "../services/ImagesService";
import { useNavigate } from "react-router-dom";

import software4all from "/software4all.jpeg";

export const ContactPage = () => {
  return (
    <>
      <Header />
      <section className="page-header">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <div className="block">
                <h1 style={{ fontSize: 46 }}>Contacto</h1>
                <ul className="list-inline mb-0">
                  <li className="list-inline-item">
                    <a href="/">Home</a>
                  </li>
                  <li className="list-inline-item">/</li>
                  <li className="list-inline-item">Contacto</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="contact-section pt-100">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="contact-inner d-lg-flex">
                <div className="contact-item">
                  <img
                    src="/images/icons/001-contact.png"
                    alt=""
                    style={{ display: "inline" }}
                    className="img-fluid"
                  />
                  <p>Nuestro Correo</p>
                  <h4>gidisupport@gmail.com</h4>
                </div>
                <div className="contact-item">
                  <img
                    src="/images/icons/002-mail.png"
                    alt=""
                    style={{ display: "inline" }}
                    className="img-fluid"
                  />
                  <p>Llamanos</p>
                  <h4>+52 951 256 58 95</h4>
                </div>
                <div className="contact-item">
                  <img
                    src="/images/icons/003-maps-and-flags.png"
                    alt=""
                    style={{ display: "inline" }}
                    className="img-fluid"
                  />
                  <p>Gidi STEAM</p>
                  <h4>Universidad La Salle Oaxaca </h4>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="contact pb-100">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-6">
              <div className="section-heading">
                <h4 className="subheading">Contacto</h4>
                <span className="subtitle">Mandamos una mensaje</span>
                <h2>Alguna duda o sugerencia</h2>
              </div>
            </div>
          </div>

          <div className="row justify-content-center">
            <div className="col-lg-9">
              <form
                className="contact__form form-row "
                method="post"
                action="mail.php"
                id="contactForm"
              >
                <div className="row"></div>

                <div className="row form-row">
                  <div className="col-lg-6">
                    <div className="form-group">
                      <input
                        type="text"
                        id="name"
                        name="name"
                        className="form-control"
                        placeholder="Nombre"
                      />
                    </div>
                  </div>

                  <div className="col-lg-6">
                    <div className="form-group">
                      <input
                        type="text"
                        name="email"
                        id="email"
                        className="form-control"
                        placeholder="Correo"
                      />
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div className="form-group">
                      <input
                        type="text"
                        name="subject"
                        id="subject"
                        className="form-control"
                        placeholder="Subject"
                      />
                    </div>
                  </div>

                  <div className="col-lg-12">
                    <div className="form-group">
                      <textarea
                        id="message"
                        name="message"
                        cols="30"
                        rows="8"
                        className="form-control"
                        placeholder="Tu mensaje"
                      ></textarea>
                    </div>
                  </div>
                </div>

                <div className="col-lg-12">
                  <div className="mt-4 text-center">
                    <button
                      className="btn btn-main2"
                      type="submit"
                      style={{ color: "green" }}
                    >
                      Enviar Mensaje <i className="ti-angle-right ml-2"></i>
                    </button>
                  </div>
                </div>
              </form>
            </div>
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
    </>
  );
};
