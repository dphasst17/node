import sql from "mssql";

const config = {
    user: 'sa',
    password: '123456',
    server: 'SQLEXPRESS',
    database: 'DataApi'
};

async function connect() {
    try {
        // make sure that any items are correctly URL encoded in the connection string
        await sql.connect(config);
        console.log('connect success')
        const result = await sql.query`SELECT * FROM apiproduct`;
        console.dir(result);
    } catch (err) {
        console.error(err);
    }
}


export default connect;