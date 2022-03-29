const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Photo extends Model {
    static upvote(body, models) {
        return models.Vote.create({
            user_id: body.user_id,
            photo_id: body.photo_id
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
                        sequelize.literal('(SELECT COUNT(*) FROM vote WHERE photo.id = vote.photo_id)'),
                        'vote_count'
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
        key: {
            type: DataTypes.STRING,
            allowNull: false
        },
        bucket_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        image: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isUrl: true
            }
        },
        user_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'user',
                key: 'id'
            }
        },
        username: {
            type: DataTypes.STRING
        }
    },
    {
        sequelize,
        freezeTableName: true,
        underscored: true,
        modelName: 'photo'
    }
)

module.exports = Photo;