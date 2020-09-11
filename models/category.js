const { Model, DataTypes } = require("sequelize");
const connection = require("../bin/db");

class Category extends Model {

}
Category.init({
    name: {
        type: DataTypes.STRING(64),
        allowNull: false
    },
    image: {
        type: DataTypes.STRING(100),
        allowNull: true
    },
    description: {
        type: DataTypes.STRING,
        allowNull: true
    }
}, {
    timestamps: false,
    sequelize: connection,
    modelName: 'Category',

})

// creates the table if it doesn't exist (and does nothing if it already exists)
Category.sync({ alter: true });

module.exports = Category;