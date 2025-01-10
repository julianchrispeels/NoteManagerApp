# Details

## How to run the app

To start the application, open the console, navigate to the main directory of the project, and run the command: `./start.sh`.

## Tools and technologies used

Below is a list of the tools and technologies employed to develop the app:

### Frontend

- React (v19.0.0)
- HTML5
- CSS3

### Backend

- Sequelize (v6.37.5)
- nodemon (v3.1.9)
- cors (v2.8.5)
- dotenv (v16.4.7)
- Express (v4.21.2)
- postgreSQL (v0.0.1)

## Server and database

For this project, I chose PostgreSQL as the relational database management system (DBMS) and Sequelize, a Node.js-based ORM, for database interactions.

The database was hosted locally due to issues connecting to a cloud server (Supabase). To set it up, you must create the database on a local server and update the following environment variables in the `.env` file: `DB_HOST`, `DB_PORT`, `DB_NAME`, `DB_USER` and `DB_PASSWORD`. Apologies for any inconvenience.