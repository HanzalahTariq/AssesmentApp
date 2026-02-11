const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Feedback = sequelize.define('Feedback', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    department: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    employee_id: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    overall_satisfaction: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    expectations: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    relevance: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    trainer_expertise: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    pacing: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    confidence: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    key_takeaway: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    suggestions: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
}, {
    timestamps: true,
});

module.exports = Feedback;
