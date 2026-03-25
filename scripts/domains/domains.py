DOMAINS = {
    "Retail_Ecommerce": {
        "dates": ["Fecha_Transaccion"],
        "categories": {
            "Ciudad": ["Madrid", "Barcelona", "Sevilla", "Valencia", "Bilbao"],
            "Categoria_Producto": ["Electrónica", "Ropa", "Hogar", "Deportes", "Libros"],
            "Metodo_Pago": ["Tarjeta", "PayPal", "Transferencia", "Crypto", "Efectivo"],
            "Estado_Envio": ["Entregado", "En Tránsito", "Pendiente", "Cancelado"]
        },
        "numerics": {
            "Unidades_Vendidas": {"min": 1, "max": 20, "type": int},
            "Ingresos_Euros": {"min": 10.0, "max": 1500.0, "type": float},
            "Descuento_Porcentaje": {"min": 0.0, "max": 0.4, "type": float},
            "Tiempo_En_Web_Minutos": {"min": 1.0, "max": 45.0, "type": float}
        }
    },
    "Sensores_IoT": {
        "dates": ["Fecha_Hora_Lectura"],
        "categories": {
            "ID_Dispositivo": ["Sensor_A1", "Sensor_B2", "Sensor_C3", "Sensor_D4"],
            "Ubicacion": ["Planta Baja", "Planta Alta", "Exterior", "Almacen"],
            "Estado_Bateria": ["Optima", "Media", "Baja", "Critica"]
        },
        "numerics": {
            "Temperatura_Celsius": {"min": -5.0, "max": 45.0, "type": float},
            "Humedad_Relativa": {"min": 10.0, "max": 99.0, "type": float},
            "Presion_hPa": {"min": 980.0, "max": 1030.0, "type": float},
            "Errores_Red": {"min": 0, "max": 5, "type": int}
        }
    },
    "Marketing_Ads": {
        "dates": ["Fecha_Campana"],
        "categories": {
            "Canal_Origen": ["Google Ads", "Facebook", "Instagram", "Email", "SEO"],
            "Dispositivo": ["Movil", "Desktop", "Tablet"],
            "Segmento_Audiencia": ["Jovenes", "Adultos", "Profesionales", "Estudiantes"]
        },
        "numerics": {
            "Inversion_Euros": {"min": 50.0, "max": 5000.0, "type": float},
            "Clics": {"min": 10, "max": 10000, "type": int},
            "Conversiones": {"min": 0, "max": 500, "type": int},
            "Costo_Por_Clic": {"min": 0.1, "max": 5.5, "type": float}
        }
    }
}