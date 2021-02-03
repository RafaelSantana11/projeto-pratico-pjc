const Sequelize = require('sequelize')

class AlbumMedia extends Sequelize.Model {
    static init(sequelize, Sequelize) {
        return super.init(
            {   
                name: Sequelize.STRING,
                url: Sequelize.TEXT,
            },
            {
                underscored: true,
                sequelize,
            }
        )
    }

    static associate(models) {
        this.belongsTo(models.Album)
    }
}

module.exports = AlbumMedia
