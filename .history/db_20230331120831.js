import sql from "mssql";

const config = {
    user: 'sa',
    password: '123456',
    server: 'MSI\SQLEXPRESS',
    database: 'User'
};

async function main() {
    try {
        // make sure that any items are correctly URL encoded in the connection string
        await sql.connect(config);
        const result = await sql.query`SELECT * FROM userLogin`;
        console.dir(result);
    } catch (err) {
        console.error(err);
    }
}




async function connect() {
    await sql.connect(config)
}

module.exports = { sql, connect }