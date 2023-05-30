const route = require('express').Router();

const { getAllUsers, creatUsers, getByID, updateUserID, deleteUser } = require('../service/user.service');

const { isValidUserId, isValidUserBody } = require('../helper/validation');

route.get('/', async (req, res) => {
    try {
        const data = await getAllUsers();
        res.status(200).send(data);
    } catch (er) {
        res.status(404).send(er.message)
    }
})

route.get('/:id', isValidUserId, async (req, res) => {
    try {
        const { id } = req.params;
        const data = await getByID(id);
        res.status(200).send(data)
    } catch (er) {
        res.status(404).send(er.message)
    }
})

route.post('/', isValidUserBody, async (req, res) => {
    try {
        const { birth, city, age, name, surname } = req.body;
        const data = await creatUsers(birth, city, age, name, surname);
        res.status(200).send(data);
    } catch (er) {
        res.status(404).send(er.message)
    }
})

route.put('/:id', isValidUserId, isValidUserBody, async (req, res) => {
    try {
        const { id } = req.params;
        const { birth, city, age, name, surname } = req.body;
        const data = await updateUserID(id, birth, city, age, name, surname);
        res.status(200).send(data)
    } catch (er) {
        res.status(404).send(er.message)
    }
})

route.delete('/:id', isValidUserId, async (req, res) => {
    try {
        const { id } = req.params;
        const data = await deleteUser(id);
        res.status(200).send(data);
    } catch (er) {
        res.status(404).send(er.message)
    }
})

module.exports = route;