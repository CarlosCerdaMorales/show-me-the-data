import { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';

const VentasD3 = () => {
  const svgRef = useRef();
  const [data, setData] = useState([]);

  useEffect(() => {
    d3.dsv(";", "/ventas_tienda_online.csv").then((rawData) => {
      
      const ventasPorMes = {};

      rawData.forEach((d) => {
        if (d.Fecha && d.Ventas_Totales) {
          
          // 1. Limpieza de valor
          const venta = parseFloat(d.Ventas_Totales.replace(',', '.'));
          
          // 2. Parseo de Fecha: DD-MM-YYYY -> YYYY-MM
          const partes = d.Fecha.split('-'); // ['10', '03', '2025']
          
          if (!isNaN(venta) && partes.length === 3) {
            // Clave ordenable YYYY-MM
            const keyMes = `${partes[2]}-${partes[1]}`;
            ventasPorMes[keyMes] = (ventasPorMes[keyMes] || 0) + venta;
          }
        }
      });

      // 3. Convertir objeto agrupado a array y ordenar
      const processedData = Object.keys(ventasPorMes)
        .sort() // Esto ordena alfabéticamente strings ISO "2025-03" -> correcto cronológicamente
        .map(key => ({ 
            fecha: new Date(key + "-01"), // Añadimos día 1 para tener objeto Date válido
            valor: ventasPorMes[key] 
        }));

      setData(processedData);
    });
  }, []);

  useEffect(() => {
    if (data.length === 0) return;

    // Configuración SVG
    const margin = { top: 20, right: 30, bottom: 30, left: 60 };
    const width = 800 - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;

    const svgEl = d3.select(svgRef.current);
    svgEl.selectAll("*").remove();

    const svg = svgEl
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    // Escalas
    const x = d3.scaleTime()
      .domain(d3.extent(data, d => d.fecha))
      .range([0, width]);

    const y = d3.scaleLinear()
      .domain([0, d3.max(data, d => d.valor) * 1.1]) // Agrego 10% de margen arriba
      .range([height, 0]);

    // Eje X
    svg.append("g")
      .attr("transform", `translate(0,${height})`)
      .call(d3.axisBottom(x).ticks(d3.timeMonth.every(1)).tickFormat(d3.timeFormat("%b %Y")));

    // Eje Y
    svg.append("g")
      .call(d3.axisLeft(y));

    // Línea
    const lineGenerator = d3.line()
      .x(d => x(d.fecha))
      .y(d => y(d.valor));

    svg.append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", "orange")
      .attr("stroke-width", 2)
      .attr("d", lineGenerator);
      
    // Título
    svg.append("text")
        .attr("x", width / 2)
        .attr("y", -5)
        .attr("text-anchor", "middle")
        .style("font-size", "14px")
        .attr("fill", "#333") // Cambié a oscuro por si el fondo es blanco
        .text("Ventas Agrupadas por Mes (D3.js)");

  }, [data]);

  return <svg ref={svgRef}></svg>;
};

export default VentasD3;