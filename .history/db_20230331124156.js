import sql from "mssql";

const config = {
    user: 'sa',
    password: '123456',
    server: '172.16.28.14',
    database: 'User'
};

async function connect() {
    try {
        // make sure that any items are correctly URL encoded in the connection string
        await sql.connect(config);
        console.log('connect success')
        /* const result = await sql.query`SELECT * FROM userLogin`; */
        /* console.dir(result); */
    } catch (err) {
        console.error(err);
    }
}


export default connect;