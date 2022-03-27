const User = require('./User');
const Photo = require('./Photo')
const Like = require('./Like');

User.hasMany(Photo, {
    foreignKey: 'user_id'
})

Photo.belongsTo(User, {
    foreignKey: 'user_id',
})

User.belongsToMany(Photo, {
    through: Like,
    as: 'liked_posts',
    foreignKey: 'user_id'
})

Photo.belongsToMany(User, {
    through: Like,
    as: 'liked_posts',
    foreignKey: 'photo_id'
})

Like.belongsTo(User, {
    foreignKey: 'user_id'
})

Like.belongsTo(Photo, {
    foreignKey: 'photo_id'
})

User.hasMany(Like, {
    foreignKey: 'user_id'
})

Photo.hasMany(Like, {
    foreignKey: 'photo_id'
})

module.exports = { User, Photo, Like }