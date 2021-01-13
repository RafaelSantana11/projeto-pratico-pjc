const Sequelize = require('sequelize')

class User extends Sequelize.Model {
    static init(sequelize, Sequelize) {
        return super.init(
            {   
                name: Sequelize.STRING,
                email: Sequelize.STRING,
                password: Sequelize.STRING,
            },
            {
                underscored: true,
                sequelize,
            }
        )
    }

    static associate(models) {}
}

module.exports = User
