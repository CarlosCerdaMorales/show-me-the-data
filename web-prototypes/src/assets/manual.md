# Manual de Usuario: Show Me The Data

El objetivo de este documento es guiarte paso a paso para que la gráfica resultante realmente comunique lo que quieres expresar.

El proceso se divide en cuatro pasos muy sencillos:

### Paso 1: Ingesta de Datos

Todo empieza con tus datos. Sube un archivo en formato **.CSV**. Para garantizar que el sistema procese correctamente la información, asegúrate de que tu archivo cumpla con estas especificaciones:
* **Separador de columnas:** Utiliza punto y coma (`;`).
* **Formato numérico:** Utiliza el punto (`.`) para separar los decimales.
* **Limpieza previa:** Evita celdas vacías o con formatos especiales de texto (como símbolos de moneda € o $).

La aplicación analizará automáticamente el documento, detectando el número de filas y el tipo de dato de cada columna (Numérico, Fecha o Texto/Categoría). Podrás ver una pequeña vista previa para confirmar que todo se ha cargado correctamente antes de continuar.

### Paso 2: Define tu Objetivo

Aquí es donde entra la "magia". En lugar de elegir simplemente "quiero un gráfico de barras", primero debes pensar qué quieres comunicar.

1.  **¿Qué relación quieres mostrar?** Elige el tipo general de análisis:
    * **Comparación Nominal:** Comparar tamaños de valores discretos sin un orden particular.
    * **Series Temporales:** Analizar valores cuantitativos a lo largo del tiempo (secuencia cronológica).
    * **Rankings:** Relacionar valores por magnitud (de mayor a menor o viceversa).
    * **Partes de un Todo:** Mostrar la proporción que cada parte contribuye al total.
    * **Desviaciones:** Analizar la diferencia respecto a un conjunto de valores de referencia.

2.  **¿Cuál es tu intención específica?** Dependiendo de la relación elegida, te daremos opciones más concretas para afinar el resultado:
    * **En Comparación Nominal:**
        * *Comparar tamaños (Estándar):* Para ver diferencias de magnitud de forma directa.
    * **En Series Temporales:**
        * *Enfatizar valores individuales:* Ideal para comparar métricas en fechas concretas (sugerirá barras).
        * *Mostrar la evolución del patrón:* Perfecto para ver tendencias continuas (sugerirá líneas).
    * **En Rankings:**
        * *Enfatizar valores mayores:* Aplica un orden descendente para destacar el Top.
        * *Enfatizar valores menores:* Aplica un orden ascendente para destacar los últimos.
        * *Escala no arranca en 0:* Enfoca la visualización en las pequeñas diferencias relativas lejos del cero.
    * **En Partes de un Todo:**
        * *Comparar partes individuales:* Agrupa barras lado a lado.
        * *Ver contribución al total:* Apila los valores para ver la suma conjunta.
    * **En Desviaciones:**
        * *Diferencias respecto a una base:* Destaca valores positivos y negativos con colores divergentes.
        * *Desviación a lo largo del tiempo:* Rastrea los cambios frente a un umbral temporal.

### Paso 3: Mapeo de Variables

Ahora vamos a conectar tus datos con tu objetivo. La aplicación te guiará para asignar las columnas correctas a los ejes. **Como regla general del sistema, se prefiere y restringe el uso de variables Categóricas o Textuales para el Eje X, reservando exclusivamente los valores Numéricos para el Eje Y.**

* **Eje X (Dimensión / Categoría):** Elige la columna que define los grupos o el tiempo. La aplicación filtrará las opciones para mostrar solo las que tienen sentido (ej. fechas para series temporales, o textos para el resto). Si es una fecha, podrás elegir la resolución temporal (día a día, mes y año, año completo).
* **Eje Y (Métrica / Valor):** Selecciona la columna numérica que quieres medir o totalizar.
* **Operación Matemática:** Decide si quieres sumar los valores agrupados, calcular su promedio o simplemente contar registros.
* **Opciones extra:** Dependiendo de tu intención, podrían aparecer opciones requeridas como una "Subcategoría" (para agrupar o apilar gráficos) o un "Valor de Referencia" (para establecer el umbral en las desviaciones).

*Consejo:* A la derecha de la pantalla, verás una "Sugerencia Teórica" que te anticipa y justifica qué tipo de gráfico se va a generar empíricamente en base a tu intención.

### Paso 4: Visualización Generada

¡Listo! El motor analizará tu configuración derivada de la línea de productos de software y generará la visualización óptima. Podrás interactuar con ella y, si te gusta el resultado, descargarla como imagen PNG con un solo clic. Si quieres probar otras opciones, siempre puedes utilizar los botones de navegación para volver al paso anterior y modificar las variables de entrada.