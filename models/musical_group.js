const Sequelize = require('sequelize')

class MusicalGroup extends Sequelize.Model {
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
        this.hasMany(models.Artist)
    }
}

module.exports = MusicalGroup
