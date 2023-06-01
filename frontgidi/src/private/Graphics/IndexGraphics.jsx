import React, { useEffect, useState, useRef } from "react";
import SideBar from "../SideBar";
import { Container } from "@mui/material";
import Chart from "chart.js/auto";
import { Bar, Line } from "react-chartjs-2";
import { useLocation } from "react-router-dom";
import GraficaService from "../../services/GraficaService";

import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";

import { saveAs } from "file-saver";

export const IndexGraphics = () => {
  const location = useLocation();
  const recoleccionId = location.pathname.split("/").pop();
  const { id } = location.state;

  const chartRef = useRef(null);

  const [datos, setDatos] = useState([]);
  const [barra, setBarra] = useState([]);

  useEffect(() => {
    getGraph();
  }, []);

  const getGraph = async () => {
    try {
      const res = await GraficaService.getGrafica(id);
      //console.log(res);
      const res2 = await GraficaService.getSumaGrafica(id);
      //console.log(res2);
      setDatos(res);
      setBarra(res2);
    } catch (e) {
      console.log(e);
    }
  };

  const exportToPDF = async () => {
    try {
      const doc = new jsPDF();

      // Obtener el contenedor de gráficos
      const chartContainer = chartRef.current;

      // Obtener una lista de todos los gráficos presentes en el contenedor
      const charts = chartContainer.querySelectorAll("canvas");

      let yOffset = 10; // Posición inicial vertical

      // Recorrer cada gráfico y exportarlo como imagen al documento PDF
      charts.forEach((chart, index) => {
        // Convertir el gráfico en una imagen utilizando html2canvas
        html2canvas(chart).then((canvas) => {
          const imageData = canvas.toDataURL("image/png");

          // Agregar el título del gráfico al documento PDF
          const title = `Gráfico ${index + 1}`;
          doc.setFontSize(16);
          doc.setFont("helvetica", "bold");
          doc.text(title, 10, yOffset + 8); // Ajusta las coordenadas según tus necesidades

          // Agregar la imagen al documento PDF
          doc.addImage(imageData, "PNG", 10, yOffset, 180, 100); // Ajusta las coordenadas y dimensiones según tus necesidades

          // Actualizar la posición vertical para el próximo gráfico
          yOffset += 110; // Ajusta el valor según el espaciado deseado entre los gráficos

          // Guardar el documento PDF después de procesar todos los gráficos
          if (yOffset > doc.internal.pageSize.getHeight() - 100) {
            doc.addPage();
            yOffset = 10;
          }

          if (chart === charts[charts.length - 1]) {
            doc.save("chart.pdf");
          }
        });
      });
    } catch (error) {
      console.error("Error al exportar el gráfico como PDF:", error);
    }
  };

  const exportToCSV = async () => {
    try {
      const res = await GraficaService.getCSV(id);
      const dia = await GraficaService.getCSVXdia(id);

      const blob = new Blob([res], { type: "text/csv" });
      saveAs(blob, "datos_general.csv");

      const blob2 = new Blob([dia], { type: "text/csv" });
      saveAs(blob2, "Residuos_dia.csv");
    } catch (error) {
      console.error("Error al exportar el gráfico como CSV:", error);
    }
  };
  return (
    <SideBar>
      <Container sx={{ marginTop: 10 }}>
        <div className="flex items-center justify-between space-x-2 px-[var(--margin-x)] py-5 transition-all duration-[.25s]">
          <div className="flex items-center space-x-1">
            <h2 className="text-xl font-medium text-slate-800 dark:text-navy-50 lg:text-2xl">
              Estadísticas Recolección No. {id}
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
          <div
            style={{ width: "50%" }}
            className="board-draggable relative flex max-h-full w-220 shrink-0 flex-row"
          >
            <button
              onClick={exportToCSV}
              style={{ marginRight: "10px" }}
              className="btn w-full bg-slate-150 font-medium text-slate-800 hover:bg-slate-200 focus:bg-slate-200 active:bg-slate-200/80 dark:bg-navy-500 dark:text-navy-50 dark:hover:bg-navy-450 dark:focus:bg-navy-450 dark:active:bg-navy-450/90"
            >
              Exportar datos a CSV
            </button>
            <button
              onClick={exportToPDF}
              //onClick={() => navigate("create")}
              className="btn w-full bg-slate-150 font-medium text-slate-800 hover:bg-slate-200 focus:bg-slate-200 active:bg-slate-200/80 dark:bg-navy-500 dark:text-navy-50 dark:hover:bg-navy-450 dark:focus:bg-navy-450 dark:active:bg-navy-450/90"
            >
              Exportar Gráficas PDF
            </button>
          </div>
        </div>
        <div ref={chartRef}>
          <div>
            <h3 className="text-xl font-medium text-slate-800 dark:text-navy-50 lg:text-2xl">
              Gráfica de Residuos Totales en Kg.
            </h3>

            <Bar
              //key={index}
              data={{
                labels: barra.peso_total,
                datasets: [
                  {
                    label: "Residuos",
                    backgroundColor: "rgb(128, 64, 0)",
                    borderColor: "rgb(128, 64, 0)",
                    data: barra.peso_cuartil,
                  },
                ],
              }}
            />
          </div>

          {Object.keys(datos).map((item, index) => {
            const dato = datos[item];
            return (
              <div key={index}>
                <h3 className="text-xl font-medium text-slate-800 dark:text-navy-50 lg:text-2xl">
                  Ubicación: {dato.nombre}
                </h3>
                <Line
                  key={dato.id}
                  data={{
                    labels: dato.datos.dias,
                    datasets: [
                      {
                        label: "Peso Total",
                        backgroundColor: "rgb(255, 99, 132)",
                        borderColor: "rgb(255, 99, 132)",
                        data: dato.datos.peso_total,
                        fill: false,
                      },
                      {
                        label: "Peso Cuartiles",
                        backgroundColor: "rgb(190,77,120)",
                        borderColor: "rgb(190,77,120)",
                        data: dato.datos.peso_cuartil,
                        fill: true,
                      },
                    ],
                  }}
                />
              </div>
            );
          })}
        </div>
      </Container>
    </SideBar>
  );
};
