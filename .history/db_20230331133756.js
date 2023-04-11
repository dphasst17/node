import sql from "mssql";

const config = {
    user: 'sa',
    password: '123456',
    server: 'localhost',
    database: 'DataApi',
    
};

async function connect() {
    try {
        // make sure that any items are correctly URL encoded in the connection string
        await sql.connect(config/* 'Server=localhost,1433;Database=DataApi;User Id=sa;Password=123456;trustServerCertificate: true' */)
        console.log('connect success')
        const result = await sql.query`SELECT * FROM apiproduct`;
        console.dir(result);
    } catch (err) {
        console.error(err);
    }
}


export default connect;