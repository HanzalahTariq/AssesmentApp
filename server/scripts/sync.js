const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });
const sequelize = require('../config/db');
require('../models/Assessment');
require('../models/Feedback');

async function syncDB() {
    try {
        console.log('Starting database synchronization...');
        await sequelize.sync({ alter: true });
        console.log('Database synchronized successfully. New columns created/updated.');
        process.exit(0);
    } catch (error) {
        console.error('Error synchronizing database:', error);
        process.exit(1);
    }
}

syncDB();
