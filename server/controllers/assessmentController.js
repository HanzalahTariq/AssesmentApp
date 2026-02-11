const Assessment = require('../models/Assessment');

exports.createAssessment = async (req, res) => {
    try {
        const { name, department, employee_id, ...answers } = req.body;

        if (!name || !department || !employee_id) {
            return res.status(400).json({ error: 'Name, department, and employee ID are required.' });
        }

        const assessment = await Assessment.create({
            name,
            department,
            employee_id,
            ...answers
        });

        res.status(201).json({ message: 'Assessment submitted successfully.', assessment });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.getAllAssessments = async (req, res) => {
    try {
        const assessments = await Assessment.findAll();
        res.json(assessments);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
