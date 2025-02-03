const { DataTypes } = require("sequelize");
const sequelize = require("../database");
const Patient = require("./Patient");

const Study = sequelize.define(
    "Study",
    {
        idStudy: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
        idPatient: { 
            type: DataTypes.INTEGER, 
            allowNull: false,  // Enforce foreign key integrity
            references: { model: Patient, key: "idPatient" } 
        },
        StudyName: { type: DataTypes.STRING },
        CreatedDate: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
    },
    {
        tableName: "studies", // Matches lowercase MySQL table
        timestamps: false
    }
);

module.exports = Study;
