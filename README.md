# Librosfera

This document provides the steps required to configure the database for the **Librosfera** project — an **e-commerce web application for books** built with **React** on the frontend and a **Node.js + MySQL** backend.

---

## Project Overview

**Librosfera** is a full-stack e-commerce platform that allows users to browse, search, and purchase books online.  
The frontend is developed with **React**, while the backend uses **Node.js** and **Express** to interact with a **MySQL** database that stores information about books, users, and orders.

---

## Installation and Configuration

1. **Download MySQL** from the official website:  
   [https://dev.mysql.com/downloads/](https://dev.mysql.com/downloads/)

2. Open **MySQL Workbench**.

3. Use the **default installation settings**.

4. Log in using the user:
    Username: root
    Password: admin1234

---

## Database Setup

5. Create a new database named **librosfera**.

6. Access the newly created database.

7. Create a new **schema** called `librosfera` and set it as the **default schema**.

---

## Data Initialization

8. Execute the SQL initialization file [`librosfera.sql`](./backend/librosfera.sql) from within MySQL Workbench’s command interface to create the necessary tables and structure.

9. To populate the database with book data, navigate to the `backend/` directory and run the data insertion script using Node.js:

```bash
cd backend
node insertar_libros.js