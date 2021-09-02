const router = require('express').Router();
const sequelize = require('../config/connection');
const { Post, User, Comment, Vote } = require('../models');

// get all posts for homepage
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
    .then(dbPostData => {
      const posts = dbPostData.map(post => post.get({ plain: true }));

      res.render('homepage', {
        posts
      });
    })
    .catch(err => {
      console.log(err);
      res.status(505).json(err);
    });
});

module.exports = router;