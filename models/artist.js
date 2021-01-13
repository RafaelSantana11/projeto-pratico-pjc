const Sequelize = require('sequelize')
const { belongsTo, hasMany } = require('./user')

class Artist extends Sequelize.Model {
    static init(sequelize, Sequelize) {
        return super.init(
            {   
                name: Sequelize.STRING,
            },
            {
                underscored: true,
                sequelize,
            }
        )
    }

    static associate(models) {
        this.belongsTo(models.MusicalGroup)
        this.hasMany(models.Album)
    }
}

module.exports = Artist
