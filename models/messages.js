const { Model, DataTypes } = require("sequelize");

const sequelize = require("../bin/db");

class Message extends Model {
    class_def() {
        return this.firstname + ' ' + this.lastname
    }
}
Message.init({
    firstname: {
        type: DataTypes.STRING(64),
        allowNull: false
    },
    lastname: {
        type: DataTypes.STRING(64),
        allowNull: false
    },
    email: {
        type: DataTypes.STRING(64),
        allowNull: false
    },
    message: {
        type: DataTypes.TEXT,
        allowNull: false
    }
},

    {
        timestamps: true,
        updatedAt: false,
        sequelize,
        modelName: 'Message',

    });

// creates the table if it doesn't exist (and does nothing if it already exists)
Message.sync({ alter: true });


module.exports = Message;