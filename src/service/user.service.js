const { getAllUsersDB, creatUsersDB, getByIDDB } = require('../repository/user.repository');

async function getAllUsers() {
    const data = await getAllUsersDB();
    if (!data.length) throw new Error('db is empty')
    return data
}

async function getByID(id) {
    const data = await getByIDDB(id);
    if (!data.length) throw new Error('id is not found')
    return data
}

async function creatUsers(birth, city, age, name, surname) {
    const data = await creatUsersDB(birth, city, age, name, surname);
    if (data.length) throw new Error(`data doesn't create`)

    return data
}

module.exports = {
    getAllUsers, creatUsers, getByID
}