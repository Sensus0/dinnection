const router = require('express').Router();
// const sequelize = require('../config/connection');
// const { Photo, User } = require('../models')

// router.get('/', (req, res) => {
//     console.log("session", req.session)
//     Photo.findAll({
//         attributes: [
//             'id',
//             'key',
//             'bucket_name',
//             'image',
//             'created_at',
//             [sequelize.literal('(SELECT COUNT (*) FROM vote WHERE photo.id = vote.photo_id)'),
//         'vote_count']
//         ],
//         include: [
//             {
//                 model: User,
//                 attributes: ['username']
//             }
//         ]
//     })
//     .then(dbPostData => {
//         //this  will loop over and map each Sequelize object into a serialized version of itself, saving the results in a new posts array
//         const posts = dbPostData.map(post => post.get({ plain: true }))

//         //pass single post object into the homepage template
//         //the get method gets only the property you need from the Sequelize object.
//         res.render('login', { posts })
//     })
//     .catch(err => {
//         console.log(err);
//         res.status(500).json(err);
//     })
// });

router.get('/signup', (req, res) => {
    res.render('signup')
})

router.get('/', (req, res) => {
    res.render('login')
})

router.get('/upload', (req, res) => {
    if (req.session.loggedIn) {
    res.render('upload')
    } else {
    res.redirect('/signup')
    }
})

router.get('/posts', (req, res) => {
    if (req.session.loggedIn) {
    res.render('posts')
    }
})

module.exports = router