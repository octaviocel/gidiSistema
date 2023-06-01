import React, { useEffect, useState } from "react";
import SideBar from "../SideBar";
import { Container } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";

import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import RecoleccionEspecificaService from "../../services/RecoleccionEspecificaService";
import { notifyError } from "../../utils/Toats";
import PeriodoService from "../../services/PeriodoService";
import { CreateDetailDay } from "./CreateDetailDay";

export const DetailCollection = () => {
  const location = useLocation();
  const recoleccionId = location.pathname.split("/").pop();
  const { total, creado, residuos, ubicaciones, dias, id, estatus } =
    location.state;

  const navigate = useNavigate();

  const [expanded, setExpanded] = useState(false);
  const [load, setLoad] = useState(false);

  const [first, setFirst] = useState(true);

  const [modal, setModal] = useState(false);

  const [seleccion, setSeleccion] = useState(Object.values(ubicaciones)[0]);
  const [cambioEscuela, setCambioEscuela] = useState(
    Object.keys(ubicaciones)[0] ? Object.keys(ubicaciones)[0] : 1
  );

  const [anterior, setAnterior] = useState();

  const [datos, setDatos] = useState([]);
  const [datosResiduos, setDatosResiduos] = useState([]);
  const [principal, setPrincipal] = useState([]);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const [diaResgistro, setDiaRegistro] = useState(0);

  useEffect(() => {
    //console.log(estatus);
    if (cambioEscuela !== anterior) {
      getRecoleccionxEscuela();
      setAnterior(cambioEscuela);
    } else {
      //console.log(expanded);
      //console.log(residuos);
      getEspecifico();
    }
  }, [cambioEscuela, expanded]);

  const getPrincipalEstadistica = async () => {
    try {
      setLoad(true);
      const pri = await RecoleccionEspecificaService.getPrincipalEstadistica(
        Number(recoleccionId)
      );

      // console.log(pri)
      setPrincipal(pri);
    } catch (error) {
      console.log(error);
      notifyError("Error al cargar datos");
    } finally {
      setLoad(false);
    }
  };

  const getRecoleccionxEscuela = async () => {
    try {
      setLoad(true);
      const datos = await RecoleccionEspecificaService.getRecoleccion({
        recoleccion: Number(recoleccionId),
        ubicacion: Number(cambioEscuela),
      });
      //console.log(datos);
      if (first) {
        getPrincipalEstadistica();
        setFirst(false);
      }
      setDatos(datos);
    } catch (error) {
      console.log(error);
      notifyError("Error al cargar datos");
    } finally {
      setLoad(false);
    }
  };

  const getEspecifico = async () => {
    try {
      setLoad(true);

      const res = await PeriodoService.getPeriodoxId(
        Number(expanded.substring(5))
      );

      setDatosResiduos(res);
    } catch (error) {
      console.log(error);
    } finally {
      setLoad(false);
    }
  };

  const setEscuela = (escuela, value) => {
    //console.log(value);
    setSeleccion(escuela);
    setCambioEscuela(value);
  };

  const opciones = {
    weekday: "long",
    year: "numeric",
    month: "short",
    day: "numeric",
  };

  const handleOpen = (event, dia) => {
    setDiaRegistro(dia);
    setModal(true);
  };
  const handleClose = () => {
    setModal(false);
    getRecoleccionxEscuela();
  };

  return (
    <SideBar>
      <Container sx={{ marginTop: 10 }}>
        <div
          className="flex flex-col rounded-xl bg-info/10 dark:bg-navy-800 lg:flex-row"
          style={{ height: "250px" }}
        >
          <div className="flex flex-col px-4 sm:px-5 lg:w-48 lg:shrink-0 lg:py-3">
            <h3 className="text-base font-medium tracking-wide text-slate-700 line-clamp-1 dark:text-navy-100 lg:text-lg">
              Recolecci&oacute;n
            </h3>
            <p className="mt-3 grow">
              {estatus ? (
                <>Concluyó con {total} kg. </>
              ) : (
                <>La recolección lleva un total de {total} kg.</>
              )}
            </p>

            <div className="mt-3 flex items-center space-x-2">
              <p className="text-base font-medium text-slate-700 dark:text-navy-100">
                Inicio: {new Date(creado).toLocaleDateString("es-MX", opciones)}
              </p>
            </div>
          </div>

          <div className="scrollbar-sm mt-5 flex space-x-4 overflow-x-auto px-4 sm:px-5 lg:mt-0 lg:pl-0">
            {principal.map((da, i) => {
              return (
                <div
                  className="flex w-36 shrink-0 flex-col items-center"
                  key={i}
                >
                  <img
                    className="z-10 h-10 w-10"
                    src="/ambiental.png"
                    alt="flag"
                  />

                  <div
                    className="card -mt-5 w-full rounded-2xl px-3 py-5 text-center"
                    style={{ maxHeight: "175px" }}
                  >
                    <p className="mt-3 text-base font-medium text-slate-700 dark:text-navy-100">
                      {da.ubicacion_name}
                    </p>
                    <a
                      //href="#"
                      className="mt-1 font-inter text-xs+ tracking-wide text-slate-400 hover:text-primary focus:text-primary dark:hover:text-accent-light dark:focus:text-accent-light"
                    >
                      {estatus ? (
                        <>La recoleccion concluyó con </>
                      ) : (
                        <>La recoleccion lleva al momento </>
                      )}
                    </a>
                    <div className="mt-2 flex justify-center space-x-1 font-inter">
                      <p className="mt-1 font-medium text-slate-700 dark:text-navy-100">
                        {da.total_peso} Kg.
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        {estatus ? (
          <>
            <div
              style={{
                width: "100%",
                flex: 1,
                display: "flex",
                justifyContent: "center",
                alignContent: "center",
                // alignItems: "center",
              }}
            >
              <button
                onClick={() =>
                  navigate(`/garbage-collection/${id}/graficas`, {
                    state: { id: id },
                  })
                }
                style={{ width: "80%" }}
                className="btn mt-6 h-10 bg-primary w-full font-medium text-white hover:bg-primary-focus focus:bg-primary-focus active:bg-primary-focus/90 dark:bg-accent dark:hover:bg-accent-focus dark:focus:bg-accent-focus dark:active:bg-accent/90"
              >
                Generar Gráficas
              </button>
            </div>
          </>
        ) : (
          <></>
        )}
        <div
          className="is-scrollbar-hidden overflow-x-auto rounded-lg bg-slate-200 text-slate-600 dark:bg-navy-800 dark:text-navy-200"
          style={{ marginTop: "1%" }}
        >
          <div className="tabs-list flex p-1">
            {Object.entries(ubicaciones).map(([value, label]) => {
              return (
                <button
                  key={value}
                  onClick={() => setEscuela(label, value)}
                  className={
                    seleccion === label
                      ? "btn shrink-0 px-3 py-1 text-xs+ font-medium bg-white shadow dark:bg-navy-500 dark:text-navy-100"
                      : "btn shrink-0 px-3 py-1 text-xs+ font-medium hover:text-slate-800 focus:text-slate-800 dark:hover:text-navy-100 dark:focus:text-navy-100"
                  }
                >
                  <h1> {label}</h1>
                </button>
              );
            })}
          </div>
        </div>
        <div style={{ marginTop: 15 }}>
          {Array(dias)
            .fill(0)
            .map((val, i) => {
              //console.log(datos[i]);
              if (datos[i]?.dia === i + 1) {
                return (
                  <Accordion
                    expanded={expanded === `panel${datos[i]?.id}`}
                    onChange={handleChange(`panel${datos[i]?.id}`)}
                    key={i}
                  >
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls={`panel${datos[i]?.id}bh-content`}
                      id={`panel${datos[i]?.id}bh-header`}
                    >
                      <Typography
                        sx={{
                          width: "30%",
                          flexShrink: 0,
                          fontWeight: 700,
                          color: "black",
                          fontSize: 22,
                        }}
                      >
                        Día {i + 1}
                      </Typography>
                      <a className="tag rounded-full border border-success/30 bg-success/10 text-success hover:bg-success/20 focus:bg-success/20 active:bg-success/25">
                        Día Registrado
                      </a>
                    </AccordionSummary>
                    <AccordionDetails>
                      <div className="card px-4 pb-4 sm:px-5">
                        <p className="text-lg mt-3 font-semibold uppercase text-primary dark:text-accent-light">
                          Registro No: {datos[i]?.id}
                        </p>
                        <div className="flex grow justify-between space-x-2 pt-3">
                          <div>
                            <p className="text-xs+ text-slate-400 dark:text-navy-300">
                              Peso total
                            </p>
                            <p className="text-lg font-semibold text-slate-700 dark:text-navy-100">
                              {datos[i]?.peso_total} Kg.
                            </p>
                          </div>
                          <div>
                            <p className="text-xs+ text-slate-400 dark:text-navy-300">
                              Peso Cuartil
                            </p>
                            <p className="text-lg font-semibold text-slate-700 dark:text-navy-100">
                              {datos[i]?.peso_cuartil} Kg.
                            </p>
                          </div>
                          <div>
                            <p className="text-xs+ text-slate-400 dark:text-navy-300">
                              Volumen
                            </p>
                            <p className="text-lg font-semibold text-slate-700 dark:text-navy-100">
                              {datos[i]?.volumen}
                            </p>
                          </div>
                          <div>
                            <p className="text-xs+ text-slate-400 dark:text-navy-300">
                              Registrado por
                            </p>
                            <p className="text-lg font-semibold text-slate-700 dark:text-navy-100">
                              {datos[i]?.user?.firstName}
                            </p>
                          </div>
                        </div>
                        <p className="text-xs+ pt-3">
                          Dia de Registro{" "}
                          {new Date(datos[i]?.createdAt).toLocaleDateString(
                            "es-MX",
                            opciones
                          )}
                        </p>
                      </div>
                      {load ? (
                        <div className="spinner h-16 w-16 animate-spin rounded-full border-4 border-primary border-r-transparent dark:border-accent dark:border-r-transparent"></div>
                      ) : (
                        <div className="card px-4 pb-4 mt-3 sm:px-5">
                          <div className="flex h-8 items-center justify-between mt-3">
                            <h2 className="text-lg font-medium tracking-wide text-slate-700 line-clamp-1 dark:text-navy-100">
                              Registros de Residuos
                            </h2>
                          </div>

                          <table
                            className="w-full"
                            style={{ width: "70%", alignSelf: "center" }}
                          >
                            <tbody>
                              {datosResiduos.map((dato, i) => {
                                return (
                                  <tr key={i}>
                                    <td className="whitespace-nowrap pt-4">
                                      <div className="flex items-center space-x-3">
                                        <div className="avatar h-9 w-9">
                                          <img
                                            className="rounded-full"
                                            src="/reciclaje.png"
                                            alt="avatar"
                                          />
                                        </div>
                                        <h3 className="font-medium text-slate-700 line-clamp-1 dark:text-navy-100">
                                          {dato?.waste.name}
                                        </h3>
                                      </div>
                                    </td>
                                    <td className="whitespace-nowrap px-2 pt-4"></td>
                                    <td className="whitespace-nowrap pt-4">
                                      <p className="text-right font-medium text-slate-700 dark:text-navy-100">
                                        {dato?.quantity} Kg.
                                      </p>
                                    </td>
                                  </tr>
                                );
                              })}
                            </tbody>
                          </table>
                        </div>
                      )}
                    </AccordionDetails>
                  </Accordion>
                );
              } else {
                return (
                  <Accordion
                    expanded={expanded === `panel${i}`}
                    onChange={handleChange(`panel${i}`)}
                    key={i}
                  >
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls={`panel${i}bh-content`}
                      id={`panel${i}bh-header`}
                    >
                      <Typography
                        sx={{
                          width: "30%",
                          flexShrink: 0,
                          fontWeight: 700,
                          color: "black",
                          fontSize: 22,
                        }}
                      >
                        Día {i + 1}
                      </Typography>

                      <a className="tag rounded-full border border-warning/30 bg-warning/10 text-warning hover:bg-warning/20 focus:bg-warning/20 active:bg-warning/25">
                        Sin Registro
                      </a>
                    </AccordionSummary>
                    <AccordionDetails
                      sx={{ display: "flex", justifyContent: "center" }}
                    >
                      {modal ? (
                        <></>
                      ) : (
                        <button
                          onClick={(e) => handleOpen(e, i + 1)}
                          style={{ width: "80%" }}
                          className="btn mt-6 h-10 w-full bg-primary font-medium text-white hover:bg-primary-focus focus:bg-primary-focus active:bg-primary-focus/90 dark:bg-accent dark:hover:bg-accent-focus dark:focus:bg-accent-focus dark:active:bg-accent/90"
                        >
                          Crear Registro
                        </button>
                      )}
                    </AccordionDetails>
                  </Accordion>
                );
              }
            })}
        </div>
        <CreateDetailDay
          //key={i + 1}
          modal={modal}
          handleClose={handleClose}
          residuos={residuos}
          dia={diaResgistro}
          ubicacion={cambioEscuela}
          recoleccion={recoleccionId}
        />
      </Container>
    </SideBar>
  );
};
