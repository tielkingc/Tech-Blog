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

router.post('/', (req, res) => {
    Post.create({
        post_title: req.body.post_title,
        post_content: req.body.post_content,
        user_id: req.body.user_id
    })
        .then(dbPostData => res.json(dbPostData))
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        })
});

router.get('/:id', (req, res) => {
    Post.findOne({
        where: {
            id: req.params.id
        }
    })
        .then(dbPostData => {
            if (!dbPostData) {
                res.status(400).json({ message: "No post with this id" });
                return;
            }
            res.json(dbPostData);
        })
        .catch(err => {
            console.log(err)
            res.status(400).json(err)
        })
})

module.exports = router;