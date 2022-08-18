const router = require('express').Router();
const { Post } = require('../models');
const withAuth = require('../utils/auth');

//get all of the user's posts and render dashboard
router.get('/dashboard', withAuth, (req, res) => {
    res.render('all-post', {
        layout: 'dashboard'
    })
});

// router to edit & delete post
router.get("/edit/:id", withAuth, (req, res) => {
    Post.findByPk(req.params.id)
        .then(dbPostData => {
            if (dbPostData) {
                const post = dbPostData.get({ plain: true });

                res.render("edit-post", {
                    layout: "dashboard",
                    post
                });
            } else {
                res.status(404).end();
            }
        })
        .catch(err => {
            res.status(500).json(err);
        });
});

module.exports = router;
