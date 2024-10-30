# Menú Rápido

Este proyecto es una aplicación web desarrollada con **Spring Boot** y utiliza **PostgreSQL** como base de datos. La aplicación está configurada para realizar operaciones CRUD y manejar los datos necesarios para gestionar un menú de manera rápida y eficiente.

## Requisitos Previos

- **Java 17** o superior
- **Apache Maven** 3.8.x o superior
- **PostgreSQL** 13 o superior

## Configuración de Base de Datos

Asegúrate de tener PostgreSQL instalado y ejecutándose en tu máquina local.

1. Crea una base de datos llamada `menurapido` en tu servidor PostgreSQL.
2. Abre el archivo `src/main/resources/application.properties` y modifica las propiedades `spring.datasource.username` y `spring.datasource.password` con tus credenciales de PostgreSQL.

```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/menurapido
spring.datasource.username=postgres
spring.datasource.password=adminsan
```

## Compilación y Ejecución

Para compilar y ejecutar la aplicación, sigue los siguientes pasos:

1. Abre una terminal y navega hasta la carpeta raíz del proyecto.
2. Con maven corre el proyecto localmente con el siguiente comando:

```bash
mvn spring-boot:run
```

3. Abre un navegador web y navega a `http://localhost:8080`.
