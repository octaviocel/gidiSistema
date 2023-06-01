import React, { useContext, useEffect, useState } from "react";

import Tooltip from "@mui/material/Tooltip";
import Popover from "@mui/material/Popover";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import SecureLS from "secure-ls";

import { MdLocationOn, MdLibraryBooks } from "react-icons/md";
import { GiTrashCan } from "react-icons/gi";
import { IoIosImages } from "react-icons/io";
import { FaUser } from "react-icons/fa";
const ls = new SecureLS({ encodingType: "aes" });

function SideBar({ children }) {
  const { logout, currentUser } = useContext(AuthContext);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [darkEnable, setDarkEneble] = useState(false);
  const [isSelect, setIsSelect] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    let se = ls.get("_selected");
    setIsSelect(se);
    let them = ls.get("_theme");
    document.querySelector("#reactHtml").className = them;
    setDarkEneble(ls.get("_theme2"));
  }, []);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const changeTheme = () => {
    let element;
    element = document.querySelector("#reactHtml");
    //theme = localStorage.getItem('theme');
    //console.log(element.className)
    if (element.className === "dark") {
      //setTema("dark");
      element.className = "";
      setDarkEneble(false);
      ls.set("_theme", "");
      ls.set("_theme2", false);
    } else {
      //setTema("");
      element.className = "dark";
      setDarkEneble(true);
      ls.set("_theme", "dark");
      ls.set("_theme2", true);
    }
  };

  const changeIcon = (text) => {
    ls.set("_selected", text);
    //setIsSelect(text);
  };

  return (
    <>
      <div className="is-header-blur">
        <div className="min-h-100vh grow bg-slate-50 dark:bg-navy-900">
          <div className="sidebar print:hidden">
            <div className="main-sidebar">
              <div
                className={
                  darkEnable
                    ? "flex h-full w-full flex-col items-center border-r border-slate-150 dark:border-navy-700 dark:bg-navy-800"
                    : "flex h-full w-full flex-col items-center border-r border-slate-150 bg-white dark:border-navy-700 dark:bg-navy-800"
                }
              >
                <div className="flex pt-4">
                  <a href="/">
                    <img
                      className="h-7 w-15 transition-transform duration-500 ease-in-out hover:rotate-[360deg]"
                      src={darkEnable ? "/ulsablanca.png" : "/ulsaoaxaca.png"}
                      alt="logo"
                    />
                  </a>
                </div>

                <div className="is-scrollbar-hidden flex grow flex-col space-y-4 overflow-y-auto pt-6">
                  <Tooltip title="Inicio" placement="right">
                    <a
                      href="/"
                      className={
                        isSelect === "inicio"
                          ? "flex h-11 w-11 items-center justify-center rounded-lg bg-primary/10 text-primary outline-none transition-colors duration-200 hover:bg-primary/20 focus:bg-primary/20 active:bg-primary/25 dark:hover:bg-navy-450 dark:focus:bg-navy-450 dark:active:bg-navy-450/90"
                          : "flex h-11 w-11 items-center justify-center rounded-lg  outline-none transition-colors duration-200 hover:bg-primary/20 focus:bg-primary/20 active:bg-primary/25 dark:hover:bg-navy-450 dark:focus:bg-navy-450 dark:active:bg-navy-450/90"
                      }
                      onClick={() => changeIcon("inicio")}
                    >
                      <svg
                        className="h-7 w-7"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <path
                          fill="currentColor"
                          fillOpacity=".3"
                          d="M5 14.059c0-1.01 0-1.514.222-1.945.221-.43.632-.724 1.453-1.31l4.163-2.974c.56-.4.842-.601 1.162-.601.32 0 .601.2 1.162.601l4.163 2.974c.821.586 1.232.88 1.453 1.31.222.43.222.935.222 1.945V19c0 .943 0 1.414-.293 1.707C18.414 21 17.943 21 17 21H7c-.943 0-1.414 0-1.707-.293C5 20.414 5 19.943 5 19v-4.94Z"
                        />
                        <path
                          fill="currentColor"
                          d="M3 12.387c0 .267 0 .4.084.441.084.041.19-.04.4-.204l7.288-5.669c.59-.459.885-.688 1.228-.688.343 0 .638.23 1.228.688l7.288 5.669c.21.163.316.245.4.204.084-.04.084-.174.084-.441v-.409c0-.48 0-.72-.102-.928-.101-.208-.291-.355-.67-.65l-7-5.445c-.59-.459-.885-.688-1.228-.688-.343 0-.638.23-1.228.688l-7 5.445c-.379.295-.569.442-.67.65-.102.208-.102.448-.102.928v.409Z"
                        />
                        <path
                          fill="currentColor"
                          d="M11.5 15.5h1A1.5 1.5 0 0 1 14 17v3.5h-4V17a1.5 1.5 0 0 1 1.5-1.5Z"
                        />
                        <path
                          fill="currentColor"
                          d="M17.5 5h-1a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5Z"
                        />
                      </svg>
                    </a>
                  </Tooltip>
                  <Tooltip title="Recolecciones" placement="right">
                    <a
                      href="/garbage-collection"
                      className={
                        isSelect === "registro"
                          ? "flex h-11 w-11 items-center justify-center rounded-lg bg-primary/10 text-primary outline-none transition-colors duration-200 hover:bg-primary/20 focus:bg-primary/20 active:bg-primary/25  dark:hover:bg-navy-450 dark:focus:bg-navy-450 dark:active:bg-navy-450/90"
                          : "flex h-11 w-11 items-center justify-center rounded-lg  outline-none transition-colors duration-200 hover:bg-primary/20 focus:bg-primary/20 active:bg-primary/25  dark:hover:bg-navy-450 dark:focus:bg-navy-450 dark:active:bg-navy-450/90"
                      }
                      onClick={() => changeIcon("registro")}
                      x-tooltip="'Registros'"
                    >
                      <svg
                        className="h-7 w-7"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillOpacity="0.25"
                          d="M21.0001 16.05V18.75C21.0001 20.1 20.1001 21 18.7501 21H6.6001C6.9691 21 7.3471 20.946 7.6981 20.829C7.7971 20.793 7.89609 20.757 7.99509 20.712C8.31009 20.586 8.61611 20.406 8.88611 20.172C8.96711 20.109 9.05711 20.028 9.13811 19.947L9.17409 19.911L15.2941 13.8H18.7501C20.1001 13.8 21.0001 14.7 21.0001 16.05Z"
                          fill="currentColor"
                        />
                        <path
                          fillOpacity="0.5"
                          d="M17.7324 11.361L15.2934 13.8L9.17334 19.9111C9.80333 19.2631 10.1993 18.372 10.1993 17.4V8.70601L12.6384 6.26701C13.5924 5.31301 14.8704 5.31301 15.8244 6.26701L17.7324 8.17501C18.6864 9.12901 18.6864 10.407 17.7324 11.361Z"
                          fill="currentColor"
                        />
                        <path
                          d="M7.95 3H5.25C3.9 3 3 3.9 3 5.25V17.4C3 17.643 3.02699 17.886 3.07199 18.12C3.09899 18.237 3.12599 18.354 3.16199 18.471C3.20699 18.606 3.252 18.741 3.306 18.867C3.315 18.876 3.31501 18.885 3.31501 18.885C3.32401 18.885 3.32401 18.885 3.31501 18.894C3.44101 19.146 3.585 19.389 3.756 19.614C3.855 19.731 3.95401 19.839 4.05301 19.947C4.15201 20.055 4.26 20.145 4.377 20.235L4.38601 20.244C4.61101 20.415 4.854 20.559 5.106 20.685C5.115 20.676 5.11501 20.676 5.11501 20.685C5.25001 20.748 5.385 20.793 5.529 20.838C5.646 20.874 5.76301 20.901 5.88001 20.928C6.11401 20.973 6.357 21 6.6 21C6.969 21 7.347 20.946 7.698 20.829C7.797 20.793 7.89599 20.757 7.99499 20.712C8.30999 20.586 8.61601 20.406 8.88601 20.172C8.96701 20.109 9.05701 20.028 9.13801 19.947L9.17399 19.911C9.80399 19.263 10.2 18.372 10.2 17.4V5.25C10.2 3.9 9.3 3 7.95 3ZM6.6 18.75C5.853 18.75 5.25 18.147 5.25 17.4C5.25 16.653 5.853 16.05 6.6 16.05C7.347 16.05 7.95 16.653 7.95 17.4C7.95 18.147 7.347 18.75 6.6 18.75Z"
                          fill="currentColor"
                        />
                      </svg>
                    </a>
                  </Tooltip>
                  {currentUser.rol.id === 1 ? (
                    <Tooltip title="Usuarios" placement="right">
                      <a
                        href="/users"
                        className={
                          isSelect === "users"
                            ? "flex h-11 w-11 items-center justify-center rounded-lg bg-primary/10 text-primary outline-none transition-colors duration-200 hover:bg-primary/20 focus:bg-primary/20 active:bg-primary/25  dark:hover:bg-navy-450 dark:focus:bg-navy-450 dark:active:bg-navy-450/90"
                            : "flex h-11 w-11 items-center justify-center rounded-lg  outline-none transition-colors duration-200 hover:bg-primary/20 focus:bg-primary/20 active:bg-primary/25  dark:hover:bg-navy-450 dark:focus:bg-navy-450 dark:active:bg-navy-450/90"
                        }
                        onClick={() => changeIcon("users")}
                        x-tooltip="'Usuarios'"
                      >
                        {/* <div className="avatar h-11 w-11">
                          <div className="flex h-11 w-11 items-center justify-center rounded-lg outline-none transition-colors duration-200 hover:bg-primary/20 focus:bg-primary/20 active:bg-primary/25 dark:hover:bg-navy-300/20 dark:focus:bg-navy-300/20 dark:active:bg-navy-300/25">
                            <i className="fa fa-user"></i>
                          </div>
                        </div> */}
                        <FaUser className="h-7 w-7" />
                      </a>
                    </Tooltip>
                  ) : (
                    <></>
                  )}
                  <Tooltip title="Blog" placement="right">
                    <a
                      href="/blog"
                      className={
                        isSelect === "blog"
                          ? "flex h-11 w-11 items-center justify-center rounded-lg bg-primary/10 text-primary outline-none transition-colors duration-200 hover:bg-primary/20 focus:bg-primary/20 active:bg-primary/25  dark:hover:bg-navy-450 dark:focus:bg-navy-450 dark:active:bg-navy-450/90"
                          : "flex h-11 w-11 items-center justify-center rounded-lg  outline-none transition-colors duration-200 hover:bg-primary/20 focus:bg-primary/20 active:bg-primary/25 dark:hover:bg-navy-450 dark:focus:bg-navy-450 dark:active:bg-navy-450/90"
                      }
                      onClick={() => changeIcon("blog")}
                    >
                      <MdLibraryBooks className="h-7 w-7" />
                    </a>
                  </Tooltip>
                  <Tooltip title="Galeria" placement="right">
                    <a
                      href="/galeria"
                      className={
                        isSelect === "galeria"
                          ? "flex h-11 w-11 items-center justify-center rounded-lg bg-primary/10 text-primary outline-none transition-colors duration-200 hover:bg-primary/20 focus:bg-primary/20 active:bg-primary/25  dark:hover:bg-navy-450 dark:focus:bg-navy-450 dark:active:bg-navy-450/90"
                          : "flex h-11 w-11 items-center justify-center rounded-lg  outline-none transition-colors duration-200 hover:bg-primary/20 focus:bg-primary/20 active:bg-primary/25 dark:hover:bg-navy-450 dark:focus:bg-navy-450 dark:active:bg-navy-450/90"
                      }
                      onClick={() => changeIcon("galeria")}
                    >
                      <IoIosImages className="h-7 w-7" />
                    </a>
                  </Tooltip>
                  {currentUser.rol.id === 1 ? (
                    <>
                      <Tooltip title="Residuos" placement="right">
                        <a
                          href="/residuos"
                          className={
                            isSelect === "residuos"
                              ? "flex h-11 w-11 items-center justify-center rounded-lg bg-primary/10 text-primary outline-none transition-colors duration-200 hover:bg-primary/20 focus:bg-primary/20 active:bg-primary/25  dark:hover:bg-navy-450 dark:focus:bg-navy-450 dark:active:bg-navy-450/90"
                              : "flex h-11 w-11 items-center justify-center rounded-lg  outline-none transition-colors duration-200 hover:bg-primary/20 focus:bg-primary/20 active:bg-primary/25 dark:hover:bg-navy-450 dark:focus:bg-navy-450 dark:active:bg-navy-450/90"
                          }
                          onClick={() => changeIcon("residuos")}
                        >
                          <GiTrashCan className="h-7 w-7" />
                        </a>
                      </Tooltip>
                      <Tooltip title="Ubicaciones" placement="right">
                        <a
                          href="/ubicacion"
                          className={
                            isSelect === "ubicacion"
                              ? "flex h-11 w-11 items-center justify-center rounded-lg bg-primary/10 text-primary outline-none transition-colors duration-200 hover:bg-primary/20 focus:bg-primary/20 active:bg-primary/25  dark:hover:bg-navy-450 dark:focus:bg-navy-450 dark:active:bg-navy-450/90"
                              : "flex h-11 w-11 items-center justify-center rounded-lg  outline-none transition-colors duration-200 hover:bg-primary/20 focus:bg-primary/20 active:bg-primary/25 dark:hover:bg-navy-450 dark:focus:bg-navy-450 dark:active:bg-navy-450/90"
                          }
                          onClick={() => changeIcon("ubicacion")}
                        >
                          <MdLocationOn className="h-7 w-7" />
                        </a>
                      </Tooltip>
                    </>
                  ) : (
                    <></>
                  )}
                </div>
                <div className="flex flex-col items-center space-y-3 py-3">
                  <div
                    x-data="usePopper({placement:'right-end',offset:12})"
                    className="flex"
                  >
                    <button
                      x-ref="popperRef"
                      className="avatar h-12 w-12"
                      aria-describedby={id}
                      onClick={handleClick}
                    >
                      <img
                        className="rounded-full"
                        src="/useer.png"
                        alt="avatar"
                      />
                      <span className="absolute right-0 h-3.5 w-3.5 rounded-full border-2 border-white bg-success dark:border-navy-700"></span>
                    </button>
                    <Popover
                      id={id}
                      open={open}
                      anchorEl={anchorEl}
                      onClose={handleClose}
                      anchorOrigin={{
                        vertical: "center",
                        horizontal: "right",
                      }}
                    >
                      <div className="card grow items-center p-4 sm:p-5">
                        <div className="avatar h-20 w-20">
                          <img
                            className="rounded-full"
                            src="/programador.png"
                            alt="avatar"
                          />
                          <div className="absolute right-0 m-1 h-4 w-4 rounded-full border-2 border-white bg-primary dark:border-navy-700 dark:bg-accent"></div>
                        </div>
                        <h3 className="pt-3 text-lg font-medium text-slate-700 dark:text-navy-100">
                          {currentUser?.firstName} {currentUser?.lastName}
                        </h3>
                        <p className="text-xs+">{currentUser?.rol?.rolName}</p>
                        <div className="my-4 h-px w-full bg-slate-200 dark:bg-navy-500"></div>
                        <div className="grow space-y-4">
                          {/* <div className="flex items-center space-x-4">
                            <div className="flex h-7 w-7 items-center rounded-lg bg-primary/10 p-2 text-primary dark:bg-accent-light/10 dark:text-accent-light">
                              <i className="fa fa-phone text-xs"></i>
                            </div>
                            <p>(01) 22 888 4444</p>
                          </div> */}
                          <div className="flex items-center space-x-4">
                            <div className="flex h-7 w-7 items-center rounded-lg bg-primary/10 p-2 text-primary dark:bg-accent-light/10 dark:text-accent-light">
                              <i className="fa fa-envelope text-xs"></i>
                            </div>
                            <p>{currentUser?.email}</p>
                          </div>
                          {/* <div className="flex items-center space-x-4">
                            <div className="flex h-7 w-7 items-center rounded-lg bg-primary/10 p-2 text-primary dark:bg-accent-light/10 dark:text-accent-light">
                              <i className="fa fa-link text-xs"></i>
                            </div>
                            <p>www.konnor.com</p>
                          </div> */}
                        </div>
                        <button
                          onClick={() => {
                            logout();
                            navigate("/");
                          }}
                          className="btn mt-5 space-x-2 rounded-full bg-primary font-medium text-white hover:bg-primary-focus focus:bg-primary-focus active:bg-primary-focus/90 dark:bg-accent dark:hover:bg-accent-focus dark:focus:bg-accent-focus dark:active:bg-accent/90"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4.5 w-4.5"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                              clip-rule="evenodd"
                            />
                          </svg>
                          <span> Logout </span>
                        </button>
                      </div>
                    </Popover>
                  </div>
                </div>
              </div>

              <div className="sidebar-panel"></div>
            </div>

            <nav className="header print:hidden">
              <div className="header-container relative flex w-full bg-white dark:bg-navy-750 print:hidden">
                <div className="flex w-full items-center justify-between">
                  <div className="h-7 w-7"></div>

                  <div className="-mr-1.5 flex items-center space-x-2">
                    {darkEnable ? (
                      <button
                        onClick={changeTheme}
                        className="btn h-8 w-8 rounded-full p-0 hover:bg-slate-300/20 focus:bg-slate-300/20 active:bg-slate-300/25 dark:hover:bg-navy-300/20 dark:focus:bg-navy-300/20 dark:active:bg-navy-300/25"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          //x-show="!$store.global.isDarkModeEnabled"
                          className="h-6 w-6 text-amber-400"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                            clipRule="evenodd"
                          ></path>
                        </svg>
                      </button>
                    ) : (
                      <button
                        onClick={changeTheme}
                        className="btn h-8 w-8 rounded-full p-0 hover:bg-slate-300/20 focus:bg-slate-300/20 active:bg-slate-300/25 dark:hover:bg-navy-300/20 dark:focus:bg-navy-300/20 dark:active:bg-navy-300/25"
                      >
                        <svg
                          //x-show="$store.global.isDarkModeEnabled"
                          className="h-6 w-6 text-amber-400"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M11.75 3.412a.818.818 0 01-.07.917 6.332 6.332 0 00-1.4 3.971c0 3.564 2.98 6.494 6.706 6.494a6.86 6.86 0 002.856-.617.818.818 0 011.1 1.047C19.593 18.614 16.218 21 12.283 21 7.18 21 3 16.973 3 11.956c0-4.563 3.46-8.31 7.925-8.948a.818.818 0 01.826.404z"></path>
                        </svg>
                      </button>
                    )}

                    <button
                      // @click="$store.global.isRightSidebarExpanded = true"
                      className="btn h-8 w-8 rounded-full p-0 hover:bg-slate-300/20 focus:bg-slate-300/20 active:bg-slate-300/25 dark:hover:bg-navy-300/20 dark:focus:bg-navy-300/20 dark:active:bg-navy-300/25"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5.5 w-5.5 text-slate-500 dark:text-navy-100"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="1.5"
                          d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </nav>

            {children}
          </div>
          <div id="x-teleport-target"></div>
        </div>
      </div>
    </>
  );
}

export default SideBar;
