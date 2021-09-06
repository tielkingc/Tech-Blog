const router = require('express').Router();
const { Post, Comment, User } = require('../models');

router.get('/', (req, res) => {
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
        const loggedIn = req.session.loggedIn;
        if (loggedIn) {
            const posts = dbPostData.map(post => post.get({ plain: true }))
            res.render('dashboard', {
                posts,
                loggedIn
            })
        }
    })
    .catch(err=>{res.status(505).json(err)});
});

router.get('/edit/:id', (req,res) => {
    
})

module.exports = router;