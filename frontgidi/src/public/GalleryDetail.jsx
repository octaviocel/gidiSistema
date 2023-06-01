import React, { useEffect, useRef, useState } from "react";

import LightGallery from "lightgallery/react";
import lgZoom from "lightgallery/plugins/zoom";
import lgVideo from "lightgallery/plugins/video";
import { Header } from "./Header";
import Preloader from "./Preloader";
import Galleryervice from "../services/GalleryService";
import { useLocation } from "react-router-dom";

export const GalleryDetail = () => {
  const location = useLocation();
  const galleryRef = useRef(null);

  useEffect(() => {
    if (galleryRef.current) {
      galleryRef.current.init();
    }
  }, []);

  const { dato } = location.state;

  const opciones = {
    weekday: "long",
    year: "numeric",
    month: "short",
    day: "numeric",
  };
  return (
    <div>
      <Header />
      <section className="team section-padding secondary-bg">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-6">
              <div className="section-heading">
                {/* <h4 className="subheading">Galeria</h4> */}
                <span className="subtitle">Detalles Galeria</span>
                <h2>{dato?.title}</h2>
              </div>
            </div>
          </div>

          <LightGallery
            ref={galleryRef}
            mode="lg-fade"
            speed={500}
            thumbnail={true}
            thumbWidth="200"
            thumbHeight="200"
            plugins={[lgZoom, lgVideo]}
          >
            {dato?.photos?.map((photo, i) => {
              const fecha = new Date(dato?.createdAt).toLocaleDateString(
                "es-MX",
                opciones
              );
              return (
                <a
                  key={i}
                  style={{ margin: 5, maxWidth: '49%', float: "left" }}
                  //data-lg-size="1406-1390"
                  //className="service-item style-2"
                  data-src={photo}
                  data-sub-html={`<h4>Foto -${fecha}</h4>`}
                >
                  <img
                    //style={{ margin: 5, maxWidth: "380px" }}
                    //className="img-responsive"
                    src={photo}
                  />
                </a>
              );
            })}
          </LightGallery>
        </div>
      </section>
      
    </div>
  );
};
