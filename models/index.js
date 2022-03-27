const User = require('./User');
const Photo = require('./Photo')
const Vote = require('./Vote');

User.hasMany(Photo, {
    foreignKey: 'user_id'
})

Photo.belongsTo(User, {
    foreignKey: 'user_id',
})

User.belongsToMany(Photo, {
    through: Vote,
    as: 'voted_posts',
    foreignKey: 'user_id'
})

Photo.belongsToMany(User, {
    through: Vote,
    as: 'voted_posts',
    foreignKey: 'photo_id'
})

Vote.belongsTo(User, {
    foreignKey: 'user_id'
})

Vote.belongsTo(Photo, {
    foreignKey: 'photo_id'
})

User.hasMany(Vote, {
    foreignKey: 'user_id'
})

Photo.hasMany(Vote, {
    foreignKey: 'photo_id'
})

module.exports = { User, Photo, Vote }