const { DataTypes } = require("sequelize");
const sequelize = require("../database");
const Patient = require("./Patient");
const Study = require("./Study");
const Modality = require("./Modality");

const Series = sequelize.define(
    "Series",
    {
        idSeries: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
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
        idModality: { 
            type: DataTypes.INTEGER, 
            allowNull: false,  // Enforce foreign key integrity
            references: { model: Modality, key: "idModality" } 
        },
        SeriesName: { type: DataTypes.STRING },
        CreatedDate: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
    },
    {
        tableName: "series", // Matches lowercase MySQL table
        timestamps: false
    }
);

module.exports = Series;
