const config = {
    user: 'sa',
    password: '123456',
    server: 'your_server',
    database: 'User'
};

async function main() {
    try {
        // make sure that any items are correctly URL encoded in the connection string
        await sql.connect(config);
        const result = await sql.query`SELECT * FROM your_table`;
        console.dir(result);
    } catch (err) {
        console.error(err);
    }
}


const sql = require('mssql')

async function connect() {
    await sql.connect('mssql://sa:123456@localhost/database')
}

module.exports = { sql, connect }