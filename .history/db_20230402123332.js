import sql from "mssql";



async function connect(query,params) {
    try {
        // config for your database
        const config = {
            user: 'sa',
            password: '123456',
            server: 'localhost\\SQLEXPRESS',
            database: 'Users',
            options: {
                encrypt: true,
                trustServerCertificate: true
            }
        };

        // connect to your database
        await sql.connect(config);
        const result = (!params) ? await sql.query(query) : await sql.query(query,params)
        console.log('Connected to database')
        console.log(result);
    } catch (err) {
        console.error(err);
    }
}


export default connect;

const URL = `mongodb+srv://saTech:<password>@cluster0.m274yut.mongodb.net/?retryWrites=true&w=majority`