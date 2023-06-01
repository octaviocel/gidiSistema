import React, { useEffect, useMemo, useState } from "react";
import SideBar from "../SideBar";
import { useTable, usePagination, useGlobalFilter } from "react-table";
import { Box, Container, Modal } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { notifyError, notifySuccess } from "../../utils/Toats";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Preloader from "../../public/Preloader";
import LocationService from "../../services/LocationService";
import { EditModalLocation } from "./EditModalLocation";

export const IndexLocation = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [load, setLoad] = useState(false);
  const [coun, setCoun] = useState(0);

  const [name, setName] = useState({});

  const [modal, setModal] = useState(false);

  useEffect(() => {
    traerUbicaciones();
  }, []);

  const traerUbicaciones = async () => {
    try {
      setLoad(true);
      const datos = await LocationService.getAll();
      //console.log(datos)
      setData(datos);
    } catch (error) {
      console.log(error);
      notifyError("Error al cargar datos");
    } finally {
      setLoad(false);
    }
  };

  const saveUbicacion = async () => {
    try {
      setLoad(true);
      const res = await LocationService.create(name);
      //console.log(res)
      if (res) {
        traerUbicaciones();
        notifySuccess("Creado con exito");
        handleClose();
        setName({});
      }
    } catch (error) {
      notifyError("Error al crear");
    } finally {
      setLoad(false);
    }
  };

  const handleOpen = () => {
    setModal(true);
  };
  const handleClose = () => {
    setModal(false);
  };

  const columns = useMemo(
    () => [
      {
        Header: "Registro No.",
        accessor: "id",
      },
      {
        Header: "Ubicación",
        accessor: "name",
      },
    ],
    []
  );
  return (
    <SideBar>
      {load ? (
        <Preloader />
      ) : (
        <>
          <Modal
            open={modal}
            onClose={handleClose}
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
                  Nuevo Ubicación
                </h2>
              </div>

              <div className="tab-content p-4 sm:p-5">
                <div className="space-y-5">
                  <label className="block">
                    <span className="font-medium text-slate-600 dark:text-navy-100">
                      Nombre del ubicación
                    </span>
                    <input
                      className="form-input mt-1.5 w-full rounded-lg border border-slate-300 bg-transparent px-3 py-2 placeholder:text-slate-400/70 hover:border-slate-400 focus:border-primary dark:border-navy-450 dark:hover:border-navy-400 dark:focus:border-accent"
                      placeholder="Ubicacion"
                      type="text"
                      onChange={(e) =>
                        setName({ ...name, name: e.target.value })
                      }
                    />
                  </label>
                </div>
              </div>
              <div className="flex justify-center space-x-2">
                <button
                  type="submit"
                  //disabled={formik.isSubmitting}
                  onClick={saveUbicacion}
                  className="btn min-w-[7rem] bg-primary font-medium text-white hover:bg-primary-focus focus:bg-primary-focus active:bg-primary-focus/90 dark:bg-accent dark:hover:bg-accent-focus dark:focus:bg-accent-focus dark:active:bg-accent/90"
                >
                  Guardar
                </button>
              </div>
            </Box>
          </Modal>
          <Container sx={{ marginTop: 5 }}>
            <div className="flex items-center justify-between space-x-2 px-[var(--margin-x)] py-5 transition-all duration-[.25s]">
              <div className="flex items-center space-x-1">
                <h2 className="text-xl font-medium text-slate-800 dark:text-navy-50 lg:text-2xl">
                  Ubicaciones
                </h2>
                <button className="btn hidden h-8 w-8 rounded-full p-0 font-medium text-error hover:bg-error/20 focus:bg-error/20 active:bg-error/25 sm:inline-flex">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4.5 w-4.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    ></path>
                  </svg>
                </button>
              </div>
              <div className="board-draggable relative flex max-h-full w-72 shrink-0 flex-col">
                <button
                  onClick={handleOpen}
                  className="btn w-full bg-slate-150 font-medium text-slate-800 hover:bg-slate-200 focus:bg-slate-200 active:bg-slate-200/80 dark:bg-navy-500 dark:text-navy-50 dark:hover:bg-navy-450 dark:focus:bg-navy-450 dark:active:bg-navy-450/90"
                >
                  Crear Ubicación
                </button>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:gap-5 lg:gap-6">
              <Table columns={columns} data={data} funcion={traerUbicaciones} />
            </div>
          </Container>
        </>
      )}
    </SideBar>
  );
};

function Table({ columns, data, funcion }) {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    nextPage,
    previousPage,
    canPreviousPage,
    canNextPage,
    pageOptions,
    prepareRow,
    state,
    setGlobalFilter,

    pageCount,
    gotoPage,
    setPageSize,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data,
    },
    useGlobalFilter,
    usePagination
  );

  const { globalFilter } = state;

  const [editModal, setEditModal] = useState(false);

  const [idEdit, setIdEdit] = useState(0);
  const [name, setName] = useState("");

  const handleOpenEdit = (e, id, nombre) => {
    //e.prevent
    setIdEdit(id);
    setName(nombre);
    setEditModal(true);
  };
  const handleCloseEdit = () => {
    setEditModal(false);
  };

  // Renderizado de la tabla
  return (
    <>
      <EditModalLocation
        editModal={editModal}
        handleCloseEdit={handleCloseEdit}
        id={idEdit}
        name={name}
        funcion={funcion}
      />
      <div className="flex items-center justify-between">
        <h2 className="text-base font-medium tracking-wide text-slate-700 line-clamp-1 dark:text-navy-100"></h2>
        <div className="flex">
          <div className="flex items-center" x-data="{isInputActive:false}">
            <label className="block">
              <input
                className="form-input bg-transparent px-1 text-right transition-all duration-100 placeholder:text-slate-500 dark:placeholder:text-navy-200 w-32 lg:w-48"
                value={globalFilter || ""}
                onChange={(e) => setGlobalFilter(e.target.value)}
                placeholder="Buscar..."
              />
            </label>
            <SearchIcon />
          </div>
        </div>
      </div>
      <table {...getTableProps()} className="is-hoverable w-full text-left">
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th
                  {...column.getHeaderProps()}
                  className="whitespace-nowrap bg-slate-200 px-4 py-3 font-semibold uppercase text-slate-800 dark:bg-navy-800 dark:text-navy-100 lg:px-5"
                >
                  {column.render("Header")}{" "}
                </th>
              ))}
              <th className="whitespace-nowrap bg-slate-200 px-4 py-3 font-semibold uppercase text-slate-800 dark:bg-navy-800 dark:text-navy-100 lg:px-5"></th>
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row, i) => {
            prepareRow(row);
            //console.log(row)
            return (
              <tr
                className="border-y border-transparent border-b-slate-200 dark:border-b-navy-500"
                {...row.getRowProps()}
                // style={{
                //   lineHeight: "1.2em",
                //   maxHeight: "3.6em",
                //   //maxWidth:"",
                //   overflow: "hidden",
                //   textOverflow: "ellipsis",
                //   display: "-webkit-box",
                //   WebkitLineClamp: "3",
                //   WebkitBoxOrient: "vertical",
                // }}
                key={i}
              >
                {row.cells.map((cell) => {
                  //console.log(cell.row.original.firstName);
                  return (
                    <>
                      <td
                        className="whitespace-nowrap px-3 py-3 font-medium text-slate-700 dark:text-navy-100 lg:px-5"
                        style={{
                          whiteSpace: "normal",
                        }}
                        {...cell.getCellProps()}
                        key={cell.row.id}
                      >
                        <>{cell.render("Cell")}</>
                      </td>
                    </>
                  );
                })}
                <td className="gridjs-td">
                  <span>
                    <div className="flex justify-center space-x-2">
                      <button
                        onClick={(e) =>
                          handleOpenEdit(e, row.original.id, row.original.name)
                        }
                        className="btn h-8 w-8 text-info hover:bg-info/20 focus:bg-info/20 active:bg-info/25"
                      >
                        <i className="fa fa-edit"></i>
                      </button>
                      <button
                        onClick={() => {
                          Swal.fire({
                            title: "Estas seguro de eliminar esta Ubicacion?",
                            text: "No podrás revertir esto!",
                            icon: "warning",
                            showCancelButton: true,
                            confirmButtonColor: "#3085d6",
                            cancelButtonColor: "#d33",
                            confirmButtonText: "Si, confirmo!",
                          }).then(async (result) => {
                            if (result.isConfirmed) {
                              try {
                                await LocationService.deleteLocation(
                                  row.original.id
                                );
                                notifySuccess("Se ha eliminado con exito");
                                window.location.reload();
                                // traerResiduos()
                              } catch (error) {
                                notifyError("Error al eliminar");
                              }
                            }
                          });
                        }}
                        className="btn h-8 w-8 text-error hover:bg-error/20 focus:bg-error/20 active:bg-error/25"
                      >
                        <i className="fa fa-trash-alt"></i>
                      </button>
                    </div>
                  </span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      {/* 
        Pagination can be built however you'd like. 
        This is just a very basic UI implementation:
      */}
      <div className="flex flex-col justify-between space-y-4 px-4 py-4 sm:flex-row sm:items-center sm:space-y-0 sm:px-5">
        <ol className="pagination">
          <li className="rounded-l-lg bg-slate-150 dark:bg-navy-500">
            <button
              className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-500 transition-colors hover:bg-slate-300 focus:bg-slate-300 active:bg-slate-300/80 dark:text-navy-200 dark:hover:bg-navy-450 dark:focus:bg-navy-450 dark:active:bg-navy-450/90"
              onClick={() => gotoPage(0)}
              disabled={!canPreviousPage}
            >
              {"<<"}
            </button>
          </li>
          <li className="bg-slate-150 dark:bg-navy-500">
            <button
              className="flex h-8 min-w-[2rem] items-center justify-center rounded-lg px-3 leading-tight transition-colors hover:bg-slate-300 focus:bg-slate-300 active:bg-slate-300/80 dark:hover:bg-navy-450 dark:focus:bg-navy-450 dark:active:bg-navy-450/90"
              onClick={() => previousPage()}
              disabled={!canPreviousPage}
            >
              {"<"}
            </button>
          </li>

          <span className="bg-slate-150 dark:bg-navy-500">
            <strong className="flex h-8 min-w-[2rem] items-center justify-center rounded-lg bg-primary px-3 leading-tight text-white transition-colors hover:bg-primary-focus focus:bg-primary-focus active:bg-primary-focus/90 dark:bg-accent dark:hover:bg-accent-focus dark:focus:bg-accent-focus dark:active:bg-accent/90">
              {pageIndex + 1}
            </strong>
          </span>
          <li className="bg-slate-150 dark:bg-navy-500">
            <button
              className="flex h-8 min-w-[2rem] items-center justify-center rounded-lg px-3 leading-tight transition-colors hover:bg-slate-300 focus:bg-slate-300 active:bg-slate-300/80 dark:hover:bg-navy-450 dark:focus:bg-navy-450 dark:active:bg-navy-450/90"
              onClick={() => nextPage()}
              disabled={!canNextPage}
            >
              {">"}
            </button>
          </li>
          <li className="rounded-r-lg bg-slate-150 dark:bg-navy-500">
            <button
              className="flex h-8 min-w-[2rem] items-center justify-center rounded-lg px-3 leading-tight transition-colors hover:bg-slate-300 focus:bg-slate-300 active:bg-slate-300/80 dark:hover:bg-navy-450 dark:focus:bg-navy-450 dark:active:bg-navy-450/90"
              onClick={() => gotoPage(pageCount - 1)}
              disabled={!canNextPage}
            >
              {">>"}
            </button>
          </li>
        </ol>
        <div className="flex items-center space-x-2 text-xs+">
          <span>
            P&aacute;gina{" "}
            <strong>
              {pageIndex + 1} of{" "}
              {pageOptions.length === 0 ? 1 : pageOptions.length}
            </strong>{" "}
          </span>
          <span>Mostrar</span>

          <select
            //className="form-select rounded-full border border-slate-300 bg-white px-2 py-1 pr-6 hover:border-slate-400 focus:border-primary dark:border-navy-450 dark:bg-navy-700 dark:hover:border-navy-400 dark:focus:border-accent"
            value={pageSize}
            onChange={(e) => {
              setPageSize(Number(e.target.value));
            }}
          >
            {[10, 20, 30, 40, 50].map((pageSize) => (
              <option key={pageSize} value={pageSize}>
                {pageSize}
              </option>
            ))}
          </select>
        </div>
      </div>
    </>
  );
}
