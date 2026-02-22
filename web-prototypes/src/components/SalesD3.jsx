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
          const mes = d.Fecha.substring(0, 7);
          const venta = parseFloat(d.Ventas_Totales.replace(',', '.'));
          
          if (!isNaN(venta)) {
            ventasPorMes[mes] = (ventasPorMes[mes] || 0) + venta;
          }
        }
      });

      const processedData = Object.keys(ventasPorMes)
        .sort()
        .map(key => ({ fecha: new Date(key + "-01"), valor: ventasPorMes[key] }));

      setData(processedData);
    });
  }, []);

  useEffect(() => {
    if (data.length === 0) return;

    
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

    const x = d3.scaleTime()
      .domain(d3.extent(data, d => d.fecha))
      .range([0, width]);

    const y = d3.scaleLinear()
      .domain([0, d3.max(data, d => d.valor)])
      .range([height, 0]);

    svg.append("g")
      .attr("transform", `translate(0,${height})`)
      .call(d3.axisBottom(x).ticks(12).tickFormat(d3.timeFormat("%b")));

    svg.append("g")
      .call(d3.axisLeft(y));

    const lineGenerator = d3.line()
      .x(d => x(d.fecha))
      .y(d => y(d.valor));

    svg.append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", "orange")
      .attr("stroke-width", 2)
      .attr("d", lineGenerator);
      
    svg.append("text")
        .attr("x", width / 2)
        .attr("y", -5)
        .attr("text-anchor", "middle")
        .style("font-size", "14px")
        .text("Ventas 2025 (D3.js - SVG Puro)");

  }, [data]);

  return <svg ref={svgRef}></svg>;
};

export default VentasD3;