# Guía de Instalación y Despliegue: Prototipo TFG (UVEngine y Web)

Esta guía detalla los pasos para instalar, configurar y ejecutar en entorno local el prototipo del sistema, que se compone de un motor backend en Python (`uvengine`) y una interfaz gráfica en React (`web-prototypes`).

## 1. Requisitos Previos (Software a instalar)

Antes de iniciar, es imprescindible contar con el siguiente software instalado en la máquina:

- **Node.js y npm**: (Recomendado versión 18 o superior). Necesario para gestionar y ejecutar el entorno del frontend. Descargar desde [nodejs.org](https://nodejs.org/).
- **Python**: (Recomendado versión 3.9 o superior). Necesario para el backend y la lógica de procesamiento. Descargar desde [python.org](https://www.python.org/).
- **Git** (Opcional): Recomendado para control de versiones si se descarga desde un repositorio.

> **Importante:** Asegúrate de que tanto `node`, `npm` como `python` (y `pip`) están agregados a las variables de entorno (PATH) del sistema para poder ejecutarlos desde cualquier terminal.

---

## 2. Configuración y Despliegue del Backend (Python / UVEngine)

El backend expone una API REST (con Flask) y se encarga del procesamiento de los datos CSV, así como de la resolución de la variabilidad a través del motor `derivation_engine.py`.

### Comandos a ejecutar:

1. Abre una terminal y sitúate en la raíz del proyecto.
   ```bash
   cd ruta/al/proyecto/show-me-the-data
   ```

2. Crea un entorno virtual (`venv`) para aislar las dependencias de Python y no interferir con las librerías globales del sistema:
   - **En Windows:**
     ```bash
     python -m venv venv
     ```
   - **En macOS/Linux:**
     ```bash
     python3 -m venv venv
     ```

3. Activa el entorno virtual:
   - **En Windows:**
     ```bash
     .\venv\Scripts\activate
     ```
   - **En macOS/Linux:**
     ```bash
     source venv/bin/activate
     ```
   *(Verás que tu terminal muestra `(venv)` al inicio, indicando que el entorno está activo).*

4. Instala todas las dependencias del proyecto listadas en el archivo `requirements.txt` (que incluye *Flask, pandas, numpy, jinja2, flamapy-fm*, entre otros):
   ```bash
   pip install -r requirements.txt
   ```

5. Sitúate en la carpeta del motor y arranca el servidor Flask:
   ```bash
   cd uvengine
   python app.py
   ```

El backend quedará ejecutándose en `http://localhost:5000`. **No cierres esta terminal.**

---

## 3. Configuración y Despliegue del Frontend (React / Vite)

El frontend contiene la interfaz de usuario en React, construida y servida con Vite.

### Comandos a ejecutar:

1. Abre una **nueva ventana/pestaña de terminal** (manteniendo la del backend abierta).

2. Sitúate en la carpeta del frontend:
   ```bash
   cd ruta/al/proyecto/show-me-the-data/web-prototypes
   ```

3. Instala los paquetes de Node (`npm`) definidos en `package.json` (como *React, Chart.js, D3, axios*, etc.):
   ```bash
   npm install
   ```

4. Inicia el servidor de desarrollo de Vite:
   ```bash
   npm run dev
   ```

El frontend estará accesible en tu navegador, generalmente en `http://localhost:5173`. 

---

## 4. Consideraciones Necesarias

Para garantizar el correcto funcionamiento del entorno de desarrollo, es fundamental tener en cuenta lo siguiente:

- **Ejecución Simultánea:** Tanto el servidor de Flask (Backend) como el servidor de Vite (Frontend) deben estar activos de forma paralela en dos terminales independientes. Si uno de los dos se detiene, la aplicación perderá su conectividad total.
- **Puertos de Comunicación y CORS:** Por defecto, el backend corre en el **puerto 5000** y cuenta con la librería `flask_cors` configurada para admitir peticiones del frontend. Si se cambia de puerto el backend, es obligatorio actualizar la URL base en el código del frontend (rutas de peticiones Axios) y asegurarse de que los puertos no estén siendo bloqueados por el firewall.
- **Escritura de Archivos Temporales:** El sistema `uvengine` necesita leer y escribir en la carpeta de forma continua. Cuando el usuario interactúa desde la web, se generan y sobrescriben archivos como `temp_request.json`, `chart_resolved.json` y `data_current.csv` dentro de la subcarpeta `tfg_test/`. **Asegúrate de que el usuario del sistema que ejecuta el código tenga permisos de lectura/escritura en este directorio.**
- **Detalles sobre Codificación en Windows:** Si al ejecutar el `pip install -r requirements.txt` se presenta un error de *"charmap" o de "codificación"*, puede deberse a que el archivo `.txt` esté guardado con formato UTF-16LE en lugar de UTF-8. De ser así, guarda el archivo como UTF-8 o instala manualmente las dependencias principales con: `pip install Flask pandas numpy flamapy-fm uvlparser jinja2 flask-cors`.
- **Modificación de Plantillas (Monkey-Patching de Jinja2):** El archivo `derivation_engine.py` utiliza un "monkey-patching" dinámico de `Jinja2` para la inyección de la configuración a las plantillas de gráficos. Asegúrate de no modificar la lógica de importación y parcheo si realizas modificaciones en el motor, ya que esto podría romper el mapeo de variables.
