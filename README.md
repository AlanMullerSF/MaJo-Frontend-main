# Developer Getting Started Guide

## Introduction
Welcome, developers! This guide helps set up the development environment and start contributing to the María José
Prader-Willi Syndrome Foundation Dashboard.

## Prerequisites
Make sure you have installed:
- [Oracle JDK 21+](https://www.oracle.com/java/technologies/downloads/)
- [MySql 8.2.0+](https://www.mysql.com/)
- [Apache Maven 3.9+](https://maven.apache.org/)

## Setup/Installation
Follow these steps to set up the development environment:

### Backend
1. Clone the project's [backend repository](https://github.com/Nearsoft/MJ-Backend).
2. Make sure you have a MySQL server running on your locale. 
3. In the `src/main` package, create a new directory called `resources`. 
4. In this new folder, create an `application.properties` file, which will define the project's configuration. In that
file, add the following configuration:
```
server.port=YOUR_BACKEND_PORT
spring.jpa.generate-ddl=true
spring.jpa.show-sql=true
spring.jpa.hibernate.ddl-auto=update
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver
spring.datasource.url=jdbc:mysql://localhost:YOUR_DB_PORT/mj_spw?useUnicode=true&useJDBCCompliantTimezoneShift=true&useLegacyDatetimeCode=false&serverTimezone=UTC&createDatabaseIfNotExist=TRUE
spring.datasource.username=YOUR_MYSQL_USERNAME
spring.datasource.password=YOUR_MYSQL_PASSWORD
spring.mail.host=smtp.gmail.com
spring.mail.port=587
spring.mail.username=praderwillimexico@gmail.com
spring.mail.password=GMAIL_APP_PASSWORD
spring.mail.properties.mail.smtp.auth=true
spring.mail.properties.mail.smtp.starttls.enable=true
```

### Frontend
1. Clone the project's [frontend repository](https://github.com/Nearsoft/MJ-Frontend).
2. In the main directory, create a new file called `.env`, which will define the project's configuration. 
3. In that file, add the following configuration:
```
VITE_DEV_BASE_URL = "http://localhost:YOUR_BACKEND_PORT"
VITE_PROD_BASE_URL = "http//54.219.173.176:YOUR_BACKEND_PORT"
```

## Build/Run
Follow these steps to build and run the project:

### Backend
The backend uses Maven as its build system. To build a distribution for your local OS, run:
```
mvn clean build
```

To run the application, run:
```
mvn clean run
```

### Frontend
The backend uses Node.js as its javascript runtime. To first download and install the necessary packages, run:
```
npm install
```

Once the backend is running, to run the application, run:
```
npm run dev
```

To run tests, run: 
```
npm run test
```

To commit changes, you must follow up [conventional commits styles](https://www.conventionalcommits.org/en/v1.0.0/) and solve all linting issues,
if not the commit will not pass.
Important! changes made to any test file will trigger that test to run, if it fails, the commit won't pass.

## Usage/API Documentation
You can revise the project's documentation [here](./USERS_GETTING_STARTED.md).


# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
   parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
   },
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
