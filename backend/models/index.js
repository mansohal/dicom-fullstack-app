const sequelize = require("../database");
const Patient = require("./Patient");
const Study = require("./Study");
const Modality = require("./Modality");
const Series = require("./Series");
const File = require("./File");

// Export all models from a single entry point
module.exports = { sequelize, Patient, Study, Modality, Series, File };
