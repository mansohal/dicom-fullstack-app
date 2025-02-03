const { DataTypes } = require("sequelize");
const sequelize = require("../database");

const Modality = sequelize.define("Modality", {
    idModality: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    Name: { type: DataTypes.STRING, allowNull: false }
},
{
    tableName: "modalities",
    timestamps: false
}
);

module.exports = Modality;
