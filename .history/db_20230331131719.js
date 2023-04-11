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
        await sql.connect('Server=1443;Database=DataApi; Id=sa;Password=123456;Trusted_Connection=True;TrustServerCertificate=True;')
        console.log('connect success')
        const result = await sql.query`SELECT * FROM apiproduct`;
        console.dir(result);
    } catch (err) {
        console.error(err);
    }
}


export default connect;