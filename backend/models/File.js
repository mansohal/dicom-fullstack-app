const { DataTypes } = require("sequelize");
const sequelize = require("../database");
const Patient = require("./Patient");
const Study = require("./Study");
const Series = require("./Series");

const File = sequelize.define(
    "File",
    {
        idFile: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
        idPatient: { 
            type: DataTypes.INTEGER, 
            allowNull: false,  // Enforce foreign key integrity
            references: { model: Patient, key: "idPatient" } 
        },
        idStudy: { 
            type: DataTypes.INTEGER, 
            allowNull: false,  // Enforce foreign key integrity
            references: { model: Study, key: "idStudy" } 
        },
        idSeries: { 
            type: DataTypes.INTEGER, 
            allowNull: false,  // Enforce foreign key integrity
            references: { model: Series, key: "idSeries" } 
        },
        FilePath: { type: DataTypes.STRING, allowNull: false },
        CreatedDate: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
    },
    {
        tableName: "files", // Matches lowercase MySQL table
        timestamps: false   // Disable `createdAt` & `updatedAt`
    }
);

module.exports = File;
