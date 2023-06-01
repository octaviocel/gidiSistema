import React, { useState } from "react";

import Tooltip from "@mui/material/Tooltip";
import Popover from "@mui/material/Popover";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import { useNavigate } from "react-router-dom";
import SideBar from "./SideBar";

function Dashboard() {
  const navigate = useNavigate();

  return (
    <>
      <SideBar>
        <main
          className="main-content place-items-center px-[var(--margin-x)] pb-12"
          style={{ alignSelf: "center" }}
        >
          <div className="py-5 text-center lg:py-6">
            <p className="text-sm uppercase">Bienvenido de vuelta</p>
            <h3 className="mt-1 text-xl font-semibold text-slate-600 dark:text-navy-100">
              ¿Qu&eacute; quieres hacer hoy?
            </h3>
          </div>
          <div className="grid max-w-4xl grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-5 lg:gap-6">
            <div className="card">
              <div className="flex justify-center p-5">
                <img
                  className="w-9/12"
                  src="images/illustrations/responsive.svg"
                  alt="image"
                />
              </div>
              <div className="px-4 pb-8 text-center sm:px-5">
                <h4 className="text-lg font-semibold text-slate-700 dark:text-navy-100">
                  Ver mis registros
                </h4>
                <p className="pt-3">
                  Observar mis registros, mi historial de craciones y revisar
                  las gráficas
                </p>
                <button
                  onClick={() => navigate("/garbage-collection")}
                  className="btn mt-8 bg-primary font-medium text-white shadow-lg shadow-primary/50 hover:bg-primary-focus focus:bg-primary-focus active:bg-primary-focus/90 dark:bg-accent dark:shadow-accent/50 dark:hover:bg-accent-focus dark:focus:bg-accent-focus dark:active:bg-accent/90"
                >
                  Ir a las recolecciones
                </button>
              </div>
            </div>
            <div className="card">
              <div className="flex justify-center p-5">
                <img
                  className="w-9/12"
                  src="images/illustrations/creativedesign.svg"
                  alt="image"
                />
              </div>
              <div className="px-4 pb-8 text-center sm:px-5">
                <h4 className="text-lg font-semibold text-slate-700 dark:text-navy-100">
                  Crear un nuevo registro
                </h4>
                <p className="pt-3">
                  Crear el registro de una nueva recoleccione
                  <br />
                  Cuántos días son?
                </p>
                <button
                  onClick={() => navigate("/garbage-collection/create")}
                  className="btn mt-8 bg-primary font-medium text-white shadow-lg shadow-primary/50 hover:bg-primary-focus focus:bg-primary-focus active:bg-primary-focus/90 dark:bg-accent dark:shadow-accent/50 dark:hover:bg-accent-focus dark:focus:bg-accent-focus dark:active:bg-accent/90"
                >
                  Comenzar con la recoleci&oacute;n
                </button>
              </div>
            </div>
            <div className="card">
              <div className="flex justify-center p-5">
                <img
                  className="w-9/12"
                  src="images/illustrations/performance.svg"
                  alt="image"
                />
              </div>
              <div className="px-4 pb-8 text-center sm:px-5">
                <h4 className="text-lg font-semibold text-slate-700 dark:text-navy-100">
                  Publica un Blog
                </h4>
                <p className="pt-3">
                  Publica un Blob para que la comunidad pueda verlo
                </p>
                <button
                  onClick={() => navigate("/blog/create")}
                  className="btn mt-8 bg-primary font-medium text-white shadow-lg shadow-primary/50 hover:bg-primary-focus focus:bg-primary-focus active:bg-primary-focus/90 dark:bg-accent dark:shadow-accent/50 dark:hover:bg-accent-focus dark:focus:bg-accent-focus dark:active:bg-accent/90"
                >
                  Ir a crear
                </button>
              </div>
            </div>
          </div>
        </main>
      </SideBar>
    </>
  );
}

export default Dashboard;
