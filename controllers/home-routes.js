const router = require('express').Router();
const sequelize = require('../config/connection');
const { Post, User, Comment } = require('../models');

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
      const loggedIn = req.session.loggedIn;
      res.render('homepage', {
        posts,
        loggedIn
      });
    })
    .catch(err => {
      console.log(err);
      res.status(505).json(err);
    });
});

router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }

  res.render('login');
});

router.get('/signup', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/')
  }

  res.render('signup')
})

router.get('/posts/:id', (req, res) => {
  Post.findOne({
    where: {
      id: req.params.id
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
    const post = dbPostData.get({ plain: true });
    const loggedIn = req.session.loggedIn
    console.log(post)

    if (loggedIn) {
      res.render('single-post', {
        post,
        loggedIn
      })
    } else {
      res.render('login')
    }
  })
})

module.exports = router;