const pool = require('../db');

async function getAllUsersDB() {
    const client = await pool.connect();
    const sql = `select *from info join 
    users on users.info_id= info.id`;
    const data = (await client.query(sql)).rows;

    return data
}

async function getByIDDB(id) {
    const client = await pool.connect();
    const sql = `select *from info join 
    users on users.info_id= info.id 
    where users.info_id = $1`;
    const data = (await client.query(sql, [id])).rows;

    return data
}

async function creatUsersDB(birth, city, age, name, surname) {
    const client = await pool.connect();

    const sql = `insert into info (birth, city, age) values($1,$2,$3) returning *`
    const data = (await client.query(sql, [birth, city, age])).rows;

    const sqlNew = `insert into users (name, surname, info_id) values($1,$2,$3) returning *`
    const dataNew = (await client.query(sqlNew, [name, surname, data[0].id])).rows;

    return { ...data[0], ...dataNew[0] };
}




module.exports = { getAllUsersDB, creatUsersDB, getByIDDB }