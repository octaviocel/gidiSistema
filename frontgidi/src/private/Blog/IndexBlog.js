import React, { useEffect, useMemo, useState } from "react";
import SideBar from "../SideBar";
import { useTable, usePagination, useGlobalFilter } from "react-table";
import { Container } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { notifyError, notifySuccess } from "../../utils/Toats";
import BlogService from "../../services/BlogService";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export const IndexBlog = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);

  useEffect(() => {
    traerBlogs();
  }, []);

  const traerBlogs = async () => {
    try {
      const datos = await BlogService.getAllBlogs();
      //console.log(datos)
      setData(datos);
    } catch (error) {
      console.log(error);
      notifyError("Error al cargar datos");
    }
  };

  const columns = useMemo(
    () => [
      {
        Header: "ID",
        accessor: "id",
      },
      {
        Header: "Titulo",
        accessor: "title",
      },
      {
        Header: "Subtitulo",
        accessor: "subtitle",
      },
      {
        Header: "Resumen",
        accessor: "resume",
      },
      {
        Header: "Principal",
        accessor: "principal",
      },
      {
        Header: "Palabras Clave",
        accessor: "keywords",
      },
    ],
    []
  );
  return (
    <SideBar>
      <Container sx={{ marginTop: 5 }}>
        <div className="flex items-center justify-between space-x-2 px-[var(--margin-x)] py-5 transition-all duration-[.25s]">
          <div className="flex items-center space-x-1">
            <h2 className="text-xl font-medium text-slate-800 dark:text-navy-50 lg:text-2xl">
              Blog
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
              onClick={() => navigate("create")}
              className="btn w-full bg-slate-150 font-medium text-slate-800 hover:bg-slate-200 focus:bg-slate-200 active:bg-slate-200/80 dark:bg-navy-500 dark:text-navy-50 dark:hover:bg-navy-450 dark:focus:bg-navy-450 dark:active:bg-navy-450/90"
            >
              Crear Blog
            </button>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:gap-5 lg:gap-6">
          <Table columns={columns} data={data} />
        </div>
      </Container>
    </SideBar>
  );
};

function Table({ columns, data }) {
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

  const changePrincipal = async (id, deci) => {
    try {
      //console.log(id)
      const success = await BlogService.updatePrincipal(id, {
        principal: !deci,
      });
      if (success.blog) {
        notifySuccess("Actualizado con exito");
        window.location.reload();
      }
      //console.log(success)
    } catch (error) {
      //console.log(error)
      notifyError(error.error);
    }
  };

  // Renderizado de la tabla
  return (
    <>
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
              >
                {row.cells.map((cell) => {
                  //console.log(cell);
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
                        {cell.column.Header === "Palabras Clave" ? (
                          <>
                            {cell.value.map((val) => {
                              return (
                                <span className="tag rounded-full border border-primary/30 bg-primary/10 text-primary hover:bg-primary/20 focus:bg-primary/20 active:bg-primary/25 dark:border-accent-light/30 dark:bg-accent-light/10 dark:text-accent-light dark:hover:bg-accent-light/20 dark:focus:bg-accent-light/20 dark:active:bg-accent-light/25">
                                  {val}
                                </span>
                              );
                            })}
                          </>
                        ) : (
                          <></>
                        )}
                        {cell.column.Header === "Principal" ? (
                          <>
                            <label class="inline-flex items-center space-x-2">
                              <input
                                class="form-switch h-5 w-10 rounded-full bg-slate-300 before:rounded-full before:bg-slate-50 checked:!bg-info checked:before:bg-white dark:bg-navy-900 dark:before:bg-navy-300 dark:checked:before:bg-white"
                                type="checkbox"
                                checked={row.original.principal}
                                //disabled={false}
                                value={row.original.principal}
                                onChange={() => {
                                  //console.log(row.original.principal)
                                  //no se muestra al incio con el principal
                                  changePrincipal(
                                    row.original.id,
                                    row.original.principal
                                  );
                                }}
                              />
                            </label>
                          </>
                        ) : (
                          <></>
                        )}
                        {cell.column.Header !== "Principal" &&
                        cell.column.Header !== "Palabras Clave" ? (
                          <>{cell.render("Cell")}</>
                        ) : (
                          <></>
                        )}
                      </td>
                    </>
                  );
                })}
                <td className="gridjs-td">
                  <span>
                    <div class="flex justify-center space-x-2">
                      <button class="btn h-8 w-8 text-info hover:bg-info/20 focus:bg-info/20 active:bg-info/25">
                        <i class="fa fa-edit"></i>
                      </button>
                      <button
                        onClick={() => {
                          Swal.fire({
                            title: "Estas seguro de eliminar este Blog?",
                            text: "No podrás revertir esto!",
                            icon: "warning",
                            showCancelButton: true,
                            confirmButtonColor: "#3085d6",
                            cancelButtonColor: "#d33",
                            confirmButtonText: "Si, confirmo!",
                          }).then(async (result) => {
                            if (result.isConfirmed) {
                              try {
                                await BlogService.deleteBlog(row.original.id);
                                notifySuccess("Se ha eliminado con exito");
                                window.location.reload();
                              } catch (error) {
                                notifyError("Error al eliminar");
                              }
                            }
                          });
                        }}
                        class="btn h-8 w-8 text-error hover:bg-error/20 focus:bg-error/20 active:bg-error/25"
                      >
                        <i class="fa fa-trash-alt"></i>
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
