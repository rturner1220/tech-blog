const router = require('express').Router();
const { Post, User, Comment } = require('../models');

router.get('/', (req, res) => {
    res.render('homepage');
});

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

            res.render("homepage", { posts });
        })
        .catch((err) => {
            res.status(500).json(err);
        });
});

// show all post on the main page
router.get('/', (req, res) => {
    res.render("main");
});

// get all posts for Dashboard
router.get('/dashboard', (req, res) => {
    Post.findAll({
        include: [User],
    })
        .then((dbPostData) => {
            const posts = dbPostData.map((post) => post.get({ plain: true }));

            res.render("dashboard", { posts });
        })
        .catch((err) => {
            res.status(500).json(err);
        });
});

// router to create a new post
router.get("/dashboard/new", (req, res) => {
    res.render("new-post");
});



// get single post
router.get("/post/:id", (req, res) => {
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

                res.render("single-post", { post });
            } else {
                res.status(404).end();
            }
        })
        .catch((err) => {
            res.status(500).json(err);
        });
});



module.exports = router;
