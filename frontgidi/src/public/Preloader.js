import React from "react";

export default function Preloader () {
  return (
    <div>
      <div className="app-preloader fixed z-50 grid h-full w-full place-content-center bg-slate-50 dark:bg-navy-900">
        <div className="app-preloader-inner relative inline-block h-48 w-48"></div>
      </div>
    </div>
  );
}
