const route = require('express').Router();

const { getAllUsers, creatUsers } = require('../service/user.service');

route.get('/', async (req, res) => {
    try {
        const data = await getAllUsers();
        res.status(200).send(data);
    } catch (er) {
        res.status(404).send(er.message)
    }
})

route.post('/', async (req, res) => {
    try {
        const { birth, city, age, name, surname } = req.body;
        const data = await creatUsers(birth, city, age, name, surname);
        res.status(200).send(data);
    } catch (er) {
        res.status(404).send(er.message)
    }
})

module.exports = route;