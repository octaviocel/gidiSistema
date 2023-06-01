import React, { useEffect, useRef, useState } from "react";
import SideBar from "../SideBar";
import { Box, Button, CircularProgress, Container, Fade } from "@mui/material";

import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { ErrorMessage, Formik } from "formik";
import { notifyError, notifyInfo, notifySuccess } from "../../utils/Toats";
import ImagesService from "../../services/ImagesService";
import SecureLS from "secure-ls";
import BlogService from "../../services/BlogService";
import Preloader from "../../public/Preloader";
import RolService from "../../services/RolService";
import UserService from "../../services/UserService";

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Ingrese un correo electrónico válido")
    .required("Ingrese su correo electrónico"),
  password: Yup.string()
    .min(2, "La contraseña debe tener al menos 2 caracteres")
    .required("Ingrese su contraseña"),
  firstName: Yup.string().required("El nombre es requerido"),
  lastName: Yup.string().required("El nombre es requerido"),
});

export const CreateUser = () => {
  const [datos, setDatos] = useState({
    firstName: "",
    lastName: "",
    motherLastName: "",
    email: "",
    password: "",
    rol_id: 2,
  });

  const [load, setLoad] = useState(false);
  const [roles, setRoles] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    getRols();
  }, []);

  const getRols = async () => {
    try {
      setLoad(true);
      const rols = await RolService.getRoles();
      // console.log(rols)
      setRoles(rols);
    } catch (error) {
      //console.log(error)
      //notifyError(error);
    } finally {
      setLoad(false);
    }
  };

  const save = async () => {};

  return (
    <SideBar>
      {load ? (
        <Preloader />
      ) : (
        <main className="main-content w-full px-[var(--margin-x)] pb-8">
          <Container sx={{ marginTop: 5 }}>
            <Formik
              initialValues={{
                firstName: "",
                lastName: "",
                motherLastName: "",
                email: "",
                password: "",
                rol_id: 2,
              }}
              validationSchema={validationSchema}
              onSubmit={async (values) => {
                try {
                  setLoad(true);
                  const success = await UserService.create(values);
                  // console.log(success)
                  if (success.userSaved) {
                    notifySuccess("Usuario creado correctamente");
                    navigate("/users");
                  }
                } catch (error) {
                  notifyError(error.error);
                } finally {
                  setLoad(false);
                }
              }}
            >
              {(formik) => (
                <form onSubmit={formik.handleSubmit}>
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
                        Nuevo Usuario
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
                        disabled={formik.isSubmitting}
                        // onClick={formik.handleSubmit}
                        className="btn min-w-[7rem] bg-primary font-medium text-white hover:bg-primary-focus focus:bg-primary-focus active:bg-primary-focus/90 dark:bg-accent dark:hover:bg-accent-focus dark:focus:bg-accent-focus dark:active:bg-accent/90"
                      >
                        Save
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
                            Nombre
                          </span>
                          <input
                            className="form-input mt-1.5 w-full rounded-lg border border-slate-300 bg-transparent px-3 py-2 placeholder:text-slate-400/70 hover:border-slate-400 focus:border-primary dark:border-navy-450 dark:hover:border-navy-400 dark:focus:border-accent"
                            placeholder="Nombre (s)"
                            type="text"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.firstName}
                            name="firstName"
                          />
                        </label>
                        <div style={{ color: "red" }}>
                          <ErrorMessage name="firstName" />
                        </div>
                        <label className="block">
                          <span className="font-medium text-slate-600 dark:text-navy-100">
                            Apellido Paterno
                          </span>
                          <input
                            className="form-input mt-1.5 w-full rounded-lg border border-slate-300 bg-transparent px-3 py-2 placeholder:text-slate-400/70 hover:border-slate-400 focus:border-primary dark:border-navy-450 dark:hover:border-navy-400 dark:focus:border-accent"
                            placeholder="Apellido Paterno"
                            type="text"
                            name="lastName"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.lastName}
                          />
                        </label>
                        <div style={{ color: "red" }}>
                          <ErrorMessage name="lastName" />
                        </div>
                        <label className="block">
                          <span className="font-medium text-slate-600 dark:text-navy-100">
                            Apellido Materno
                          </span>
                          <input
                            className="form-input mt-1.5 w-full rounded-lg border border-slate-300 bg-transparent px-3 py-2 placeholder:text-slate-400/70 hover:border-slate-400 focus:border-primary dark:border-navy-450 dark:hover:border-navy-400 dark:focus:border-accent"
                            placeholder="Apellido Materno"
                            type="text"
                            name="motherLastName"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.motherLastName}
                          />
                        </label>
                        <div style={{ color: "red" }}>
                          <ErrorMessage name="motherLastName" />
                        </div>
                        <label className="block">
                          <span className="font-medium text-slate-600 dark:text-navy-100">
                            Email
                          </span>
                          <input
                            className="form-input mt-1.5 w-full rounded-lg border border-slate-300 bg-transparent px-3 py-2 placeholder:text-slate-400/70 hover:border-slate-400 focus:border-primary dark:border-navy-450 dark:hover:border-navy-400 dark:focus:border-accent"
                            placeholder="Correo"
                            type="text"
                            name="email"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.email}
                          />
                        </label>
                        <div style={{ color: "red" }}>
                          <ErrorMessage name="email" />
                        </div>
                        <label className="block">
                          <span className="font-medium text-slate-600 dark:text-navy-100">
                            Password
                          </span>
                          <input
                            className="form-input mt-1.5 w-full rounded-lg border border-slate-300 bg-transparent px-3 py-2 placeholder:text-slate-400/70 hover:border-slate-400 focus:border-primary dark:border-navy-450 dark:hover:border-navy-400 dark:focus:border-accent"
                            placeholder="Contrasena"
                            type="password"
                            name="password"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.password}
                          />
                        </label>
                        <div style={{ color: "red" }}>
                          <ErrorMessage name="password" />
                        </div>
                        <label className="block">
                          <span>Rol de Usuario</span>
                          <select
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.rol_id}
                            name="rol_id"
                            className="form-select mt-1.5 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 hover:border-slate-400 focus:border-primary dark:border-navy-450 dark:bg-navy-700 dark:hover:border-navy-400 dark:focus:border-accent"
                          >
                            {roles.map((rol, i) => {
                              return (
                                <option value={rol.id} key={i}>
                                  {rol.rolName}
                                </option>
                              );
                            })}
                          </select>
                        </label>
                        <div style={{ color: "red" }}>
                          <ErrorMessage name="rol_id" />
                        </div>
                      </div>
                    </div>
                  </div>
                </form>
              )}
            </Formik>
          </Container>
        </main>
      )}
    </SideBar>
  );
};
