const { DataTypes } = require("sequelize");
const sequelize = require("../database");

const Patient = sequelize.define("Patient", {
    idPatient: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    Name: { type: DataTypes.STRING, allowNull: false },
    CreatedDate: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
},
{
    tableName: "patients", // Force lowercase table name to match MySQL
    timestamps: false
}
);

module.exports = Patient;

