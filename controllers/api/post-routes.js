const router = require('express').Router();
const { Post, Comment, User } =  require('../../models');

router.get('/', (req, res) => {
    Post.findAll({
        attributes: [
            'id',
            'post_title',
            'post_content',
            'created_at'
        ],
        include: [
            {
                model: Comment,
                attributes: [
                    'id',
                    'post_id',
                    'user_id',
                    'created_at',
                    'comment_text'
                ],
                include:{
                model: User,
                attributes: ['username']
                }
            },
            {
                model: User,
                attributes: ['username']
            }
        ]
    })
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
        user_id: req.session.user_id
    })
        .then(dbPostData => res.json(dbPostData))
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        })
});

router.get('/:id', (req, res) => {
    Post.findOne({
        attributes: [
            'id',
            'post_title',
            'post_content',
            'created_at'
        ],
        include: [
            {
                model: Comment,
                attributes: [
                    'id',
                    'post_id',
                    'user_id',
                    'created_at',
                    'comment_text'
                ],
                include:{
                model: User,
                attributes: ['username']
                }
            },
            {
                model: User,
                attributes: ['username']
            }
        ],
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
});

router.put('/:id', (req, res) => {
    Post.update(req.body, {
        where: {
            id: req.params.id
        }
    })
        .then(dbPostData => {
            if (!dbPostData) {
                res.status(404).json({ message: "No post with this id" });
                return;
            }
            res.json(dbPostData)
        })
        .catch(err => {
            console.log(err);
            res.status(400).json(err)
        })
});

router.delete('/:id', (req, res) => {
    Post.destroy({
        where: {
            id: req.params.id
        }
    })
        .then(dbPostData => {
            if (!dbPostData) {
                res.status(404).json({ message: "No post with this id" })
                return;
            }
            res.json(dbPostData)
        })
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        })
})

module.exports = router;