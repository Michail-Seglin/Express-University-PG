const { query } = require('express');
const pool = require('../db');

const ExceptionType = require('../exception/exception')

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
    users on users.info_id = info.id
    where users.info_id = $1`;
    const data = (await client.query(sql, [id])).rows

    return data
}

async function creatUsersDB(birth, city, age, name, surname) {
    const client = await pool.connect();

    const sql = `insert into info (birth, city, age) values($1,$2,$3) returning *`
    const data = (await client.query(sql, [birth, city, age])).rows;

    if (!data.length) throw new Error(ExceptionType.DB_USER_CREATE)

    const sqlNew = `insert into users (name, surname, info_id) values($1,$2,$3) returning *`
    const dataNew = (await client.query(sqlNew, [name, surname, data[0].id])).rows;

    return { ...data[0], ...dataNew[0] };
}

async function updateUserIDDB(id, birth, city, age, name, surname) {
    const client = await pool.connect();

    const sql = `update info set birth=$1, city=$2, age=$3 
    where id = $4 returning*`;
    const data = (await client.query(sql, [birth, city, age, id])).rows;

    if (!data.length) throw new Error(ExceptionType.DB_USER_GET_BY_ID);

    const sqlNew = `update users set name=$1, surname=$2
    where info_id = $3 returning*`;
    const dataNew = (await client.query(sqlNew, [name, surname, id])).rows;

    return { ...data[0], ...dataNew[0] };

}

async function deleteUserDB(id) {
    const client = await pool.connect();

    const sql = `delete from users
    where info_id = $1 returning*`;
    const data = (await client.query(sql, [id])).rows;

    if (!data.length) throw new Error(ExceptionType.DB_USER_GET_BY_ID);

    const sqlNew = `delete from info 
    where id = $1 returning*`;
    const dataNew = (await client.query(sqlNew, [id])).rows;

    return { ...data[0], ...dataNew[0] }
}

module.exports = { getAllUsersDB, creatUsersDB, getByIDDB, updateUserIDDB, deleteUserDB }