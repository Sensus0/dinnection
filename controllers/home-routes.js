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
    res.redirect('/')
    }
})

router.get('/profile', (req, res) => {
    if (req.session.loggedIn) {
    res.render('profile')
    } else {
    res.redirect('/signup')
    }
})

router.get('/posts', (req, res) => {
    if (req.session.loggedIn) {
        Photo.findAll({
            order: [['created_at', 'DESC']],
        })
        .then((imageData) => {
            const images = imageData.map((image) => image.get({ plain: true }))
            console.log(images)
            res.render("posts", { images })  
        })
    } else {
        res.redirect('/')
    }
});
module.exports = router