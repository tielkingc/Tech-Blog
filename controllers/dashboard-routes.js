const router = require('express').Router();
const { Post, Comment, User } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', withAuth, (req, res) => {
    Post.findAll({
        where: {
            user_id: req.session.user_id
        },
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
    .then(dbPostData => {
        const posts = dbPostData.map(post => post.get({ plain: true }))
        res.render('dashboard', {
            posts,
            loggedIn: true
        })
    })
    .catch(err=>{res.status(505).json(err)});
});

router.get('/edit/:id', (req,res) => {
    Post.findByPk(req.params.id, {
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
    .then(dbPostData => {
        if (dbPostData) {
            const posts = dbPostData.get({ plain: true });
            res.render('edit-post', {
                posts,
                loggedIn: true
            })
        } else {
            res.status(404).end()
        }
    })
    .catch(err => {
        res.status(500).json(err);
    })
})

module.exports = router;