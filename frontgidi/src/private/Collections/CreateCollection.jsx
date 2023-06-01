import React, { useEffect, useState } from "react";
import SideBar from "../SideBar";
import { Container } from "@mui/material";
import { useNavigate } from "react-router-dom";
import LocationService from "../../services/LocationService";
import GarbageService from "../../services/GarbageService";
import Preloader from "../../public/Preloader";
import { notifyError, notifySuccess } from "../../utils/Toats";
import RecoleccionService from "../../services/RecoleccionesService";

export const CreateCollection = () => {
  const [load, setLoad] = useState(false);
  const navigate = useNavigate();

  const [ubicaciones, setUbicaciones] = useState([]);
  const [residuos, setResiduos] = useState([]);
  const [checkedValues, setCheckedValues] = useState([]);
  const [checkedValues2, setCheckedValues2] = useState([]);
  const [dias, setDia] = useState(1);

  const [selectAllUbicaciones, setSelectAllUbicacion] = useState(false);

  const [selectAllResiduos, setSelectAllResiduos] = useState(false);

  useEffect(() => {
    getFields();
  }, []);

  const getFields = async () => {
    try {
      setLoad(true);
      const ubica = await LocationService.getAll();
      const resi = await GarbageService.getAll();

      // console.log(rols)
      setResiduos(resi);
      setUbicaciones(ubica);
    } catch (error) {
      //console.log(error)
      //notifyError(error);
    } finally {
      setLoad(false);
    }
  };

  const handleCheckboxChange = (event) => {
    const value = event.target.value;
    const isChecked = event.target.checked;

    if (isChecked) {
      setCheckedValues([...checkedValues, value]);
    } else {
      setCheckedValues(checkedValues.filter((v) => v !== value));
    }
  };

  const handleCheckboxChange2 = (event) => {
    const value = event.target.value;
    const isChecked = event.target.checked;

    if (isChecked) {
      setCheckedValues2([...checkedValues2, value]);
    } else {
      setCheckedValues2(checkedValues2.filter((v) => v !== value));
    }
  };

  const handleSelectAllChange = () => {
    if (!selectAllUbicaciones) {
      const allValues = ubicaciones.map((u) => `ubicacion-${u.id}`);
      setCheckedValues(allValues);
    } else {
      setCheckedValues([]);
    }
    setSelectAllUbicacion(!selectAllUbicaciones);
  };

  const handleSelectAllChangeResiduos = () => {
    if (!selectAllResiduos) {
      const allValues = residuos.map((u) => `residuo-${u.id}`);
      setCheckedValues2(allValues);
    } else {
      setCheckedValues2([]);
    }
    setSelectAllResiduos(!selectAllResiduos);
  };

  const handleSubmit = async () => {
    // event.preventDefault();
    const ubicaciones = checkedValues.map((item) => Number(item.substring(10)));
    const residuos = checkedValues2.map((item) => Number(item.substring(8)));

    // console.log(ubicaciones)
    // console.log(residuos)
    if (ubicaciones.length === 0) {
      notifyError("Debes seleccionar almenos una ubicacion");
    } else if (residuos.length === 0) {
      notifyError("Debes seleccionar almenos un resido a evaluar");
    } else {
      try {
        setLoad(true);
        const success = await RecoleccionService.create({
          dias,
          ubicaciones,
          residuos,
        });
        //console.log(success)
        if (success) {
          notifySuccess("Recoleccion creado correctamente");
          navigate("/garbage-collection");
        }
      } catch (error) {
        notifyError(error.error);
      } finally {
        setLoad(false);
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
                  Nueva Recolecci&oacute;n
                </h2>
              </div>
              <div className="flex justify-center space-x-2">
                <button
                  type="button"
                  onClick={() => navigate(-1)}
                  className="btn min-w-[7rem] border border-slate-300 font-medium text-slate-700 hover:bg-slate-150 focus:bg-slate-150 active:bg-slate-150/80 dark:border-navy-450 dark:text-navy-100 dark:hover:bg-navy-500 dark:focus:bg-navy-500 dark:active:bg-navy-500/90"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  //disabled={formik.isSubmitting}
                  onClick={handleSubmit}
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
                    <h1 className="font-medium tracking-wide text-slate-700 line-clamp-1 dark:text-navy-100 lg:text-base">
                      D&iacute;as de Recolecci&oacute;n
                    </h1>
                    <select
                      style={{ width: "50%" }}
                      value={dias}
                      onChange={(e) => setDia(e.target.value)}
                      className="form-select mt-1.5  rounded-lg border border-slate-300 bg-white px-3 py-2 hover:border-slate-400 focus:border-primary dark:border-navy-450 dark:bg-navy-700 dark:hover:border-navy-400 dark:focus:border-accent"
                    >
                      {Array(10)
                        .fill(0)
                        .map((val, i) => {
                          return (
                            <option value={i + 1} key={i}>
                              {i + 1}
                            </option>
                          );
                        })}
                    </select>
                  </label>
                  <div className="card px-4 pb-4 sm:px-5">
                    <div class="my-3 flex h-8 items-center justify-between">
                      <h2 class="font-medium tracking-wide text-slate-700 line-clamp-1 dark:text-navy-100 lg:text-base">
                        Ubicaciones para la recolecci&oacute;n
                      </h2>
                      <label className="inline-flex items-center space-x-2">
                        <input
                          className="form-checkbox is-basic h-5 w-5 rounded border-slate-400/70 checked:bg-info checked:!border-info hover:!border-info focus:!border-info dark:border-navy-400"
                          type="checkbox"
                          checked={selectAllUbicaciones}
                          onChange={handleSelectAllChange}
                        />
                        <p>Seleccionar todo</p>
                      </label>
                    </div>
                    <div className="max-w-2xl">
                      <div className="grid grid-cols-2 place-items-start gap-6 sm:grid-cols-3">
                        {ubicaciones?.map((ubi, i) => {
                          return (
                            <label
                              className="inline-flex items-center space-x-2"
                              key={i}
                            >
                              <input
                                className="form-checkbox is-basic h-5 w-5 rounded border-slate-400/70 checked:bg-info checked:!border-info hover:!border-info focus:!border-info dark:border-navy-400"
                                type="checkbox"
                                //value={ubi?.id.toString()}
                                // name={ubi.id}
                                value={`ubicacion-${ubi.id}`}
                                checked={checkedValues.includes(
                                  `ubicacion-${ubi.id}`
                                )}
                                onChange={handleCheckboxChange}
                              />
                              <p>{ubi.name}</p>
                            </label>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                  <div className="card px-4 pb-4 sm:px-5">
                    <div class="my-3 flex h-8 items-center justify-between">
                      <h2 class="font-medium tracking-wide text-slate-700 line-clamp-1 dark:text-navy-100 lg:text-base">
                        Residuos para la recolecci&oacute;n
                      </h2>
                      <label className="inline-flex items-center space-x-2">
                        <input
                          className="form-checkbox is-basic h-5 w-5 rounded border-slate-400/70 checked:bg-info checked:!border-info hover:!border-info focus:!border-info dark:border-navy-400"
                          type="checkbox"
                          checked={selectAllResiduos}
                          onChange={handleSelectAllChangeResiduos}
                        />
                        <p>Seleccionar todo</p>
                      </label>
                    </div>
                    <div className="max-w-2xl">
                      <div className="grid grid-cols-2 place-items-start gap-6 sm:grid-cols-3">
                        {residuos?.map((res, i) => {
                          return (
                            <label
                              class="inline-flex items-center space-x-2"
                              key={i}
                            >
                              <input
                                class="form-checkbox is-basic h-5 w-5 rounded border-slate-400/70 checked:bg-info checked:!border-info hover:!border-info focus:!border-info dark:border-navy-400"
                                type="checkbox"
                                //value={res.id}
                                value={`residuo-${res.id}`}
                                checked={checkedValues2.includes(
                                  `residuo-${res.id}`
                                )}
                                onChange={handleCheckboxChange2}
                              />
                              <p>{res.name}</p>
                            </label>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </main>
      )}
    </SideBar>
  );
};
