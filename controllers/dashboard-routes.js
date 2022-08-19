const router = require('express').Router();
const { Post, User } = require('../models');
const withAuth = require('../utils/auth');

// get all posts for Dashboard
router.get('/', (req, res) => {
    Post.findAll({
        include: [User],
    })
        .then((dbPostData) => {
            const posts = dbPostData.map((post) => post.get({ plain: true }));

            res.render("all-post", { posts });
        })
        .catch((err) => {
            res.status(500).json(err);
        });
});


// router to create a new post
router.get("/new", (req, res) => {
    res.render("new-post");
});

// router to edit & delete post
router.get("/edit/:id", (req, res) => {
    res.render("edit-post");
});

// router.get('/', withAuth, (req, res) => {
//     Post.findByPk(req.params.id)
//         .then(dbPostData => {
//             if (dbPostData) {
//                 const post = dbPostData.get({ plain: true });

//                 res.render("edit-post", {
//                     post
//                 });
//             } else {
//                 res.status(404).end();
//             }
//         })
//         .catch(err => {
//             res.status(500).json(err);
//         });
// });


module.exports = router;
