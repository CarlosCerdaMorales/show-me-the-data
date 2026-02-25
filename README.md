# Visualización de datos: herramientas, buenas prácticas y casos de estudio

![Status](https://img.shields.io/badge/Status-In%20Progress-yellow)
![Tech](https://img.shields.io/badge/Stack-React%20|%20Python%20|%20D3.js-green)

## 1. Abstract

This project is a Bachelor's Thesis (Trabajo de Fin de Grado) focused on Data Visualization from three distinct perspectives: **technical, communicative, and ethical**.

The main goal is to analyze and compare leading visualization tools (D3.js, Chart.js, Power BI) to identify best practices and potential pitfalls that lead to data misinterpretation. The project moves beyond theory by developing a **visualization recommendation prototype** that suggests and generates the optimal chart type based on input data and user intent.

## 2. Objectives

The project is structured around high-priority functional objectives:

1.  **Technical Benchmarking:** A comparative analysis of D3.js, Chart.js, and Microsoft Power BI, measuring development time, customization flexibility, and performance.
2.  **Recommendation Prototype:** Design and implementation of a tool that analyzes a dataset and suggests the most effective visualization method.
3.  **Automated Generation:** A module capable of automatically rendering the suggested visualization code or configuration.
4.  **Ethical Analysis:** A study of real-world "bad practices" and data manipulation cases to promote ethical standards in information representation.
5.  **User Perception Experiments:** Empirical validation with real users to measure interpretation speed and accuracy across different visualization types.

## 3. Tech Stack

This project uses a hybrid environment for data processing, web development, and BI analysis[cite: 49].

* **Data Processing:** Python (Pandas, Matplotlib).
* **Web Frontend:** React.js, HTML5, CSS3.
* **Visualization Libraries:** D3.js, Chart.js.
* **BI Tools:** Microsoft Power BI.
* **Tools:** VS Code, Git/GitHub.

## 4. Project Structure

```text
show-me-the-data/
├── data/               # Raw and processed datasets
├── scripts/            # Python scripts for data cleaning and analysis
├── web-prototypes/     # React application for benchmarks and the prototype
├── powerbi/            # Microsoft Power BI workbooks (.pbix)
└── docs/               # Thesis documentation and LaTeX files
