import React from "react";
import { useNavigate } from "react-router-dom";


function ErrorPage() {
    const navigate = useNavigate();
  return (
    <div
      id="root"
      className="min-h-100vh flex grow bg-slate-50 dark:bg-navy-900"
      
    >
      <main className="grid w-full grow grid-cols-1 place-items-center">
        <div className="max-w-md p-6 text-center">
          <div className="w-full">
            <img
              className="w-full"
              src="/images/illustrations/ufo.svg"
              alt="image"
            />
          </div>
          <p className="pt-4 text-7xl font-bold text-primary dark:text-accent">
            404
          </p>
          <p className="pt-4 text-xl font-semibold text-slate-800 dark:text-navy-50">
            Página no encontrada
          </p>
          <p className="pt-2 text-slate-500 dark:text-navy-200">
            Perdida de control por favor ponte en contacto con tu servidor
          </p>

          <button 
          onClick={()=> navigate('/')}
          className="btn mt-8 h-11 bg-primary text-base font-medium text-white hover:bg-primary-focus hover:shadow-lg hover:shadow-primary/50 focus:bg-primary-focus focus:shadow-lg focus:shadow-primary/50 active:bg-primary-focus/90 dark:bg-accent dark:hover:bg-accent-focus dark:hover:shadow-accent/50 dark:focus:bg-accent-focus dark:focus:shadow-accent/50 dark:active:bg-accent/90">
            Regresar a Inicio
          </button>
        </div>
      </main>
    </div>
  );
}

export default ErrorPage;
