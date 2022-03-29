const router = require('express').Router();
const { Photo } = require('../models')

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
    Photo.findAll({})
    .then((imageData) => {
        const images = imageData.map((image) => image.get({ plain: true }))
        console.log(images)
        res.render("posts", { images })  
    })
});
module.exports = router