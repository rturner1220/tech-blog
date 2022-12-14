// import all models
const Post = require('./Post');
const User = require('./User');
const Comment = require('./Comment');

// create associations
User.hasMany(Post, {
    foreignKey: 'user_id',
    onDelete: 'SET NULL'
});

Post.belongsTo(User, {
    foreignKey: 'user_id',
    onDelete: 'SET NULL'
});

User.hasMany(Comment, {
    foreignKey: 'user_id',
    onDelete: 'SET NULL'
});

Comment.belongsTo(User, {
    foreignKey: 'user_id',
    onDelete: 'SET NULL'
});

Comment.belongsTo(Post, {
    foreignKey: 'post_id',
    onDelete: 'CASCADE'
});


Post.hasMany(Comment, {
    foreignKey: 'post_id',
    onDelete: 'CASCADE'
});

module.exports = { User, Post, Comment };