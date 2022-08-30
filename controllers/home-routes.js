const router = require('express').Router();
const { Post, User, Comment } = require('../models');

// route to login page
router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/dashboard');
        return;
    }

    res.render('login');
});

// route to signup page 
router.get('/signup', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/dashboard');
        return;
    }

    res.render('signup');

});

// get all posts for homepage
router.get('/', (req, res) => {
    Post.findAll({
        include: [User],
    })
        .then((dbPostData) => {
            const posts = dbPostData.map((post) => post.get({ plain: true }));

            res.render("homepage", { posts, loggedIn: req.session.loggedIn });
        })
        .catch((err) => {
            res.status(500).json(err);
        });
});


// get comment post
router.get('/post/:id', (req, res) => {
    Post.findByPk(req.params.id, {
        include: [
            User,
            {
                model: Comment,
                include: [User],
            },
        ],
    })
        .then((dbPostData) => {
            if (dbPostData) {
                const post = dbPostData.get({ plain: true });
                console.log(post)
                res.render("comment-post", { post, loggedIn: req.session.loggedIn });
            } else {
                res.status(404).end();
            }
        })
        .catch((err) => {
            res.status(500).json(err);
        });
});




module.exports = router;
