import mysql from "mysql2/promise";
import { config } from "dotenv";
config();

class BD {
    constructor() {
        this.conexion = null;
        this.mysql = mysql;
    }

    async conectar() {
        try {
            this.conexion = await this.mysql.createConnection({
                host: process.env.DATABASE_HOST,
                database: process.env.DATABASE_NAME,
                user: process.env.DATABASE_USER,
                password: process.env.DATABASE_PASSWORD,
                port: process.env.DATABASE_PORT
            });
            console.log("Conexión creada");
        } catch (error) {
            console.error(`Error creando la conexión: \n${error.message}`);
        }
    }

    async desconectar() {
        if (this.conexion != null) {
            try {
                await this.conexion.end();
                console.log("Conexión eliminada");
            } catch {
                console.log("La conexión no se pudo eliminar");
            }
        }
    }
}

export { BD };
