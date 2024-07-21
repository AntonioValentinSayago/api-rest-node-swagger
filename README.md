# RETS API

Real Estate Transaction Standard API (RETS API) es un proyecto que proporciona una interfaz para interactuar con una base de datos de propiedades inmobiliarias. Permite realizar operaciones CRUD (Crear, Leer, Actualizar, Eliminar) en una base de datos MySQL a través de una API RESTful construida con Node.js y Express, y documentada con Swagger.

## Descripción del Proyecto

El objetivo del proyecto es facilitar la gestión de datos inmobiliarios mediante una API RESTful. Los usuarios pueden acceder a la documentación de la API a través de Swagger, lo que facilita la comprensión y el uso de los endpoints disponibles.

![Imagen del Proyecto](media/proyecto-visual.png)

## Requisitos del Proyecto

Para ejecutar este proyecto, necesitas tener instalados los siguientes requisitos:

| Requisito     | Versión Requerida          |
|---------------|----------------------------|
| Node.js       | 14.x o superior            |
| npm           | 6.x o superior             |
| MySQL         | 8.x o superior             |

## Pasos para Ejecutar el Proyecto

### 1. Clonar el Repositorio

```bash
git clone https://github.com/tu-usuario/tu-repositorio.git
cd tu-repositorio
```

### 2. Instalar Dependencias
```bash
npm install
```

### 3. Configurar la Base de Datos
Asegúrate de tener MySQL instalado y corriendo. Luego, crea una base de datos y configura las credenciales en un archivo .env.
```bash
CREATE DATABASE rets_db;
USE rets_db;
CREATE TABLE properties (
    id INT AUTO_INCREMENT PRIMARY KEY,
    address VARCHAR(255) NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    bedrooms INT NOT NULL,
    bathrooms INT NOT NULL,
    listing_date DATE NOT NULL
);
```
