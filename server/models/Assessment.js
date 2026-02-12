const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Assessment = sequelize.define('Assessment', {
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
    // MCQs
    q1: DataTypes.STRING,
    q2: DataTypes.STRING,
    q3: DataTypes.STRING,
    q4: DataTypes.STRING,
    q5: DataTypes.STRING,
    q6: DataTypes.STRING,
    q7: DataTypes.STRING,
    q8: DataTypes.STRING,
    q9: DataTypes.STRING, // Actually the q9 has complex options like "a. 1. Usage..." but just storing the option letter "a", "b" is enough
    q10: DataTypes.STRING,
    // True/False
    tf1: DataTypes.BOOLEAN,
    tf2: DataTypes.BOOLEAN,
    tf3: DataTypes.BOOLEAN,
    tf4: DataTypes.BOOLEAN,
    tf5: DataTypes.BOOLEAN,
    tf6: DataTypes.BOOLEAN,
    tf7: DataTypes.BOOLEAN,
    tf8: DataTypes.BOOLEAN,
    tf9: DataTypes.BOOLEAN,
    tf10: DataTypes.BOOLEAN,
    // Scoring
    score: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    totalQuestions: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    }
}, {
    timestamps: true, // adds createdAt, updatedAt
});

module.exports = Assessment;
