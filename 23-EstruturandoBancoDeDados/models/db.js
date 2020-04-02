const Sequelize = require('sequelize');
const sequelize = new Sequelize("postapp", "root", "imNayeon343", {
    host:"localhost",
    dialect:"mysql"
});

module.exports = {
    Sequelize: Sequelize,
    sequelize: sequelize
}