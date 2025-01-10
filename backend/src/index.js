import app from './app.js';
import sequelize from './config/database.js';

import './models/note.js';

const PORT = 3000;

// Initialize the database connection and then start the server
async function main() {
    try {
        await sequelize.sync();
        app.listen(PORT, () => {
            console.log(`Servidor corriendo en http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error('Error al conectar a la base de datos:', error.message);
    }
}

main();