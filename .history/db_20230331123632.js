import sql from "mssql";

const config = {
    user: 'sa',
    password: '123456',
    server: '127.0.0.1',
    database: 'User'
};

async function main() {
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




/* async function connect() {
    await sql.connect(config)
} */

export default main;