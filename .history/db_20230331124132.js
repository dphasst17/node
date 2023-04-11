import sql from "mssql";

const config = {
    user: 'sa',
    password: '123456',
    server: 'fe80::77e2:f5e7:818:e819%16',
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