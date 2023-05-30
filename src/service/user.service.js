const { getAllUsersDB, creatUsersDB, getByIDDB, updateUserIDDB, deleteUserDB } = require('../repository/user.repository');

const ExceptionType = require('../exception/exception');


async function getAllUsers() {
    const data = await getAllUsersDB();
    if (!data.length) throw new Error(ExceptionType.DB_USER_GET)
    return data
}

async function getByID(id) {
    const data = await getByIDDB(id);
    if (!data.length) throw new Error(ExceptionType.DB_USER_GET_BY_ID);
    return data
}

async function creatUsers(birth, city, age, name, surname) {
    const data = await creatUsersDB(birth, city, age, name, surname);

    return data
}

async function updateUserID(id, birth, city, age, name, surname) {
    const data = await updateUserIDDB(id, birth, city, age, name, surname);
    return data
}

async function deleteUser(id) {
    const data = await deleteUserDB(id);
    return data
}

module.exports = {
    getAllUsers, creatUsers, getByID, updateUserID, deleteUser
}