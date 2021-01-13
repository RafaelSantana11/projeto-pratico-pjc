const Sequelize = require('sequelize')

class Album extends Sequelize.Model {
    static init(sequelize, Sequelize) {
        return super.init(
            {   
                name: Sequelize.STRING,
                publication_year: Sequelize.DATEONLY,
            },
            {
                underscored: true,
                sequelize,
            }
        )
    }

    static associate(models) {
        this.belongsTo(models.Artist)
    }
}

module.exports = Album
