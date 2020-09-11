const { Model, DataTypes } = require("sequelize");
const sequelize = require("../bin/db");
const User = require("./users");

class Article extends Model {
    class_def() {
        return this.title;
    }
}
Article.init({
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    thumbail: {
        type: DataTypes.STRING(64),
        allowNull: true
    },
    images: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: false
    }
},

    {
        timestamps: true,
        sequelize,
        modelName: 'Article',

    });

Article.belongsTo(User, { onDelete: "CASCADE", allowNull: false });
// User.hasMany(Article);

// creates the table if it doesn't exist (and does nothing if it already exists)
Article.sync({ alter: true });


module.exports = Article;