const Feedback = require('../models/Feedback');

exports.createFeedback = async (req, res) => {
    try {
        const { name, department, employee_id, overall_satisfaction, expectations, relevance, trainer_expertise, pacing, confidence, key_takeaway, suggestions } = req.body;

        if (!name || !department || !employee_id || !overall_satisfaction || !expectations || !relevance || !trainer_expertise || !pacing || !confidence || !key_takeaway) {
            return res.status(400).json({ error: 'All fields except suggestions are required.' });
        }

        const feedback = await Feedback.create({
            name,
            department,
            employee_id,
            overall_satisfaction,
            expectations,
            relevance,
            trainer_expertise,
            pacing,
            confidence,
            key_takeaway,
            suggestions
        });

        res.status(201).json({ message: 'Feedback submitted successfully.', feedback });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.getAllFeedback = async (req, res) => {
    try {
        const feedbackList = await Feedback.findAll();
        res.json(feedbackList);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
