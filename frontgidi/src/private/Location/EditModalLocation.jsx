import { Box, Modal } from "@mui/material";
import React, { useEffect, useState } from "react";
import LocationService from "../../services/LocationService";
import { notifyError, notifySuccess } from "../../utils/Toats";

export const EditModalLocation = ({
  editModal,
  handleCloseEdit,
  id,
  name,
  funcion,
}) => {
  const [actualizado, setActualizado] = useState("");

  useEffect(() => {
    setActualizado(name);
  }, [name]);

  const saveActualizado = async () => {
    try {
      const actua = await LocationService.update(id, { name: actualizado });
      notifySuccess("Actualizado con exito");
      handleCloseEdit();
      funcion();
    } catch (error) {
      notifyError("Error de actualización");
    }
  };
  return (
    <Modal
      open={editModal}
      onClose={handleCloseEdit}
      aria-labelledby="parent-modal-title"
      aria-describedby="parent-modal-description"
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "40%",
          bgcolor: "background.paper",
          //border: "2px solid #000",
          borderRadius: 2,
          boxShadow: 24,
          pt: 2,
          px: 4,
          pb: 3,
        }}
      >
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
            Editar Registro Ubicación No. {id}
          </h2>
        </div>

        <div className="tab-content p-4 sm:p-5">
          <div className="space-y-5">
            <label className="block">
              <span className="font-medium text-slate-600 dark:text-navy-100">
                Ubicación
              </span>
              <input
                className="form-input mt-1.5 w-full rounded-lg border border-slate-300 bg-transparent px-3 py-2 placeholder:text-slate-400/70 hover:border-slate-400 focus:border-primary dark:border-navy-450 dark:hover:border-navy-400 dark:focus:border-accent"
                placeholder="Residuo"
                type="text"
                value={actualizado}
                onChange={(e) => setActualizado(e.target.value)}
              ></input>
            </label>
          </div>
        </div>
        <div className="flex justify-center space-x-2">
          <button
            onClick={handleCloseEdit}
            className="btn bg-error font-medium text-white hover:bg-error-focus focus:bg-error-focus active:bg-error-focus/90"
          >
            Cancelar
          </button>
          <button
            type="submit"
            //disabled={formik.isSubmitting}
            onClick={saveActualizado}
            className="btn min-w-[7rem] bg-primary font-medium text-white hover:bg-primary-focus focus:bg-primary-focus active:bg-primary-focus/90 dark:bg-accent dark:hover:bg-accent-focus dark:focus:bg-accent-focus dark:active:bg-accent/90"
          >
            Actualizar
          </button>
        </div>
      </Box>
    </Modal>
  );
};
