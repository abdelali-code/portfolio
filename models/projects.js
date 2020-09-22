const { Model, DataTypes } = require("sequelize");
const connection = require("../bin/db");
const Category = require("./category");




class Project extends Model {
    class_def() {
        return this.title
    }
}
Project.init({
    title: {
        type: DataTypes.STRING(64),
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    image: {
        type: DataTypes.STRING,
        defaultValue: "/images/defaultProject.jpg"
    },
    siteUrl: {
        type: DataTypes.STRING(100),
        allowNull: true
    },
    technologies: {
        type: DataTypes.STRING,
        allowNull: false
    }
},
    {
        timestamps: true,
        sequelize: connection,
        modelName: 'Project',

    });

Project.belongsTo(Category, { onDelete: "CASCADE", onUpdate: "CASCADE" });
// creates the table if it doesn't exist (and does nothing if it already exists)
// this option is only fro developement purpose
Project.sync({ alter: true });


module.exports = Project;