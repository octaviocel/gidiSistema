import { Box, Modal } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { notifyError, notifySuccess } from "../../utils/Toats";
import RecoleccionEspecificaService from "../../services/RecoleccionEspecificaService";
import PeriodoService from "../../services/PeriodoService";

export const CreateDetailDay = ({
  modal,
  handleClose,
  residuos,
  dia,
  ubicacion,
  recoleccion,
}) => {
  const { currentUser } = useContext(AuthContext);

  const [datos, setDatos] = useState([]);
  const [total, setTotal] = useState();
  const [load, setLoad] = useState(false);

  const saveRegistro = async () => {
    if (!total.total || !total.cuartil || !total.volumen) {
      notifyError("Campos vacios en los registros principales");
    } else if (Object.keys(datos).length !== Object.entries(residuos).length) {
      notifyError("Faltan registros de los residuos");
    } else {
      try {
        setLoad(true);
        const cabecera = {
          ubicacion_id: ubicacion,
          recoleccion_id: recoleccion,
          user_id: currentUser?.id,
          dia: dia,
          peso_total: total.total,
          peso_cuartil: total.cuartil,
          volumen: total.volumen,
        };

        const registro = await RecoleccionEspecificaService.create(cabecera);

        Object.entries(datos).forEach(async ([clave, valor]) => {
          //console.log(`Clave: ${clave}, Valor: ${valor}`);
          const per = {
            collection_id: registro?.recoleccion.id,
            waste_id: clave,
            quantity: valor,
          };
          const periodo = await PeriodoService.create(per);
        });
        notifySuccess("Se creo con exito");
        handleClose();
      } catch (error) {
        console.log(error);
        notifyError("Error de registro");
      } finally {
        setLoad(false);
      }
    }
  };
  return (
    <Modal
      key={dia}
      open={modal}
      onClose={handleClose}
      aria-labelledby="parent-modal-title"
      aria-describedby="parent-modal-description"
    >
      {load ? (
        <div className="spinner h-16 w-16 animate-spin rounded-full border-4 border-primary border-r-transparent dark:border-accent dark:border-r-transparent"></div>
      ) : (
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "80%",
            bgcolor: "background.paper",
            //border: "2px solid #000",
            borderRadius: 2,
            boxShadow: 24,
            pt: 2,
            px: 4,
            pb: 3,
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              marginBottom: 10,
            }}
          >
            <button
              onClick={handleClose}
              style={{
                marginLeft: "10px",
              }}
              className="btn border border-error font-medium text-error hover:bg-error hover:text-white focus:bg-error focus:text-white active:bg-error/90"
            >
              Cancelar
            </button>
            <button
              onClick={saveRegistro}
              style={{
                marginLeft: "10px",
              }}
              type="submit"
              className="btn border border-success font-medium text-success hover:bg-success hover:text-white focus:bg-success focus:text-white active:bg-success/90"
            >
              Guardar Registro
            </button>
          </div>
          <p
            style={{ fontSize: 22 }}
            className="text-lg mt-3 pb-3 font-bold uppercase text-info dark:text-accent-light"
          >
            Registro del día: {dia}
          </p>
          <div className="card px-4 pb-4 sm:px-5">
            <div className="flex h-8 items-center justify-between mt-3">
              <h2 className="text-lg font-bold tracking-wide text-slate-700 line-clamp-1 dark:text-navy-100">
                Generales
              </h2>
            </div>
            <div className="flex grow justify-between space-x-2 pt-3">
              <div>
                <p className="text-lg font-bold text-slate-700 dark:text-navy-300">
                  Peso total
                </p>
                <label className="mt-1 flex -space-x-px">
                  <input
                    className="form-input w-full border border-slate-300 bg-transparent px-3 py-2 placeholder:text-slate-400/70 hover:z-10 hover:border-slate-400 focus:z-10 focus:border-primary dark:border-navy-450 dark:hover:border-navy-400 dark:focus:border-accent"
                    placeholder="Peso total"
                    type="number"
                    step="0.001"
                    required
                    onChange={(e) =>
                      setTotal({
                        ...total,
                        total: Number(e.target.value).toFixed(3),
                      })
                    }
                  />
                  <div className="flex items-center justify-center rounded-r-lg border border-slate-300 bg-slate-150 px-3.5 font-inter text-slate-800 dark:border-navy-450 dark:bg-navy-500 dark:text-navy-100">
                    <span>Kg.</span>
                  </div>
                </label>
              </div>
              <div>
                <p className="text-lg font-bold text-slate-700 dark:text-navy-300">
                  Peso Cuartil
                </p>
                <label className="mt-1 flex -space-x-px">
                  <input
                    className="form-input w-full border border-slate-300 bg-transparent px-3 py-2 placeholder:text-slate-400/70 hover:z-10 hover:border-slate-400 focus:z-10 focus:border-primary dark:border-navy-450 dark:hover:border-navy-400 dark:focus:border-accent"
                    placeholder="Peso cuartil"
                    type="number"
                    step="0.001"
                    onChange={(e) =>
                      setTotal({
                        ...total,
                        cuartil: Number(e.target.value).toFixed(3),
                      })
                    }
                  />
                  <div className="flex items-center justify-center rounded-r-lg border border-slate-300 bg-slate-150 px-3.5 font-inter text-slate-800 dark:border-navy-450 dark:bg-navy-500 dark:text-navy-100">
                    <span>Kg.</span>
                  </div>
                </label>
              </div>
              <div>
                <p className="text-lg font-bold text-slate-700 dark:text-navy-300">
                  Volumen
                </p>
                <input
                  className="form-input mt-1.5 w-full rounded-lg border border-slate-300 bg-transparent px-3 py-2 placeholder:text-slate-400/70 hover:border-slate-400 focus:border-primary dark:border-navy-450 dark:hover:border-navy-400 dark:focus:border-accent"
                  placeholder="Volumen"
                  type="text"
                  onChange={(e) =>
                    setTotal({ ...total, volumen: e.target.value })
                  }
                />
              </div>
            </div>
          </div>
          <div className="card px-4 pb-4 mt-3 sm:px-5">
            <div className="flex h-8 items-center justify-between mt-3">
              <h2 className="text-lg font-bold tracking-wide text-slate-700 line-clamp-1 dark:text-navy-100">
                Registro de Residuos
              </h2>
            </div>

            <table
              className="w-full"
              style={{ width: "50%", alignSelf: "center" }}
            >
              <tbody>
                {Object.entries(residuos).map(([value, label]) => {
                  return (
                    <tr key={value}>
                      <td className="whitespace-nowrap pt-4">
                        <div className="flex items-center space-x-3">
                          <h2
                            className="font-medium text-slate-700 line-clamp-1 dark:text-navy-100 uppercase"
                            style={{ fontSize: 17 }}
                          >
                            {label}
                          </h2>
                        </div>
                      </td>
                      <td className="whitespace-nowrap pt-4">
                        <label className="mt-1 flex -space-x-px">
                          <input
                            className="form-input w-full border border-slate-300 bg-transparent px-3 py-2 placeholder:text-slate-400/70 hover:z-10 hover:border-slate-400 focus:z-10 focus:border-primary dark:border-navy-450 dark:hover:border-navy-400 dark:focus:border-accent"
                            placeholder="peso"
                            type="number"
                            step="0.001"
                            //pattern="^\d+(\.\d{1,3})?$"
                            pattern="/^\d+,?\d{0,3}$/"
                            name={`residuo${value}`}
                            //value={value}
                            required
                            onChange={(e) =>
                              setDatos({
                                ...datos,
                                [value]: Number(e.target.value).toFixed(3),
                              })
                            }
                          />
                          <div className="flex items-center justify-center rounded-r-lg border border-slate-300 bg-slate-150 px-3.5 font-inter text-slate-800 dark:border-navy-450 dark:bg-navy-500 dark:text-navy-100">
                            <span>Kg.</span>
                          </div>
                        </label>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </Box>
      )}
    </Modal>
  );
};
