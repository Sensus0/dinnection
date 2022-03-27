const router = require('express').Router();
const sequelize = require('../../config/connection');
const { Vote, Photo, User } = require('../../models');

// get all users
router.get('/', (req, res) => {
  console.log('======================');
  Photo.findAll({
    attributes: [
      'id',
      'title',
      'image_url',
      'created_at',
      [sequelize.literal('(SELECT COUNT(*) FROM vote WHERE photo.id = vote.photo_id)'), 'vote_count']
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
  Photo.findAll({
    where: {
      user_id: req.params.user_id
    },
    attributes: [
      'image_url',
      'title',
      'created_at',
      [sequelize.literal('(SELECT COUNT(*) FROM vote WHERE photo.id = vote.photo_id)'), 'vote_count']
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
    // req.session.user_id
    user_id: req.body.user_id
  })
    .then(dbPhotoData => res.json(dbPhotoData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.put('/upvote', (req, res) => {
  // custom static method created in models/Photo.js
  //req.session.user_id
  Photo.upvote(req.body,{ Vote })
    .then(updatedVoteData => res.json(updatedVoteData))
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
