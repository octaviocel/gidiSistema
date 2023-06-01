import React, { useRef, useState } from "react";
import SideBar from "../SideBar";
import { Box, Button, CircularProgress, Container, Fade } from "@mui/material";
import DropComponent from "../../utils/DropComponent";
import { useNavigate } from "react-router-dom";
import { notifyError, notifyInfo, notifySuccess } from "../../utils/Toats";
import ImagesService from "../../services/ImagesService";

import Preloader from "../../public/Preloader";
import Galleryervice from "../../services/GalleryService";

import SecureLS from "secure-ls";
const ls = new SecureLS({ encodingType: "aes" });


export const CreateGallery = () => {
  const [imagenes, setImagenes] = useState([]);
  const [editor, setEditor] = useState();
  const [etiquetas, setEtiquetas] = useState("");
  const reactQuillRef = useRef(null);
  const [datos, setDatos] = useState("");

  const [load, setLoad] = useState(false);
  const navigate = useNavigate();

  const save = async () => {
    if (!datos) {
      notifyError("Debe tener un titulo");
    } else if (imagenes.length === 0) {
      notifyInfo("Debe contener al menos una imagen");
    } else {
      try {
        setLoad(true);
        const current = await JSON.parse(ls.get("currentUser"));
        let images = [];
        //console.log("1");
        for (const ima of imagenes) {
          const result = await ImagesService.create(ima);
          images.push(result.data);
          //console.log(result);
        }
        //console.log("2");
        //console.log(etiquetas)
        const da = {
          user_id: current.id,
          title: datos,
          photos: images,
        };
        //console.log(da)
        //console.log("2");
        await Galleryervice.create(da);
        //console.log("3");
        notifySuccess("Galeria creado correctamente");
        navigate("/galeria");
        setLoad(false);
      } catch (error) {
        notifyError(error);
      }
    }
  };

  return (
    <SideBar>
      {load ? (
        <Preloader />
      ) : (
        <main className="main-content w-full px-[var(--margin-x)] pb-8">
          <Container sx={{ marginTop: 5 }}>
            <div className="flex flex-col items-center justify-between space-y-4 py-5 sm:flex-row sm:space-y-0 lg:py-6">
              <div className="flex items-center space-x-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  ></path>
                </svg>
                <h2 className="text-xl font-medium text-slate-700 line-clamp-1 dark:text-navy-50">
                  Nueva Galeria
                </h2>
              </div>
              <div className="flex justify-center space-x-2">
                <button 
                onClick={()=> navigate(-1)}
                className="btn min-w-[7rem] border border-slate-300 font-medium text-slate-700 hover:bg-slate-150 focus:bg-slate-150 active:bg-slate-150/80 dark:border-navy-450 dark:text-navy-100 dark:hover:bg-navy-500 dark:focus:bg-navy-500 dark:active:bg-navy-500/90">
                  Cancelar
                </button>
                <button
                  onClick={save}
                  className="btn min-w-[7rem] bg-primary font-medium text-white hover:bg-primary-focus focus:bg-primary-focus active:bg-primary-focus/90 dark:bg-accent dark:hover:bg-accent-focus dark:focus:bg-accent-focus dark:active:bg-accent/90"
                >
                  Guardar
                </button>
              </div>
            </div>
            <div className="tabs flex flex-col">
              <div className="is-scrollbar-hidden overflow-x-auto">
                <div className="border-b-2 border-slate-150 dark:border-navy-500">
                  <div className="tabs-list -mb-0.5 flex">
                    <button className="btn h-14 shrink-0 space-x-2 rounded-none border-b-2 border-primary px-4 font-medium text-primary dark:border-accent dark:text-accent-light sm:px-5">
                      <i className="fa-solid fa-layer-group text-base"></i>
                      <span>Informaci&oacute;n</span>
                    </button>
                  </div>
                </div>
              </div>
              <div className="tab-content p-4 sm:p-5">
                <div className="space-y-5">
                  <label className="block">
                    <span className="font-medium text-slate-600 dark:text-navy-100">
                      Titulo
                    </span>
                    <input
                      className="form-input mt-1.5 w-full rounded-lg border border-slate-300 bg-transparent px-3 py-2 placeholder:text-slate-400/70 hover:border-slate-400 focus:border-primary dark:border-navy-450 dark:hover:border-navy-400 dark:focus:border-accent"
                      placeholder="Ingresa el titulo del Blog"
                      type="text"
                      onChange={(e) => {
                        setDatos(e.target.value);
                      }}
                    />
                  </label>
                </div>
                <div className="space-y-5" style={{ marginTop: 15 }}>
                  <span class="font-medium text-slate-600 dark:text-navy-100">
                    Imagenes por Orden
                  </span>
                </div>
                <DropComponent subirImagen={(data) => setImagenes(data)} />
              </div>
            </div>
          </Container>
        </main>
      )}
    </SideBar>
  );
};
