const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("dicomdb", "manpreet", "ehmeristorage1", {
    host: "localhost",
    dialect: "mysql",
    logging: false
});

module.exports = sequelize;


// const { Sequelize } = require("sequelize");

// const sequelize = new Sequelize("dicomdb", "root", "your_password", {
//     host: "127.0.0.1",
//     dialect: "mysql",
//     logging: false, // Disables logging SQL queries in console
// });

// sequelize.authenticate()
//     .then(() => console.log("Connected to MySQL Database"))
//     .catch((err) => console.error("MySQL Connection Failed:", err));

// module.exports = sequelize;
