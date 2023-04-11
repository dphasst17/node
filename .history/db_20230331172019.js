import sql from "mssql";



async function connect() {
    try {
        // config for your database
        const config = {
            user: 'sa',
            password: '123456',
            server: 'MSI\SQLEXPRESS.master (sa(52))',
            database: 'DataApi',
            
        };

        // connect to your database
        await sql.connect(config);

        console.log('Connected to database');
    } catch (err) {
        console.error(err);
    }
}


export default connect;