const sequelize = require("./database");
const Patient = require("./models/Patient");
const Study = require("./models/Study");
const Modality = require("./models/Modality");
const Series = require("./models/Series");
const File = require("./models/File");

sequelize.sync({ alter: true }) // This will create tables if they don't exist
    .then(() => {
        console.log("Database Synced!");
        process.exit();
    })
    .catch((err) => {
        console.error("Sync Failed:", err);
        process.exit(1);
    });

