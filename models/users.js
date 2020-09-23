const { Model, DataTypes } = require("sequelize");
const sequelize = require("../bin/db");

class User extends Model {
    class_def() {
        return this.username
    }
}
User.init({
    username: {
        type: DataTypes.STRING(64),
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING(64),
        allowNull: false
    },
    description: {
        type: DataTypes.STRING,
        allowNull: true
    },
    firstname: {
        type: DataTypes.STRING(64),
        allowNull: false
    },
    lastname: {
        type: DataTypes.STRING(64),
        allowNull: false
    },
    email: {
        type: DataTypes.STRING(100),
        allowNull: true
    },
    admin: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }
},

    {
        timestamps: true,
        sequelize,
        modelName: 'User',

    });

// creates the table if it doesn't exist (and does nothing if it already exists)
// User.sync({ alter: true });
// project.sync();


module.exports = User;