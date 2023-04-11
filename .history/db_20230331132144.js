import sql from "mssql";

const config = {
    user: 'sa',
    password: '123456',
    server: 'MSI\SQLEXPRESS',
    database: 'DataApi',
    
};

async function connect() {
    try {
        // make sure that any items are correctly URL encoded in the connection string
        await sql.connect('Server=localhost,1433;Database=DataApi;User Id=sa;Password=123456;TrustServerCertificate=True')
        console.log('connect success')
        const result = await sql.query`SELECT * FROM apiproduct`;
        console.dir(result);
    } catch (err) {
        console.error(err);
    }
}


export default connect;