const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Photo extends Model {
    static upvote(body, models) {
        return models.Like.create({
            user_id: body.user_id,
            photo_id: body.post_id
        }).then(() => {
            return Photo.findOne({
                where: {
                    id: body.photo_id
                },
                attributes: [
                    'id',
                    'image_url',
                    'title',
                    'created_at'
                    [
                        sequelize.literal('(SELECT COUNT(*) FROM vote WHERE photo.id = like.photo_id)'),
                        'like_count'
                    ]
                ]

            })
        })
    }
}

Photo.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        image_url: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isURL: true
            }
        },
        user_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'user',
                key: 'id'
            }
        }
    },
    {
        sequelize,
        freezeTableName: true,
        underscored: true,
        modelName: 'post'
    }
)

module.exports = Photo;