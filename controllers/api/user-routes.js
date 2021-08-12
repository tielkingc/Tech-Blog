const router = require('express').Router();
const { User } = require('../../models');

router.get('/', (req, res) => {
    User.findAll({
        attributes: {exclude: ['password']}
    })
    .then(dbUserData => res.json(dbUserData))
    .catch(err => {
        console.log(err);
        res.status(400).json(err)
    })
});

router.post('/', (req, res) => {
    User.create({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        username: req.body.username,
        password: req.body.password
    })
    .then(dbUserData => res.json(dbUserData))
    .catch(err => {
        console.log(err);
        res.status(400).json(err)
    })
});

router.get('/:id', (req, res) => {
    User.findOne({
        attributes: {exclude: ['password']},
        where: {
            id: req.params.id
        }
    })
    .then(dbUserData => {
        if (!dbUserData) {
            res.status(404).json({ message: "No user with this id" });
            return;
        }
        res.json(dbUserData)
    })
    .catch(err => {
        console.log(err);
        res.status(400).json(err)
    })
});

router.put('/:id', (req, res) => {
    User.update(req.body, {
        attributes: {exclude: ['password']},
        where: {
            id: req.params.id
        }
    })
    .then(dbUserData => {
        if (!dbUserData) {
            res.status(404).json({ message: "No user with this id" });
            return;
        }
        res.json(dbUserData)
    })
    .catch(err => {
        console.log(err);
        res.status(400).json(err)
    })
})

module.exports = router;