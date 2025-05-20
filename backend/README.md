# HRMP Backend

This is the backend service for the HR Management Portal (HRMP), built with Java Spring Boot and MySQL.

## Prerequisites
- Java 17 or higher
- MySQL server (running and accessible)
- Maven (or use the provided Maven Wrapper)

## Setup

### 1. Configure the Database
Edit `src/main/resources/application.properties` if needed:
```
spring.datasource.url=jdbc:mysql://localhost:3306/hrmp_db?createDatabaseIfNotExist=true
spring.datasource.username=root
spring.datasource.password=root
```
- Make sure MySQL is running and the credentials are correct.
- The database and tables will be created automatically on first run.

### 2. Build and Run the Application

#### Using Maven Wrapper (recommended):
```bash
./mvnw spring-boot:run
```

#### Or with Maven:
```bash
mvn spring-boot:run
```

The backend will start on [http://localhost:8080](http://localhost:8080)