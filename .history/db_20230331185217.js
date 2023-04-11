import sql from "mssql";



async function connect(query) {
    try {
        // config for your database
        const config = {
            user: 'sa',
            password: '123456',
            server: 'localhost\\SQLEXPRESS',
            database: 'DataApi',
            options: {
                encrypt: true,
                trustServerCertificate: true
            }
        };

        // connect to your database
        await sql.connect(config);
        const result = await sql.query(query)
        console.log('Connected to database')
        console.log(result);
    } catch (err) {
        console.error(err);
    }
}


export default connect;