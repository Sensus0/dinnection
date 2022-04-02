const router = require('express').Router();
const sequelize = require('../../config/connection');
const { Photo, User, Vote } = require('../../models');
const { bucketName, upload, getFileStream, uploadFile } = require('../../s3')

//prevents images from storing in uploads file
const fs = require('fs');
const util = require('util');
const unlinkFile = util.promisify(fs.unlink)

// get all users
router.get('/', (req, res) => {
  console.log('======================');
  Photo.findAll({
    attributes: [
      'id',
      'key',
      'image',
      'Bucket',
      'user_id',
      'username',
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

// router.get('/list', async(req, res) => {
//   let response= await s3.listObjectsV2({Bucket: bucketName}).promise()
//   let keys= response.Contents.map(item=>item.Key)
//   res.send(keys)
// })

router.get('/:key', (req, res) => {
  Photo.findOne({
      where: {
          key: req.params.key
      },
      attributes: [
          'id',
          'key',
          'image',
          'Bucket',
          'user_id',
          'username',
          'created_at'
      ]
  })
  .then(dbImageData => {
      const key = dbImageData.key
      const readStream = getFileStream(key)
      readStream.pipe(res)
  })
  .catch(err => {
      console.log(err);
      res.status(500).json(err)
  })
})

router.post('/upload', upload.single('photo'), async (req, res) => {
  const file = req.file
  const result = await uploadFile(file)
  await unlinkFile(file.path)
  // console.log("session",req.session)
  // console.log("file:", file)
  // console.log("result", result)
  
  Photo.create({
      //used with option 3 (multer.memoryStorage option)
      // photo: req.file.buffer.toString('base64')
      key: req.file.filename,
      image: result.Location,
      Bucket: bucketName,
      user_id: req.session.user_id,
      username: req.session.username
  })
  .then(dbImageData => {
      console.log("Successfully uploaded: " + dbImageData)
      res.redirect('/posts')
  })
  .catch(err => {
      res.status(500).json(err)
  })
})

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

router.delete('/:id', (req, res) => {
  Photo.destroy({
    where: {
      id: req.params.id
    }
  }).then(dbImageData => {
    res.json({
      message: "Photo deleted from database!",
      data: dbImageData
    })
  }).catch(err => {
    res.status(500).json(err)
  })
})

module.exports = router;
