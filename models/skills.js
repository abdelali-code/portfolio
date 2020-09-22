const { Model, DataTypes } = require("sequelize");
const connection = require("../bin/db");





class Skill extends Model {
    class_def() {
        return this.name
    }
}
Skill.init({
    name: {
        type: DataTypes.STRING(64),
        allowNull: false
    },

    image: {
        type: DataTypes.STRING,
        defaultValue: "/images/defaultProject.jpg"
    }
},
    {
        timestamps: false,
        sequelize: connection,
        modelName: 'Skill',

    });

// creates the table if it doesn't exist (and does nothing if it already exists)
// this option is only fro developement purpose
Skill.sync({ alter: true });


module.exports = Skill;