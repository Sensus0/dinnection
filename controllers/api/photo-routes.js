const router = require('express').Router();
const sequelize = require('../../config/connection');
const { Like, Photo, User } = require('../../models');

// get all users
router.get('/', (req, res) => {
  console.log('======================');
  Photo.findAll({
    attributes: [
      'id',
      'image_url',
      'title',
      'created_at',
      [sequelize.literal('(SELECT COUNT(*) FROM like WHERE photo.id = like.photo_id)'), 'like_count']
    ],
    order: [['created_at', 'DESC']],
    include: [
      {
        model: User,
        attributes: ['username']
      },
    ]
  })
    .then(dbPhotoData => res.json(dbPhotoData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get('/:user_id', (req, res) => {
  Photo.findOne({
    where: {
      user_id: req.params.user_id
    },
    attributes: [
      'image_url',
      'title',
      'created_at',
      [sequelize.literal('(SELECT COUNT(*) FROM like WHERE photo.id = like.photo_id)'), 'like_count']
    ],
    include: [
      {
        model: User,
        attributes: ['username']
      }
    ]
  })
    .then(dbPhotoData => {
      if (!dbPhotoData) {
        res.status(404).json({ message: 'No photo found with this id' });
        return;
      }
      res.json(dbPhotoData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.post('/', (req, res) => {
  Photo.create({
    title: req.body.title,
    image_url: req.body.image_url,
    user_id: req.session.user_id
  })
    .then(dbPhotoData => res.json(dbPhotoData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.put('/upvote', (req, res) => {
  // custom static method created in models/Photo.js
  Photo.upvote({ ...req.body, user_id: req.session.user_id }, { User, Like })
    .then(updatedLikeData => res.json(updatedLikeData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.put('/:id', (req, res) => {
  Photo.update(
    {
      title: req.body.title
    },
    {
      where: {
        id: req.params.id
      }
    }
  )
    .then(dbPhotoData => {
      if (!dbPhotoData) {
        res.status(404).json({ message: 'No photo found with this id' });
        return;
      }
      res.json(dbPhotoData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.delete('/:id', (req, res) => {
  Photo.destroy({
    where: {
      id: req.params.id
    }
  })
    .then(dbPhotoData => {
      if (!dbPhotoData) {
        res.status(404).json({ message: 'No photo found with this id' });
        return;
      }
      res.json(dbPhotoData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
