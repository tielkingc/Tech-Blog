const router = require('express').Router();
const { Post } =  require('../../models');

router.get('/', (req, res) => {
    Post.findAll({})
    .then(dbPostData => res.json(dbPostData))
    .catch(err => {
        console.log(err);
        res.status(400).json(err)
    })
});


module.exports = router;