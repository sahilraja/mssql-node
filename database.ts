var Sequelize = require("sequelize");
const sql = require('mssql')

export const MSSQL_DB_NAME = "TestDB"
export const MSSQL_USER = "SA"
export const MSSQL_PASSWORD = "licDB123.";
export const MSSQL_HOST = "localhost"
export const sequelize = new Sequelize(
    MSSQL_DB_NAME,
    MSSQL_USER,
    MSSQL_PASSWORD,
    {
        host: MSSQL_HOST,
        dialect: "mssql",
        dialectOptions: {
            options: {
                encrypt: true,
            }
        },
        operatorsAliases: false,
        logging: false,
        // logging: () => console.log(msg), // Displays all log function call parameters
        pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000,
        },
    }
);

export async function initiateDBIfNotExists() {
    const connection = await sql.connect({
        server: MSSQL_HOST,
        port: 1433,
        user: MSSQL_USER,
        password: MSSQL_PASSWORD,
        options: {
            encrypt: false, // for azure
            trustServerCertificate: false // change to true for local dev / self-signed certs
        }
    });
    await sequelize.sync();
    sequelize
        .authenticate()
        .then(() => {
            console.log(
                `MySQL ${MSSQL_DB_NAME} Connection has been established successfully.`
            );
        })
        .catch((err: any) => {
            console.error("Unable to connect to the database:", err);
        });
}
