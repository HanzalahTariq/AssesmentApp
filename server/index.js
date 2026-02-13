const express = require('express');
const cors = require('cors');
const sequelize = require('./config/db');
require('dotenv').config();

const assessmentRoutes = require('./routes/assessmentRoutes');
const feedbackRoutes = require('./routes/feedbackRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/assessments', assessmentRoutes);
app.use('/api/feedback', feedbackRoutes);

// Serve static files from React frontend
const path = require('path');
app.use(express.static(path.join(__dirname, '../client/dist')));

// Handle React routing, return all requests to React app
app.get(/^(?!\/api).+/, (req, res) => {
    res.sendFile(path.join(__dirname, '../client/dist', 'index.html'));
});

// Database connection and server start
sequelize.sync({ alter: true })
    .then(() => {
        console.log('Database synced with changes');
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    })
    .catch((err) => {
        console.error('Database connection failed:', err);
    });
