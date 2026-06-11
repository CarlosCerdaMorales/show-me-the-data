# Motor de Recomendación y Derivación de Visualizaciones de Datos

![Status](https://img.shields.io/badge/Status-Prototipo%20Funcional-success)
![Tech](https://img.shields.io/badge/Stack-React%20|%20Python%20|%20UVL-blue)

Esta implementación forma parte de un Trabajo de Fin de Grado (TFG) centrado en la gestión, optimización y representación visual de la información. 

A pesar del uso distendido de gráficas en el día a día corporativo y analítico, a menudo se eligen representaciones por estética o inercia, lo que dificulta o distorsiona la lectura real de los datos. Tras un análisis exhaustivo del marco teórico del libro *"Show Me the Numbers"* de Stephen Few, este proyecto materializa sus reglas en un motor de software capaz de razonar la mejor representación visual posible.

## Objetivos del Proyecto

El proyecto busca la optimización en el uso de gráficas, adaptando la representación final estrictamente a la intención comunicativa y a la naturaleza de los datos disponibles.

* **Problema a resolver:** El uso inadecuado o confuso de gráficos para representar datos, ignorando la intención analítica y llevando a malas interpretaciones o a un esfuerzo cognitivo innecesario por parte del lector.
* **Quién será usuario de la funcionalidad:** Analistas, desarrolladores o cualquier persona que necesite generar representaciones visuales de datos precisas, eficaces y teóricamente correctas, sin necesidad de ser un experto en visualización de la información.
* **Resultado que se espera obtener:** Una herramienta automatizada que procese un conjunto de datos, interactúe con el usuario para descubrir su objetivo analítico, y derive sistemáticamente la configuración óptima del gráfico mediante un modelo formal de toma de decisiones.

## Funcionamiento de la Aplicación

La aplicación funciona como un asistente guiado (Wizard) interactivo e "intent-driven" que acompaña al usuario en el proceso analítico:

1. **Ingesta y Perfilado de Datos:** El usuario sube un archivo CSV. El sistema lo analiza, extrae las columnas, detecta la cardinalidad y clasifica los tipos de datos (Numéricos, Fechas, Categóricos/Textuales) de forma autónoma.
2. **Definición de Intención:** El usuario selecciona el tipo de relación de sus datos (Nominal, Serie Temporal, Ranking, Partes de un Todo o Desviación) y qué intenta resaltar exactamente (por ejemplo, mostrar la evolución de una tendencia frente a comparar tamaños individuales).
3. **Mapeo de Variables:** Se asignan las columnas a los ejes del gráfico, permitiendo aplicar agrupaciones por categorías, granularidad temporal paramétrica (años, meses, días) y operaciones matemáticas de agregación (sumas, promedios, recuentos).
4. **Derivación y Generación:** El motor cruza toda esta información con la teoría de diseño, recomienda la mejor opción empírica (tipo de gráfico, uso de puntos, líneas, barras, etc.) y renderiza el resultado final interactivo.

## Arquitectura y Tecnologías Clave

Este proyecto no es un simple recomendador basado en condicionales básicos, sino que aborda el problema bajo el robusto paradigma de la **Ingeniería de Líneas de Productos de Software (SPL)**, asegurando la extensibilidad y la integridad del razonamiento.

* **UVL (Universal Variability Language):** Toda la teoría de visualización de Stephen Few se ha modelado formalmente en un árbol de características (`visualization.uvl`). Las buenas prácticas de diseño operan como restricciones lógicas inflexibles dentro del modelo de variabilidad.
* **UVEngine (Backend - Python/Flask):** El núcleo de la aplicación. Actúa como un motor de resolución que toma la configuración del usuario y valida la variabilidad contra el modelo UVL. Destaca por el uso de técnicas de metaprogramación como **"monkey-patching"** sobre Jinja2 para inyectar dinámicamente configuraciones en tiempo de ejecución, derivando así el código final del gráfico en formato JSON.
* **Frontend (React.js + Vite):** Una interfaz web moderna, ágil y centrada en la experiencia de usuario (UX), encargada de la orquestación del proceso (el Wizard) y del renderizado final de los gráficos utilizando librerías como `react-chartjs-2` (basado en Chart.js) y paletas de colores especializadas para mantener la coherencia y armonía visual.

## Estructura del Repositorio

```text
show-me-the-data/
├── uvengine/           # API REST (Flask), modelo UVL y motor de derivación Python
├── web-prototypes/     # Aplicación frontend interactiva en React
├── scripts/            # Scripts auxiliares para la generación de datos de prueba
├── data/               # Datasets de ejemplo y pruebas de concepto
├── guia_instalacion.md # Guía detallada para levantar el proyecto paso a paso
└── README.md           # Este archivo
```

## Instalación y Despliegue

Para poder arrancar este proyecto en un entorno local, se requiere la instalación de ciertas dependencias y la ejecución paralela del motor backend (Python) y la interfaz frontend (Node/React).

👉 **[Consulta la Guía de Instalación completa aquí](./guia_instalacion.md)**