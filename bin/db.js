const { Sequelize } = require('sequelize');

// connect to database
const connection = new Sequelize('portfolio', 'root', '', {
    host: 'localhost',
    dialect: 'mariadb'
});

// test connection is ok or not
connection.authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch(error => {
        console.error('Unable to connect to the database:', error);
    })


module.exports = connection;